import {expect} from "chai";
import hardhat from "hardhat";

const {ethers} = hardhat;

describe("FMCW Contract", function(){
    let FMCW;
    let contract;
    let owner;
    let from1;
    let from2;
    let from3;
    let amount;

    this.beforeEach(async function (){
        FMCW = await ethers.getContractFactory("FMCW");
        [owner, from1, from2, from3] = await ethers.getSigners();
        contract = await FMCW.deploy();
        amount = {value: ethers.parseEther("1")};
    })

    describe("Deployment", function(){
        it("Should set the right owner", async function(){
            expect(await contract.getOwner()).to.equal(owner.address);
        })
    })

    describe("Transactions", async function(){
        it("Should transfer ETH to owner", async function(){
            const beforeBalance = await ethers.provider.getBalance(owner.address);

            await contract.connect(from1).fundFMCW("from1", "Enjoyed last year", amount);
            await contract.connect(from2).fundFMCW("from2", "Nice Initiative Team", amount);
            await contract.connect(from3).fundFMCW("from3", "great work guys", amount);

            const afterBalance = await ethers.provider.getBalance(owner.address);

            expect(afterBalance-beforeBalance).to.equal(ethers.parseEther("3"));
        })

        it("Should fail if sender sends 0 ETH", async function(){
            await expect(contract.connect(from1).fundFMCW("from1", "Prank", {value: ethers.parseEther("0")})).to.be.revertedWith("Please pay greater than 0 ether");
        })

        it("Should store memos when people fund", async function(){
            await contract.connect(from1).fundFMCW("from1", "Enjoyed last year", amount);
            await contract.connect(from2).fundFMCW("from2", "Nice Initiative Team", amount);
            await contract.connect(from3).fundFMCW("from3", "great work guys", amount);

            const memos = await contract.getMemos();
            expect(memos.length).to.equal(3);
            expect(memos[0].name).to.equal("from1");
            expect(memos[1].message).to.equal("Nice Initiative Team");
            expect(memos[2].from).to.equal(from3.address);
        })
    })
});