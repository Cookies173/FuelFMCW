import { ethers } from "ethers";
import React from "react";

function Buy({state, account}){

    const fundFMCW = async(event)=>{
        event.preventDefault();
        const {contract} = state;
        const name = document.querySelector("#name").value;
        const message = document.querySelector("#message").value;

        // console.log(name, message, contract);

        const value = {value: ethers.parseEther("0.001")};
        const transaction = await contract.fundFMCW(name, message, value);
        await transaction.wait();

        console.log("Transaction is done");
    };

    return(
    <div className="min-h-screen font-['Sansita_Swashed'] bg-[#47c291be] flex flex-col">

      <div className="sticky top-0 w-full bg-black/40 border-b-2 border-gray-300 shadow-md z-50">
        <h1 className="text-[3.5rem] font-extrabold text-white text-center py-4">
          FMC Weekend Fund Raiser - NOW LIVE !!
        </h1>
      </div>

      <div className="w-full bg-black flex justify-center items-center py-5">
        <img src="img.png" alt="Header Banner" className="max-h-[250px] object-contain" />
      </div>

      <div className="w-full mx-auto mt-20 p-10 bg-white/30 border border-gray-300/30 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-extrabold text-black mb-8 border-l-4 border-gray-300 pl-4 tracking-wider">
          Cheers from the Community
        </h1>

        <form onSubmit={fundFMCW} className="space-y-10">
          <div className="relative h-14">
            <input
              type="text"
              id="name"
              required
              className="w-full h-full border-4 border-black rounded-lg px-4 py-2 text-xl text-black focus:bg-[#47c291be] focus:outline-none placeholder-transparent"
              placeholder="Please enter brand name"
            />
          </div>

          <div className="relative h-14">
            <input
              type="text"
              id="message"
              required
              className="w-full h-full border-4 border-black rounded-lg px-4 py-2 text-xl text-black focus:bg-[#47c291be] focus:outline-none placeholder-transparent"
              placeholder="Write your message"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={!state.contract}
              className="w-full bg-gradient-to-r from-green-400 to-pink-500 text-black font-bold text-lg py-3 rounded-lg shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Pay
            </button>
          </div>
        </form>

        <footer className="mt-6 bg-lime-200/20 border-l-4 border-blue-500 rounded-lg h-10 flex items-center px-4 text-sm font-semibold text-black overflow-hidden whitespace-nowrap relative">
          <span className="absolute animate-[scroll-left_12s_linear_infinite]">
            Your ETH will be transferred to: {account}
          </span>
        </footer>
      </div>
    </div>
  );
};

export default Buy;