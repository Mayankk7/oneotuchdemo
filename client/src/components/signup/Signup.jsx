import React, { useContext } from "react";
import { ImCross } from "react-icons/im";
import { StateContext } from "../../context/StateProvider";
import RegisterWithSteps from "../Register/RegisterWithSteps";

function Signup() {
  const { isModalOpen, setisModalOpen } = useContext(StateContext);
  const handleCloseBtn = () => {
    setisModalOpen(false);
  };

  return (
    <div className=" opacity-100 min-h-[900px] absolute md:absolute md:top-7 z-50">
      <button
        className="absolute -right-2 top-2 mt-8 z-50! "
        onClick={handleCloseBtn}
      >
        <ImCross className="text-2xl  font-normal text-main-red" />
      </button>
      <div
        className=""
        onClick={(e) => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}
      >
        <RegisterWithSteps />
      </div>
    </div>
  );
}

export default Signup;
