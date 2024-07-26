import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';
import abi from "./contract/Voting.json";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ViewCampaign from './pages/ViewCampaign';
import Routerr from './pages/Routerr';
import Candidates from './components/ViewCampaign Components/Candidates';
function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
    signerAddress: null
  });

  const connectWallet = async () => {
    const contractAddress = "0xBf8B5Da09D43365de5de03e19F9B28782CC5f44c";
    const contractABI = abi.abi;
    try {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts"
        });
        if (accounts.length > 0) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const signerAddress = await signer.getAddress();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setState({ provider, signer, contract, signerAddress });
        } else {
          console.log("No accounts found.");
        }
      } else {
        console.log("No MetaMask detected.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    connectWallet();

    window.ethereum.on('accountsChanged', async (accounts) => {
      if (accounts.length > 0) {
        const newProvider = new ethers.BrowserProvider(window.ethereum);
        const newSigner = await newProvider.getSigner();
        const newSignerAddress = await newSigner.getAddress();
        setState((prevState) => ({
          ...prevState,
          signer: newSigner,
          signerAddress: newSignerAddress,
        }));
      } else {
        console.log('Please connect to MetaMask.');
      }
    });

  }, []);

  const router = createBrowserRouter([ 
    {
      path: "/", element: <Routerr state={state} />,
      children: [
        { path: "", element: <Home /> },
        { path: "/view-campaign", element: <ViewCampaign state={state}/> },
        {path: "/new-season", element:<Candidates state={state}/>}
      ]
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
