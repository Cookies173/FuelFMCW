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
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
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
    <div>
      <Buy state={state} account={account} />
      <Memos state={state} />
    </div>
  )
};

export default App;