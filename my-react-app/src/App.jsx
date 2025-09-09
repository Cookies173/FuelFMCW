import React, { useState, useEffect } from "react";
import {ethers} from "ethers";
import abi from "./contracts/FMCW.json";
import Buy from "./components/Buy.jsx";
import Memos from "./components/Memos.jsx";

function App(){
  
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  });

  const [account, setAccount] = useState("None");

  useEffect(()=>{
    const connectWallet = async()=>{
      const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
      const contractABI = abi.abi;
      try{
        const {ethereum} = window;
        if(ethereum){
          const account = await ethereum.request({method:"eth_requestAccounts"});

          window.ethereum.on("chainChanged", ()=>{
            window.location.reload();
          })
          window.ethereum.on("accountChanged", ()=>{
            window.location.reload();
          })

          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(contractAddress, contractABI, signer);
          setState({provider, signer, contract});
          setAccount(account);
        }
        else{
          alert("Please install MetaMask");
        }
      }
      catch(err){
        console.log(err.message);
      }
    }
    connectWallet();
  }, []);

  // console.log(state);
  // console.log(account);
  // console.log(contract);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">FMCW DApp</h1>

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl mb-6">
        <p className="text-gray-700 font-medium">
          <span className="font-bold">Connected Account:</span> {account}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div className="bg-white shadow-md rounded-lg p-6">
          <Buy state={state} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <Memos state={state} />
        </div>
      </div>
    </div>
  )
};

export default App;