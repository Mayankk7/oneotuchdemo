import React, { useContext, useState } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
import { StateContext } from "../../context/StateProvider";
import BrideGroomDetails from "./BrideGroomDetails";
import FamilyDetails from "./FamilyDetails";
import PersonalDetails from "./PersonalDetails";
import ProfessionalDetails from "./ProfessionalDetails";
import SubRegister from "./SubRegister";

function RegisterWithSteps() {
  const { isModalOpen, setisModalOpen, registerDet, setregisterDet } =
    useContext(StateContext);

  const [formStep, setFormStep] = useState(0);

  // const changeFormStepNext = () => {
  //   setFormStep((formStep) => formStep + 1);
  // };

  // const changeFormStepPrevious = () => {
  //   setFormStep((formStep) => formStep - 1);
  // };

  return (
    <>
      <div id="signup" className="w-full pt-4">
        <div className="w-full flex items-center bg-gray-50">
          <div className=" w-[330px] md:w-full  flex-1 h-full sm:max-w-4xl md:mx-auto bg-white rounded-lg shadow-xl">
            <div className="w-100% sm:w-full flex flex-col md:flex-row">
              {/* Left Image */}
              <div className="mx-auto h-64 w-full  md:h-auto md:w-1/2">
                <img
                  style={{ height: "100%" }}
                  effect="blur"
                  className="object-cover w-full h-full"
                  src="https://i.ibb.co/Q9N6nhk/bg-main.jpg"
                  alt="img"
                />
              </div>
              <div className="flex items-center justify-center  sm:w-1/2   ">
                <div className=" w-[80%] md:w-full md:px-8 px-0 mx-2">
                  <h3 className="mb-4 text-3xl text-center font-bold text-main-blue">
                    Sign up
                  </h3>
                  {/* Multiple Step Section */}
                  {formStep === 0 && (
                    <SubRegister
                      formStep={formStep}
                      setFormStep={setFormStep}
                      registerDet={registerDet}
                      setregisterDet={setregisterDet}
                    />
                  )}
                  {formStep === 1 && (
                    <BrideGroomDetails
                      formStep={formStep}
                      setFormStep={setFormStep}
                      registerDet={registerDet}
                      setregisterDet={setregisterDet}
                    />
                  )}
                  {formStep === 2 && (
                    <PersonalDetails
                      formStep={formStep}
                      setFormStep={setFormStep}
                      registerDet={registerDet}
                      setregisterDet={setregisterDet}
                    />
                  )}
                  {formStep === 3 && (
                    <ProfessionalDetails
                      formStep={formStep}
                      setFormStep={setFormStep}
                      registerDet={registerDet}
                      setregisterDet={setregisterDet}
                    />
                  )}
                  {formStep === 4 && (
                    <FamilyDetails
                      formStep={formStep}
                      setFormStep={setFormStep}
                      registerDet={registerDet}
                      setregisterDet={setregisterDet}
                    />
                  )}

                  {/* <div className="flex justify-between mt-5">
                  <Btn
                    type="button"
                    text="Previous"
                    onClick={changeFormStepPrevious}
                    className="text-white bg-main-red px-2 hover:bg-pink-700 w-28"
                  />
                  
                  <Btn
                    type="submit"
                    text="Next"
                    onClick={changeFormStepNext}
                    className="text-white bg-main-red px-2 hover:bg-pink-700 w-28"
                  />
                </div> */}
                  <p className="py-5">
                    Already Have An Account{" "}
                    <Link
                      onClick={() => setisModalOpen(false)}
                      to="/login"
                      className="font-semibold text-main-red hover:underline cursor-pointer"
                    >
                      Log In
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterWithSteps;
