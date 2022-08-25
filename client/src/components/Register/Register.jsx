import React, { useContext, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { StateContext } from "../../context/StateProvider";
import "../../styles/Register.css";
import Btn from "../../subcomponents/buttons/Btn";
import Input from "../../subcomponents/inputs/Input";
import Label from "../../subcomponents/inputs/Label";
import SinglePopup from "../PopUpComponent/SinglePopup";
const axios = require("axios");
const { useNavigate } = require("react-router-dom");

function Register() {
  const [codeSent, setCodeSent] = useState(false);
  const [phone, setPhone] = useState("");
  const [signUpMsg, setSignUpMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [nameMsg, setnameMsg] = useState("");
  const {
    registerDet,
    setregisterDet,
    setisModalOpen,
    isModalOpen,
    errorShow,
    setErrorShow,
  } = useContext(StateContext);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    registerDet.phone = phone;
    let { fullname, email, password } = registerDet;

    // Validation for name email and password
    let isValid = true;
    setSignUpMsg("");
    if (!fullname) {
      setnameMsg("Please enter the Name");
      isValid = false;
    } else {
      setnameMsg("");
    }
    if (!password) {
      setPasswordMsg("Please enter the password");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordMsg("Password must be atleast 6 characters");
      isValid = false;
    } else {
      setPasswordMsg("");
    }
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailRegex.test(email)) {
      setEmailMsg("");
    } else {
      setEmailMsg("Please enter a valid email!");
      isValid = false;
    }

    if (!isValid) return;

    setisModalOpen(!isModalOpen);

    // Handling Submiting data in backend

    // try {
    //   axios
    //     .post("/api/auth/signup", user)
    //     .then((res) => {
    //       setSignUpMsg(res.data);
    //       console.log("success in register", res.data);
    //       setErrorShow(true);
    //       setisModalOpen(!isModalOpen);
    //     })

    //     .catch((err) => {
    //       setSignUpMsg(err.response.data.msg);
    //       console.log("Error In Register", err.response.data.msg || err);
    //       return;
    //     });
    // } catch (error) {
    //   console.log(error);
    //   return;
    // }
  };

  // Handle Inputs
  const emailRegex = /\S+@\S+\.\S+/;
  const handleInputs = (e) => {
    setregisterDet({ ...registerDet, [e.target.name]: e.target.value });
  };

  return (
    <div className="background-img max-w-full overflow-hidden">
      {/* Registration Form */}

      <div className="w-80  md:w-1/3 p-8 m-8 rounded-md shadow-main bg-main-red text-white ">
        {errorShow && (
          <SinglePopup
            icon={<AiOutlineCheck />}
            title="Your verification code has been sent"
          />
        )}
        <form>
          <div className="mb-6">
            <Label labelFor="fullname" text="Full name " />
            <Input
              name="fullname"
              placeholder="Enter full name.."
              value={registerDet.fullname}
              onChange={handleInputs}
            />
            <p className="text-main-red font-noto-sans">{nameMsg}</p>
          </div>
          <div className="mb-6">
            <Label text="Mobile No." labelFor="phone" />
            <PhoneInput
              className="shadow-sm  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  flex w-full h-11 p-2"
              placeholder="Enter phone number"
              value={registerDet.phone}
              // rules={{ required: true }}
              onChange={(phone) => setPhone(phone)}
              defaultCountry="IN"
            />
          </div>
          <div className="mb-6">
            <Label text="Email" labelFor="email" />
            <Input
              name="email"
              type="email"
              id="email"
              placeholder="Type your email here"
              value={registerDet.email}
              onChange={handleInputs}
            />
            <p className="text-main-red font-noto-sans">{emailMsg}</p>
          </div>

          <div className="mb-6">
            <Label labelFor="password" text="Password" />
            <Input
              name="password"
              type="password"
              id="password"
              placeholder="Type your password here"
              value={registerDet.password}
              onChange={handleInputs}
            />
            <p className="text-main-red font-noto-sans">{passwordMsg}</p>
          </div>
          {/* Signup confirmation */}
          <p className="text-main-blue font-noto-sans">{signUpMsg}</p>
          {/* <p className="text-main-red font-noto-sans">{emailMsg}</p> */}

          <Btn
            text="Sign Up"
            type="submit"
            onClick={handleSubmit}
            className="text-white bg-main-red px-7 hover:bg-indigo-700 w-full"
          />
        </form>
      </div>
    </div>
  );
}

export default Register;
