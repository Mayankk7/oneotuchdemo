import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import LoveLoader from "./components/PopUpComponent/LoveLoader";
import { StateContext } from "./context/StateProvider";

function PrivateOutletUser({ isLoading }) {
  const { isLoggedIn } = useContext(StateContext);
  if (isLoading) return <LoveLoader />;
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateOutletUser;
