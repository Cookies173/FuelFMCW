import hardhat from "hardhat";

const {ethers} = hardhat;

async function main(){
    const FMCW = await ethers.getContractFactory("FMCW");
    const contract = await FMCW.deploy();
    await contract.waitForDeployment();
    console.log("Address of contract:", await contract.getAddress());
}

main()
    .then(()=>process.exit(0))
    .catch((error)=>{
        console.log(error);
        process.exit(1);
    })