import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const useAuth = () => {
  const admin = localStorage.getItem("admin");
  if (admin) {
    return true;
  } else {
    return false;
  }
};

function PrivateOutlet() {
  const location = useLocation();
  const auth = useAuth();
  console.log(auth);
  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/adminlogin" state={{ from: location }} replace />
  );
}

export default PrivateOutlet;
