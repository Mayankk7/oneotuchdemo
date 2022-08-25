import React, { useContext, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../../context/StateProvider";
import {
  languagesData,
  religionDatas,
  siblingData,
} from "../../data/selectData";
import Btn from "../../subcomponents/buttons/Btn";
import Input from "../../subcomponents/inputs/Input";
import Label from "../../subcomponents/inputs/Label";
import Select from "../../subcomponents/Select/Select";

function BrideGroomDetails({ formStep, setFormStep }) {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [nameMsg, setnameMsg] = useState("");
  const [formError, setFormError] = useState({
    fullname: "",
    dob: "",
    lang: "",
    religion: "",
    sibling: "",
  });

  // Using Context to get values
  const { registerDet, setregisterDet } = useContext(StateContext);
  //console.log(registerDet.dob);

  const handleInputs = (e) => {
    setregisterDet({ ...registerDet, [e.target.name]: e.target.value });
  };
  //console.log(registerDet);

  const handleSubmit = (e) => {
    e.preventDefault();
    date.target
      ? (registerDet.dob = date.target.value)
      : (registerDet.dob = "");
    let { fullname, dob, sibling, lang, religion } = registerDet;
    let isValid = true;
    //console.log(fullname);
    if (!fullname) {
      setFormError((prevFormError) => {
        return { ...prevFormError, fullname: "Please enter the name" };
      });
      isValid = false;
    } else {
      setFormError((prevFormError) => {
        return { ...prevFormError, fullname: "" };
      });
      isValid = true;
    }

    // get Age
    function getAge(dateString) {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      return age;
    }

    if (!dob) {
      setFormError((prevFormError) => {
        return { ...prevFormError, dob: "Please enter your date of birth" };
      });
      isValid = false;
    } else if (getAge(dob) <= 20) {
      setFormError((prevFormError) => {
        return { ...prevFormError, dob: "Age should be more then 20" };
      });
      isValid = false;
    } else {
      setFormError((prevFormError) => {
        return { ...prevFormError, dob: "" };
      });

      isValid = true;
    }

    if (!isValid) {
      return;
    }
    setregisterDet(registerDet);
    setFormStep(formStep + 1);
  };

  const stepPrevious = () => {
    setFormStep(formStep - 1);
  };

  //console.log(registerDet);

  return (
    // Personal Info
    <form>
      <div className="my-2">
        <h1 className="text-center text-base font-mono ">
          <hr className="border-1 border-main-blue w-full" />
          Great!!! Give some personal info
        </h1>
      </div>
      <div className="mb-6">
        <Label labelFor="fullname" text="Name " />
        <Input
          name="fullname"
          placeholder="Enter  name.."
          value={registerDet.fullname}
          onChange={handleInputs}
        />
        <p className="text-main-red font-noto-sans">{formError.fullname}</p>
      </div>
      <div className="mb-6">
        <Label text="Date of Birth" labelFor="dob" />
        <input
          datepicker
          selected={date}
          name="dob"
          onChange={(date) => setDate(date)}
          type="date"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 "
          placeholder="Select date"
        />
        <p className="text-main-red font-noto-sans">{formError.dob}</p>
      </div>
      <div className="mb-6">
        <Label labelFor="religion" text="Religion  " />
        <Select
          name="religion"
          datas={religionDatas}
          value={registerDet.religion}
          onChange={handleInputs}
        />
      </div>
      <div className="mb-6">
        <Label labelFor="lang" text="Mother tongue " />
        <Select
          name="lang"
          datas={languagesData}
          value={registerDet.lang}
          onChange={handleInputs}
        />
      </div>
      <div className="mb-6">
        <Label labelFor="sibling" text="Number of Siblings " />
        <Select
          name="sibling"
          datas={siblingData}
          value={registerDet.sibling}
          onChange={handleInputs}
        />
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

export default BrideGroomDetails;
