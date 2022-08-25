import React, { useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { StateContext } from "../../context/StateProvider";
import Btn from "../../subcomponents/buttons/Btn";
import Header from "../../subcomponents/Header/Header";
import Input from "../../subcomponents/inputs/Input";
import Label from "../../subcomponents/inputs/Label";
import SinglePopup from "../PopUpComponent/SinglePopup";
const axios = require("axios");
const { useNavigate, useParams } = require("react-router-dom");

function ChangePassword(props) {
  const {
    isModalOpen,
    setisModalOpen,
    errorShow,
    setErrorShow,
    popupMsg,
    setPopupMsg,
  } = useContext(StateContext);

  const navigate = useNavigate();
  const { token } = useParams();

  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [validCred, setValidCred] = useState(true);
  const [error, setError] = useState("");

  // Changing Form Steps
  const [formStep, setFormStep] = useState(0);

  const changeFormStepNext = () => {
    setFormStep((formStep) => formStep + 1);
  };

  // Managing the inputs
  const handleInputs = (e) => {
    setPassword((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  // const loginManage = () => {
  //   // localStorage.setItem("user", user);

  //   if (user.email == "admin") {
  //     // setProfile(true);
  //     // setProfile({ [e.target.name]: e.target.value });
  //     navigate("/dashboard");
  //   } else {
  //     navigate("/login");
  //   }
  // };

  // Handle after submitting
  const handlesubmitchange = (e) => {
    e.preventDefault();
    const { newPassword, confirmPassword } = password;
    if (newPassword !== confirmPassword) {
      setError("Password don't match");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password length must be atleast 6");
      return;
    }
    setError("");

    axios
      .post(`/api/auth/reset/${token}`, { password: newPassword })
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        setPopupMsg("Invalid credentials !");
        setErrorShow(true);
      });
  };

  return (
    <div id="signup" className="login w-full pt-4">
      {errorShow && (
        <SinglePopup className=" bg-red-300" icon={<AiOutlineClose />} />
      )}
      <Header title="Change Password" />
      <div className="w-full flex items-center ">
        <div className="w-full flex-1 h-full sm:max-w-2xl md:mx-auto bg-white rounded-lg shadow-xl">
          <form className="flex items-center justify-center p-6 sm:p-6 md:w-full">
            <div className="w-full">
              <div>
                <div className="mb-3">
                  <Label text="Enter new password" labelFor="password" />
                  <Input
                    name="newPassword"
                    type="password"
                    id="newPassword"
                    placeholder="Type your new password here"
                    value={password.newPassword}
                    onChange={handleInputs}
                  />
                </div>
                <div className="mb-3">
                  <Label text="Confirm password" labelFor="confirm" />
                  <Input
                    name="confirmPassword"
                    type="password"
                    id="confirmPassword"
                    placeholder="Again type your password here"
                    value={password.confirmPassword}
                    onChange={handleInputs}
                  />
                </div>
                {error && <p>{error}</p>}
              </div>

              <div className="flex justify-end mt-5">
                <Btn
                  type="button"
                  text="Change"
                  onClick={handlesubmitchange}
                  className="text-white bg-main-red px-2 hover:bg-pink-700 w-28"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
