import React, { useState } from 'react'
import nimg from "../assets/no.png/"
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// import Candidates from '../components/ViewCampaign Components/Candidates';
function ViewCampaign({state}) {
  const navigate = new useNavigate();
  const { provider, signer, contract, signerAddress }= state;
  const contractInstance = state.contract
  console.log("contract hai yaha:",contract);
  
  const handleButtonClick = () => {
    navigate('/new-season');
  };
  
  async function getCandis(){
    const candisLength = await contractInstance.getCandidatesLength()
    console.log("fetched Candis length:", candisLength.toString());
  }
  
  const [seasonStatus, setseasonStatus] = useState(null);
  


  async function getSeason() {
    try {
      const season = await contract.ongoingSeason();
      console.log("Is season on:", season);
      setseasonStatus(season);
    } catch (error) {
      console.error("Error fetching season status:", error);
    }
  }


  useEffect(() => {
    getSeason();
    console.log("season-Status:",seasonStatus)
  }, [contract]);
    
    
    
    if(seasonStatus==null){
      <div>Loading ho raha hai bhai </div>
    }
    if(!seasonStatus){ 
      
      return(
        <div className='noSeason'>
            <img src={nimg} alt='no campaign'/>
            <h3 className='cText'>No Ongoing Campaigns</h3>
            <button onClick={async()=>{
              const tx= await contractInstance.newSeason("Amdarki Nivadnuk");
              const receipt = await tx.wait();
              console.log("Transaction confirmed: ", receipt);
              handleButtonClick();
              
            }}> Click here to start a campaign!</button>
        </div>
      );
    }
    else{
      getCandis();
      return (
              <Candidates state={state} />

      )
    }
  
  
  
}
export default ViewCampaign;