import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../../context/StateProvider";
import { educationalDatas, workingDatas } from "../../data/selectData";
import Btn from "../../subcomponents/buttons/Btn";
import Input from "../../subcomponents/inputs/Input";
import Label from "../../subcomponents/inputs/Label";
import Select from "../../subcomponents/Select/Select";

function ProfessionalDetails({ formStep, setFormStep }) {
  const navigate = useNavigate();

  // Using Context to get values
  const { registerDet, setregisterDet } = useContext(StateContext);
  const [incomeMsg, setIncomeMsg] = useState("");
  const [formError, setFormError] = useState({
    company: "",
    profession: "",
  });

  //console.log(registerDet);

  // Handle Inputs
  const handleInputs = (e) => {
    setregisterDet({ ...registerDet, [e.target.name]: e.target.value });
  };

  // Managing Steps
  const stepPrevious = () => {
    setFormStep(formStep - 1);
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    let { profession, company, income } = registerDet;

    let isValid = true;

    if (!profession) {
      setFormError((prevFormError) => {
        return { ...prevFormError, profession: "Please enter your profession" };
      });
      isValid = false;
    } else {
      setFormError((prevFormError) => {
        return { ...prevFormError, profession: "" };
      });
      isValid = true;
    }

    // Income message
    if (!income) {
      setIncomeMsg((prevstate) => "Please enter your income first !");
      isValid = false;
    } else {
      setIncomeMsg("");
    }

 
    if (!isValid) {
      return;
    }

    setregisterDet(registerDet);
    setFormStep(formStep + 1);
  };
  //console.log(registerDet);

  return (
    // Professional Details
    <form className="w-full">
      <div className="mb-3">
        <Label labelFor="education" text="Highest Degree " />
        <Select
          name="education"
          datas={educationalDatas}
          value={registerDet.education}
          onChange={handleInputs}
        />
      </div>
      <div className="mb-3">
        <Label labelFor="work" text="Employed In  " />
        <Select
          name="work"
          datas={workingDatas}
          onChange={handleInputs}
          value={registerDet.work}
        />
      </div>
      <div className="mb-3">
        <Label text="As a" labelFor="profession" />
        <Input
          name="profession"
          type="text"
          id="profession"
          placeholder="Type your position here"
          value={registerDet.profession}
          onChange={handleInputs}
        />

        <p className="text-main-red font-noto-sans">{formError.profession}</p>
      </div>
      <div className="mb-3">
        <Label text="Company name" labelFor="company" />
        <Input
          name="company"
          type="text"
          id="company"
          placeholder="Company Name"
          value={registerDet.company}
          onChange={handleInputs}
        />
        <p className="text-main-red font-noto-sans">{formError.company}</p>
      </div>

      <div className="mb-3">
        <Label labelFor="income" text="Annual income  " />
        <Input
          name="income"
          placeholder="Enter  your income.."
          value={registerDet.income}
          onChange={handleInputs}
        />
        <p className="text-main-red font-noto-sans">{incomeMsg}</p>
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

export default ProfessionalDetails;
