import React from "react";
import NavBar from "../components/Home Components/NavBar";
import { Outlet } from "react-router-dom";

function Routerr({ state }) {
  return (
    <>
      <NavBar signature={state.signerAddress} />
      <Outlet />
    </>
  );
}

export default Routerr;
