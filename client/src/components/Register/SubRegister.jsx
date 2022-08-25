import React, { useContext, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../../context/StateProvider";
import { profileDatas, sexData } from "../../data/selectData";
import Btn from "../../subcomponents/buttons/Btn";
import Input from "../../subcomponents/inputs/Input";
import Label from "../../subcomponents/inputs/Label";
import Select from "../../subcomponents/Select/Select";

function SubRegister({ formStep, setFormStep }) {
  // const [phone, setPhone] = useState();
  const [formErrors, setFormErrors] = useState({
    phone: "",
  });
  const [submit, setsubmit] = useState(false);

  const [passwordMsg, setPasswordMsg] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [genderMsg, setGenderMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [profileImg, setProfileImg] = useState("");

  const { registerDet, setregisterDet, user, setUser } =
    useContext(StateContext);

  const navigate = useNavigate();

  let isValid = true;
  // Handle Submit
  const handleSubmit = (event) => {
    event.preventDefault();

    if (profileImg) registerDet.image = profileImg;

    let { email, gender, phone, password } = registerDet;
    //console.log(registerDet);

    if (!phone) {
      isValid = false;
      setPhoneError((prevstate) => "Please Enter a phone number");
    } else if (phone.length <= 10) {
      isValid = false;
      setPhoneError((prevstate) => "Please enter a valid number");
    } else {
      isValid = true;
      setPhoneError((prevstate) => "");
    }

    if (!password) {
      setPasswordMsg((prevstate) => "Please enter the password");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordMsg((prevstate) => "Password must be atleast 6 characters");
      isValid = false;
    } else {
      setPasswordMsg("");
    }
    // gender message
    if (!gender) {
      setGenderMsg((prevstate) => "Please enter your gender");
      isValid = false;
    } else {
      setGenderMsg("");
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailRegex.test(email)) {
      setEmailMsg((prevstate) => "");
    } else {
      setEmailMsg((prevstate) => "Please enter a valid email!");
      isValid = false;
    }

    if (!isValid) return;

    setregisterDet(registerDet);
    setsubmit(true);
    setFormStep(formStep + 1);
  };

  const handlefile = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "matrimony");
    data.append("cloud_name", "dhgagcbfh");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dhgagcbfh/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    console.log(file);
    setProfileImg(file.url);
  };

  const handleInputs = (e) => {
    setregisterDet({
      ...registerDet,
      [e.target.name]: e.target.value,
    });
  };

  const stepPrevious = () => {
    setFormStep(formStep - 1);
  };

  return (
    <form>
      <div className="my-2">
        <hr className=" border-1 border-main-blue w-full" />
        <h1 className="text-center text-base font-mono ">Some basic infos</h1>
      </div>
      <div className="mb-3">
        <Label labelFor="profile" text="Profile for  " />
        <Select
          name="profile"
          datas={profileDatas}
          value={registerDet.profile}
          onChange={handleInputs}
        />
      </div>
      <div className="mb-6">
        <Label labelFor="image" text="Profile image " />
        <Input
          style={{ display: "block", padding: "0px" }}
          className="px-4"
          type="file"
          name="image"
          onChange={(e) => handlefile(e)}
        />
      </div>
      <div className="mb-3">
        <Label labelFor="gender" text="Gender  " />
        <Select
          name="gender"
          datas={sexData}
          value={registerDet.gender}
          onChange={handleInputs}
          required
        />
        <p className="text-main-red font-noto-sans">{genderMsg}</p>
      </div>
      <div className="mb-3">
        <Label text="Mobile No." labelFor="phone" />
        <PhoneInput
          className="shadow-sm h-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-w-full p-2"
          name="phone"
          placeholder="Enter phone number"
          value={registerDet.phone}
          onChange={(phone) => setregisterDet({ ...registerDet, phone: phone })}
          defaultCountry="IN"
        />
        <p className="text-main-red font-noto-sans">{phoneError}</p>
      </div>
      <div className="mb-3">
        <Label text="Email Id" labelFor="email" />
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

      <div className="mb-3">
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

      <div className="flex justify-between mt-5">
        <Btn
          type="button"
          text="Previous"
          onClick={stepPrevious}
          className="text-white bg-main-red px-2 hover:bg-pink-700 w-28"
        />

        <Btn
          type="submit"
          text="Next"
          onClick={handleSubmit}
          className="text-white bg-main-red px-2 hover:bg-pink-700 w-28"
        />
      </div>
    </form>
  );
}

export default SubRegister;
