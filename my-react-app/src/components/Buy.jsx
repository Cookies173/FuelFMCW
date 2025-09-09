import { ethers } from "ethers";
import React from "react";

function Buy({state}){

    const fundFMCW = async(event)=>{
        event.preventDefault();
        const {contract} = state;
        const name = document.querySelector("#name").value;
        const message = document.querySelector("#message").value;

        // console.log(name, message, contract);

        const value = {value: ethers.parseEther("0.001")};
        const transaction = await contract.fundFMCW(name, message, value);
        await transaction.wait();

        console.log("Transaction is done")
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Fund FMCW</h2>
      <form onSubmit={fundFMCW} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Brand Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your brand name"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <input
            type="text"
            id="message"
            placeholder="Enter your message"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!state.contract}
          className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Pay 0.001 ETH
        </button>
      </form>
    </div>);
};

export default Buy;