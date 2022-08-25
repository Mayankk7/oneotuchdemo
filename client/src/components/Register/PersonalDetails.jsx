import React, { useContext, useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../../context/StateProvider";
import { heightDatas, livingDatas, maritalDatas } from "../../data/selectData";
import Btn from "../../subcomponents/buttons/Btn";
import Input from "../../subcomponents/inputs/Input";
import Label from "../../subcomponents/inputs/Label";
import Select from "../../subcomponents/Select/Select";

function PersonalDetails({ formStep, setFormStep }) {
  const navigate = useNavigate();

  // Using Context to get values
  const { registerDet, setregisterDet } = useContext(StateContext);

  // States Creation
  const [maritalMsg, setMaritalMsg] = useState("");
  const [formError, setFormError] = useState({
    country: "",
    state: "",
    city: "",
  });
  // Handle Inputs
  const handleInputs = (e) => {
    setregisterDet({ ...registerDet, [e.target.name]: e.target.value });
  };

  //console.log(registerDet);

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    let { country, state, city, marital, height, living } = registerDet;
    //console.log(country);

    let isValid = true;

    if (!country) {
      setFormError((prevFormError) => {
        return { ...prevFormError, country: "Please enter your country" };
      });
      isValid = false;
    } else {
      setFormError((prevFormError) => {
        return { ...prevFormError, country: "" };
      });
      isValid = true;
    }
    if (!state) {
      setFormError((prevFormError) => {
        return { ...prevFormError, state: "Please enter your state" };
      });
      isValid = false;
    } else {
      setFormError((prevFormError) => {
        return { ...prevFormError, state: "" };
      });
      isValid = true;
    }

    // gender message
    if (!marital) {
      setMaritalMsg((prevstate) => "Please enter your marital status");
      isValid = false;
    } else {
      setMaritalMsg("");
    }

    if (!city) {
      setFormError((prevFormError) => {
        return { ...prevFormError, city: "Please enter your city" };
      });
      isValid = false;
    } else {
      setFormError((prevFormError) => {
        return { ...prevFormError, city: "" };
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

 // console.log(registerDet);

  return (
    // Personal Details
    <form className="w-full">
      <div className="mb-3">
        <Label text="Country" labelFor="country" />
        <CountryDropdown
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          name="country"
          value={registerDet.country}
          onChange={(val) => setregisterDet({ ...registerDet, country: val })}
        />
        <p className="text-main-red font-noto-sans">{formError.country}</p>
      </div>

      <div className="mb-3">
        <Label text="State" labelFor="state" />
        <RegionDropdown
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          country={registerDet.country}
          value={registerDet.state}
          name="state"
          onChange={(val) => setregisterDet({ ...registerDet, state: val })}
        />
        <p className="text-main-red font-noto-sans">{formError.state}</p>
      </div>
      <div className="mb-6">
        <Label labelFor="city" text="City " />
        <Input
          name="city"
          placeholder="Enter  city.."
          value={registerDet.city}
          onChange={handleInputs}
        />
        <p className="text-main-red font-noto-sans">{formError.city}</p>
      </div>

      <div className="mb-3">
        <Label labelFor="marital" text="Marital status " />
        <Select
          name="marital"
          datas={maritalDatas}
          value={registerDet.marital}
          onChange={handleInputs}
        />
        <p className="text-main-red font-noto-sans">{maritalMsg}</p>
      </div>
      <div className="mb-3">
        <Label labelFor="height" text="Height " />
        <Select name="height" datas={heightDatas} onChange={handleInputs} />
      </div>

      <div className="mb-3">
        <Label labelFor="living" text="Family Type  " />
        <Select name="living" datas={livingDatas} onChange={handleInputs} />
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

export default PersonalDetails;
