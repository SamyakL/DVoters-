import React from 'react'
import nmg from "../../assets/person.png"
import { useNavigate } from 'react-router-dom';

function Campaign() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/view-campaign');
  };
  return (
    <div className='campaignCard'>
        <img src={nmg}></img>
        <h3 className='cardText'>On Going campaigns</h3>
        <button onClick={handleButtonClick}>Click here to view campaigns and participate</button>
    </div>
  )
}

export default Campaign;