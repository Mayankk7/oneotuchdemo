import React, { useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "react-lazy-load-image-component/src/effects/blur.css";
import { StateContext } from "../../context/StateProvider";
import Btn from "../../subcomponents/buttons/Btn";
import Header from "../../subcomponents/Header/Header";
import Input from "../../subcomponents/inputs/Input";
import Label from "../../subcomponents/inputs/Label";
import SinglePopup from "../PopUpComponent/SinglePopup";
const axios = require("axios");
const { useNavigate } = require("react-router-dom");

function ForgotPassword(props) {
  const {
    isModalOpen,
    setisModalOpen,
    errorShow,
    setErrorShow,
    popupMsg,
    setPopupMsg,
  } = useContext(StateContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [validCred, setValidCred] = useState(true);

  // Changing Form Steps
  const [formStep, setFormStep] = useState(0);

  const changeFormStepNext = () => {
    setFormStep((formStep) => formStep + 1);
  };

  // Managing the inputs
  const handleInputs = (e) => {
    setEmail(e.target.value);
  };

  // Handle after submitting
  const handlesubmitlogin = (e) => {
    e.preventDefault();
    axios
      .post("/api/auth/reset", { email })
      .then((res) => {
        setPopupMsg(res.data.message);
        setErrorShow(true);

        props.onForgot();
        navigate("/login");
      })
      .catch((err) => {
        setPopupMsg(err.response.data.error);
        setErrorShow(true);
      });
  };

  return (
    <div id="signup" className="login w-full pt-4">
      {errorShow && (
        <SinglePopup className="bg-red-300" icon={<AiOutlineClose />} />
      )}

      <Header title="Forgot Your Password?" />
      <div className="w-full mt-2 flex items-center my-2">
        <div className="w-full mt-4 flex-1 h-full sm:max-w-4xl md:mx-auto bg-white rounded-lg shadow-xl">
          <div className="w-full  sm:w-full flex flex-col md:flex-row">
            {/* Left Image */}
            <div className=" md:h-auto w-auto md:w-1/2">
              <img
                effect="blur"
                className="object-cover w-full h-96"
                src="https://i.ibb.co/QdgWGW5/wedding-archway-backyard-happy-wedding-couple-outdoors-before-wedding-ceremony-1-1.jpg"
                alt="img"
              />
            </div>

            {/* Recovery   Form */}
            <form className="flex items-center justify-center p-6 sm:p-6 md:w-1/2 ">
              <div className="w-full">
                <h3 className="mb-4 text-3xl text-center font-bold text-main-blue">
                  Recover It
                </h3>
                <div>
                  <div className="mb-3">
                    <Label text="Your Email" labelFor="email" />
                    <Input
                      name="email"
                      type="email"
                      id="email"
                      placeholder="Type your email here"
                      value={email}
                      onChange={handleInputs}
                    />
                  </div>
                </div>
                <div className="space-y-2">
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
                    text="Recover It"
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
  );
}

export default ForgotPassword;
