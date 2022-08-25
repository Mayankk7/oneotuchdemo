import axios from "axios";
import React, { useContext, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../../context/StateProvider";
import {
  mangolikData,
  parentsJob,
  prefAgeData,
  prefManOccupation,
  prefWomanOccupation,
} from "../../data/selectData";
import Btn from "../../subcomponents/buttons/Btn";
import Input from "../../subcomponents/inputs/Input";
import Label from "../../subcomponents/inputs/Label";
import Select from "../../subcomponents/Select/Select";
import SinglePopup from "../PopUpComponent/SinglePopup";

function FamilyDetails({ formStep, setFormStep }) {
  const navigate = useNavigate();

  // Using Context to get values

  const {
    setisModalOpen,
    registerDet,
    setregisterDet,
    errorShow,
    setErrorShow,
    popupMsg,
    setPopupMsg,
  } = useContext(StateContext);
  const [agreement, setAgreement] = useState(false);
  const [agreementMsg, setAgreementMsg] = useState("");
  const [prefAgeMsg, setPrefAgeMsg] = useState();
  const [prefOccupationMsg, setPrefOcupationMsg] = useState();
  const [fatherjobMsg, setFatherjobMsg] = useState();
  const [motherjobMsg, setMotherjobMsg] = useState();
  const [mangolikMsg, setMangolikMsg] = useState();
  const [zodiacMsg, setZodiacMsg] = useState();
  const [aboutyouMsg, setAboutyouMsg] = useState("");

  const handleInputs = (e) => {
    setregisterDet((prevRegisterDet) => ({
      ...prevRegisterDet,
      [e.target.name]: e.target.value,
    }));
  };

  //console.log(prefAgeMsg);

  // console.log(formError);
  // console.log(registerDet);

  const handleSubmit = (e) => {
    e.preventDefault();
    let {
      aboutyou,
      prefOccupation,
      prefAge,
      fatherjob,
      motherjob,
      mangolik,
      zodiac,
    } = registerDet;
    setregisterDet(registerDet);
    // console.log("---------registere data------------", registerDet);

    let isValid = true;
    // console.log(!motherjob)

    if (!fatherjob) {
      setFatherjobMsg(() => "Please input your father's job first!");
      isValid = false;
    } else {
      setFatherjobMsg(() => "");
    }
    if (!aboutyou) {
      setAboutyouMsg(() => "Please say something about you!");
      isValid = false;
    } else if (aboutyou.length <= 30) {
      setAboutyouMsg(() => "Minimum length must be 30 characters long!");
      isValid = false;
    } else {
      setAboutyouMsg(() => "");
    }

    if (!motherjob) {
      setMotherjobMsg(() => "Please input your mother's job first!");
      isValid = false;
    } else {
      setMotherjobMsg(() => "");
    }
    if (!mangolik) {
      setMangolikMsg(() => "Please input you are mangolik or not");
      isValid = false;
    } else {
      setMangolikMsg(() => "");
    }
    if (!zodiac) {
      setZodiacMsg(() => "Please input you are zodiac sign");
      isValid = false;
    } else {
      setZodiacMsg(() => "");
    }

    if (!prefAge) {
      setPrefAgeMsg(() => "Please input your preferred age first!");
      isValid = false;
    } else {
      setPrefAgeMsg(() => "");
    }

    if (!agreement) {
      setAgreementMsg((prevstate) => "Please tick the checkbox");
      isValid = false;
    } else {
      setAgreementMsg(() => "");
    }

    if (!prefOccupation) {
      setPrefOcupationMsg(
        () => "Please input your preferred partner's occupation first!"
      );
      isValid = false;
    } else {
      setPrefOcupationMsg(() => "");
    }

    if (!isValid) {
      return;
    }

    axios
      .post("/api/auth/signup", registerDet)
      .then((res) => {
        setPopupMsg((prevState) => res.data);
        //console.log(res.data);
        setErrorShow(true);
        setisModalOpen(false);
        navigate("/login");
      })
      .catch((err) => {
        setisModalOpen(false);
       // console.log(err.response);
        setPopupMsg(err.response.data.msg);
        setErrorShow(true);
      });
  };

  const stepPrevious = () => {
    setFormStep(formStep - 1);
  };

  return (
    // About You
    <form>
      {errorShow && <SinglePopup icon={<AiOutlineCheck />} />}
      <div className="mb-6">
        <Label text="Express Yourself" labelFor="aboutyou" />

        <textarea
          name="aboutyou"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 "
          value={registerDet.aboutyou}
          placeholder="Type something about you and your family"
          onChange={handleInputs}
        />
        <p className="text-main-red font-noto-sans">{aboutyouMsg}</p>
      </div>
      <div className="mb-3">
        <Label labelFor="fatherjob" text="Father's Job " />
        <Select
          name="fatherjob"
          datas={parentsJob}
          value={registerDet.fatherjob}
          onChange={handleInputs}
        />
        <p className="text-main-red font-noto-sans">{fatherjobMsg}</p>
      </div>
      <div className="mb-3">
        <Label labelFor="motherjob" text="Mother's Job  " />
        <Select
          name="motherjob"
          datas={parentsJob}
          value={registerDet.motherjob}
          onChange={handleInputs}
        />
        <p className="text-main-red font-noto-sans">{motherjobMsg}</p>
      </div>
      <div className="mb-3">
        <Label labelFor="prefAge" text="Preferred partner age  " />
        <Select
          name="prefAge"
          datas={prefAgeData}
          value={registerDet.prefAge}
          onChange={handleInputs}
        />
        <p className="text-main-red font-noto-sans">{prefAgeMsg}</p>
      </div>

      {registerDet.gender !== "female" ? (
        <div className="mb-3">
          <Label
            labelFor="prefOccupation"
            text="Preferred partner Occupation  "
          />
          <Select
            name="prefOccupation"
            datas={prefManOccupation}
            value={registerDet.prefOccupation}
            onChange={handleInputs}
          />
          <p className="text-main-red font-noto-sans">{prefOccupationMsg}</p>
        </div>
      ) : (
        <div className="mb-3">
          <Label
            labelFor="prefOccupation"
            text="Preferred partner Occupation  "
          />
          <Select
            name="prefOccupation"
            datas={prefWomanOccupation}
            value={registerDet.prefOccupation}
            onChange={handleInputs}
          />
          <p className="text-main-red font-noto-sans">{prefOccupationMsg}</p>
        </div>
      )}
      <div className="mb-3">
        <Label labelFor="mangolik" text="Are you a mangalik?" />
        <Select
          name="mangolik"
          datas={mangolikData}
          value={registerDet.mangolik}
          onChange={handleInputs}
        />
        <p className="text-main-red font-noto-sans">{mangolikMsg}</p>
      </div>
      <div className="mb-6">
        <Label labelFor="zodiac" text="Your zodiac sign" />
        <Input
          name="zodiac"
          placeholder="Enter  your zodiac sign"
          value={registerDet.zodiac}
          onChange={handleInputs}
        />
        <p className="text-main-red font-noto-sans">{zodiacMsg}</p>
      </div>
      <div className="mb-6">
        <Label labelFor="reffer" text="Who suggested you to join here " />
        <Input
          name="reffer"
          placeholder="Enter  your refferer name..."
          value={registerDet.reffer}
          onChange={handleInputs}
        />
      </div>

      <div className="mb-3">
        <input
          type="checkbox"
          onChange={() => setAgreement(!agreement)}
          id="agree"
        />
        <label htmlFor="agree">
          {" "}
          I agree <b>Above information is true</b>
        </label>
        <p className="text-main-red font-noto-sans">{agreementMsg}</p>
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
          text="Submit"
          onClick={handleSubmit}
          className="text-white bg-main-red px-2 hover:bg-pink-700 w-28"
        />
      </div>
    </form>
  );
}

export default FamilyDetails;
