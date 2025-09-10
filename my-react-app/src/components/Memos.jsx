import React from "react";
import { useState, useEffect } from "react";

function Memos({state}){

    const [memos, setMemos] = useState([]);
    const {contract} = state;

    useEffect(()=>{
        const memosMessage =async ()=>{
            const memos = await contract.getMemos();
            // console.log("Fetched memos:", memos);
            setMemos(memos);
        }
        contract && memosMessage();
    }, [contract]);

    return (
    <div className="w-full mx-auto my-10 p-5 rounded-xl bg-white/75 shadow-lg">

      <h3 className="text-center mb-5 text-2xl font-bold text-[#066433]">
        Support So Far 💚
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-xl overflow-hidden font-sans">
          <thead>
            <tr>
              <th className="px-4 py-3 bg-[#066433] text-white border border-white">Name</th>
              <th className="px-4 py-3 bg-[#066433] text-white border border-white">Team</th>
              <th className="px-4 py-3 bg-[#066433] text-white border border-white">Time</th>
              <th className="px-4 py-3 bg-[#066433] text-white border border-white">Message</th>
              <th className="px-4 py-3 bg-[#066433] text-white border border-white">From</th>
            </tr>
          </thead>
          <tbody>
            {memos.map((memo, idx) => (
              <tr
                key={idx}
                className="hover:bg-[rgba(30,144,255,0.6)] transition-colors duration-300"
              >
                <td className="px-4 py-3 border border-white">{memo.name}</td>
                <td className="px-4 py-3 border border-white">{memo.teamname}</td>
                <td className="px-4 py-3 border border-white">
                  {new Date(Number(memo.timestamp) * 1000).toLocaleString()}
                </td>
                <td className="px-4 py-3 border border-white">{memo.message}</td>
                <td className="px-4 py-3 border border-white font-mono">{memo.from}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default Memos;