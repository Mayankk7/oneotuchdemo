import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "react-lazy-load-image-component/src/effects/blur.css";
import { StateContext } from "../../context/StateProvider";
import Btn from "../../subcomponents/buttons/Btn";
import Header from "../../subcomponents/Header/Header";
import Input from "../../subcomponents/inputs/Input";
import Label from "../../subcomponents/inputs/Label";
import SinglePopup from "../PopUpComponent/SinglePopup";
import ForgotPassword from "./ForgotPassword";
const { useNavigate } = require("react-router-dom");

function LoginComponent() {
  const {
    isModalOpen,
    setisModalOpen,
    user,
    setUser,
    registerDet,
    setregisterDet,
    isLoggedIn,
    setisLoggedIn,
    errorShow,
    setErrorShow,
    popupMsg,
    setPopupMsg,
  } = useContext(StateContext);

  const [forgotPwd, setForgotPwd] = useState(false);
  const [validPass, setValidPass] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");

      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const tokenRes = await axios.post("/api/auth/isTokenValid", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (tokenRes.data) {
        const userRes = await axios.get("/api/auth/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser({
          token: token,
          user: userRes.data,
        });

        setisLoggedIn(true);
        navigate("/preference");
      }
    };
    setregisterDet(user.user);
 
    checkLoggedIn();
  }, []);
  // Handle Inputs
  const handleInputs = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validate = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)) {
      return true;
    }
  };

  const forgotPasswordHandler = () => {
    setForgotPwd(!forgotPwd);
  };

  const handlesubmitlogin = (e) => {
    e.preventDefault();
    let { email, password } = user;
    axios
      .post("/api/auth/login", user)
      .then((res) => {
        const userId = res.data.user.id;
        localStorage.setItem("auth-token", res.data.token);
        axios
          .get(`/api/auth/uid/${userId}`)
          .then((res) =>{
           // console.log("result data here1")
           // console.log(res.data)
           // console.log("result data here2")

            setregisterDet(res.data)
            setisLoggedIn(true);
      
        if (validate(user)) {
          if(res.data.useridadded == true)
        navigate("/preference");
        else
        navigate("/adduserid")
        }
          });
      
      })
      .catch((err) => {
        if (err.response) setErrorShow(true);

        setPopupMsg(err.response.data.msg);
      });
    setErrorShow(false);
  };

  return (
    <>
      {errorShow && (
        <SinglePopup className="bg-red-300" icon={<AiOutlineClose />} />
      )}

      {forgotPwd ? (
        <ForgotPassword onForgot={forgotPasswordHandler} />
      ) : (
        <div id="signup" className="login w-full pt-4 ">
          <Header title="Log In" />
          <div className="w-full my-6 flex items-center  ">
            <div className="w-full flex-1 h-full sm:max-w-4xl md:mx-auto bg-white rounded-lg shadow-xl">
              <div className="w-full sm:w-full flex flex-col md:flex-row">
                {/* Left Image */}
                <div className=" md:h-auto w-full  md:w-1/2">
                  <img
                    effect="blur"
                    className=" object-cover w-full h-96 "
                    src="https://i.ibb.co/9mXtQjZ/2.jpg"
                    alt="img"
                  />
                </div>
                <form className="flex items-center justify-center p-6 sm:p-6 md:w-1/2">
                  <div className="w-full">
                    <h3 className="mb-4 text-3xl text-center font-bold text-main-blue">
                      Login
                    </h3>
                    <div>
                      <div className="mb-3">
                        <Label text="Your Email" labelFor="email" />
                        <Input
                          name="email"
                          type="email"
                          id="email"
                          placeholder="Type your email here"
                          value={user.email}
                          onChange={handleInputs}
                        />
                      </div>
                      <div className="mb-3">
                        <Label labelFor="password" text="Your Password" />
                        <Input
                          name="password"
                          type="password"
                          id="password"
                          placeholder="Type your password here"
                          value={user.password}
                          onChange={handleInputs}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <button
                          type="button"
                          onClick={forgotPasswordHandler}
                          className=" font-medium text-main-blue hover:text-indigo-500"
                        >
                          Forgot your password?
                        </button>
                      </div>
                      <div className="text-sm">
                        <button
                          type="button"
                          onClick={() => setisModalOpen(true)}
                          className=" font-medium bg-transparent outline-none text-main-blue hover:text-indigo-500"
                        >
                          New User?
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-end mt-5">
                      <Btn
                        type="button"
                        text="Login"
                        onClick={handlesubmitlogin}
                        className="text-white bg-main-red px-2 hover:bg-pink-700 w-28"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginComponent;
