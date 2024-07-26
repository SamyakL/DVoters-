import React from "react";
import nimg from "../../assets/forTitle.png";
import login from "../../assets/loginnn.png";


function getLogin(address) {
  if (address.signature !== "") {
    return (
      <div className="loginImage">
        <img src={login} alt="Login" />
        <h5 className="navadd">Current Address: {address.signature}</h5>
      </div>
    );
  } else {
    return (
      <div className="loginImage">
        <img src={login} alt="Login"  />
        <h5 className="navadd">Please install MetaMask extension</h5>
      </div>
    );
  }
}

function NavBar(signerAddress) {
  return (
    <div className="navbar">
      <img className="navimg" src={nimg} alt="DVoters Logo" />
      <div className="loginImage">
        {getLogin(signerAddress)}
      </div>
    </div>
  );
}

export default NavBar;
