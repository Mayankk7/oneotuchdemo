import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useNavigate } from "react-router-dom";
import { profileDatas } from "../../data/selectData";
import "../../styles/Register.css";
import Btn from "../../subcomponents/buttons/Btn";
import Input from "../../subcomponents/inputs/Input";
import Label from "../../subcomponents/inputs/Label";
import Select from "../../subcomponents/Select/Select";
import SinglePopup from "../PopUpComponent/SinglePopup";

function NewUser() {
  const [phone, setPhone] = useState("");

  const [user, setUser] = useState({
    profile: "",
    email: "",
    password: "",
    phone: "",
  });

  const [validCred, setValidCred] = useState(true);
  const [registerDet, setregisterDet] = useState({
    diet: "",
    aboutyou: "",
    living: "",
    height: "",
    phone: "",
    profile: "",
    fullname: "",
    dob: "",
    city: "",
    phone: "",
    email: "",
    password: "",
    hobby: "",
    interest: "",
    country: "",
    religion: "",
    lang: "",
    marital: "",
    education: "",
    work: "",
    profession: "",
    company: "",
    income: "",
  });

  const navigate = useNavigate();
  // Handle Submit
  const handleSubmit = (event) => {
    event.preventDefault();
    user.phone = phone;
    let { profile, email, password } = user;
    setregisterDet(user);
    axios
      .post("/api/auth/signup", registerDet)
      .then((res) => navigate("/dashboard"))
      .catch((err) => setValidCred(false));
  };

  // Handle Inputs
  const handleInputs = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div className="background-img overflow-hidden">
      {/* Registration Form */}
      <div className="lg:w-1/3 p-8 m-8 rounded-md shadow-main bg-white">
        {!validCred && (
          <SinglePopup
            className="bg-red-300"
            title="Invalid credentials !"
            icon={<AiOutlineCloseCircle />}
          />
        )}
        <form>
          <div className="mb-6">
            <Label labelFor="profile" text="Create a profile for  " />
            <Select
              name="profile"
              datas={profileDatas}
              onChange={handleInputs}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
          </div>
          <div className="mb-6">
            <Label text="Your Mobile No." labelFor="phone" />
            <PhoneInput
              className="shadow-sm  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  flex w-full h-11 p-2"
              name="phone"
              placeholder="Enter phone number"
              value={user.phone}
              rules={{ required: true }}
              onChange={(phone) => setPhone(phone)}
              defaultCountry="IN"
            />
          </div>
          <div className="mb-6">
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
          <div className="mb-6">
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
          <div className="flex items-start mb-6">
            <div className="ml-3 text-sm">
              <Label text="" className="font-medium ">
                By clicking 'Register', you confirm that you agree with our{" "}
                <a href="#terms" className=" text-blue-600 hover:underline ">
                  terms and conditions
                </a>
              </Label>
            </div>
          </div>
          <Btn
            text="Sign Up"
            type="submit"
            onClick={handleSubmit}
            className="text-white bg-main-red px-7 hover:bg-pink-700 w-full"
          />
        </form>
      </div>
    </div>
  );
}

export default NewUser;
