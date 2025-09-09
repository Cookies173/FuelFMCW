import React from "react";
import { useState, useEffect } from "react";

function Memos({state}){

    const [memos, setMemos] = useState([]);
    const {contract} = state;

    useEffect(()=>{
        const memosMessage =async ()=>{
            const memos = await contract.getMemos();
            console.log("Fetched memos:", memos)
            setMemos(memos);
        }
        contract && memosMessage();
    }, [contract]);

    return (<div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Messages
      </h2>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-900 uppercase text-xs font-semibold">
            <tr>
              <th className="px-4 py-3 border-b">Name</th>
              <th className="px-4 py-3 border-b">Message</th>
              <th className="px-4 py-3 border-b">Timestamp</th>
              <th className="px-4 py-3 border-b">From</th>
            </tr>
          </thead>
          <tbody>
            {memos.map((memo, index) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
              >
                <td className="px-4 py-3 border-b font-medium">{memo.name}</td>
                <td className="px-4 py-3 border-b">{memo.message}</td>
                <td className="px-4 py-3 border-b">
                    {new Date(Number(memo.timestamp) * 1000).toLocaleString()}
                </td>
                <td className="px-4 py-3 border-b text-gray-600 font-mono">
                  {memo.from}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>);
};

export default Memos;