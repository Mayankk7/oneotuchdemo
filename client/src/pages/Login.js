import React, { useContext } from "react";
import Footer from "../components/Footer/Footer";
import LoginComponent from "../components/Register/LoginComponent";
import Signup from "../components/signup/Signup";
import { StateContext } from "../context/StateProvider";

function Login() {
  const { isModalOpen, setisModalOpen } = useContext(StateContext);
  return (
    <div className="w-full flex justify-center">
      {isModalOpen && <Signup />}
      <div>
        <LoginComponent />
        <div className="mt-20 mx-4">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Login;
