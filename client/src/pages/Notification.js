import React, { useContext } from "react";
import { IoIosCreate } from "react-icons/io";
import { StateContext } from "../../context/StateProvider";

function Notification() {
  const { registerDet } = useContext(StateContext);
  return (
    <div className="w-full" id="notification">
      <div className="bg-gray-50 p-8">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-semibold leading-6 text-gray-800">
            Notifications
          </p>
          <div className="cursor-pointer" onclick="notificationHandler(false)">
            {/* <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18"
                stroke="#4B5563"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="#4B5563"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg> */}
          </div>
        </div>
        <div className="w-full p-3 mt-8 bg-white rounded flex">
          <div className="w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center">
            <IoIosCreate className="text-main-blue" />
          </div>
          <div className="pl-3">
            <p className="text-sm leading-none">
              <span className="text-indigo-700">{registerDet.fullname}</span>{" "}
              your profile has been created successfully
            </p>
          </div>
        </div>

        <div className="flex items-center justiyf-between">
          <hr className="w-full" />
          <p className="text-sm flex flex-shrink-0 leading-normal px-3 py-16 text-gray-500">
            Thats it for now :)
          </p>
          <hr className="w-full" />
        </div>
      </div>
    </div>
  );
}

export default Notification;
