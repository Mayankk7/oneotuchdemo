import React from "react";
import Btn from "./buttons/Btn";
import { MdEdit } from "react-icons/md";

const CurrentStatus = ({ status, onClick }) => {
  return (
    <div className="flex items-center justify-between py-3">
      <p className="text-black font-semibold">Current Status:</p>
      <div className="flex md:gap-x-14 gap-x-5 items-center">
        <p className="text-main-red font-semibold">{status}</p>
        <Btn
          className="rounded-md py-1.5 w-max flex items-center gap-x-1 "
          onClick={onClick}
          fIcon={<MdEdit />}
          text="Edit"
        />
      </div>
    </div>
  );
};

export default CurrentStatus;
