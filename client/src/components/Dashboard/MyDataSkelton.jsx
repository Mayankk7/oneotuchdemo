import React, { useState,useContext } from "react";
import { BsPencilSquare } from "react-icons/bs";
import EditModal from "./EditModal";
import { StateContext } from "../../context/StateProvider";


function MyDataSkelton({ title, icon, data, onEdit }) {
  const [showModal, setShowModal] = useState(false);
  const {
    registerDet,
    addedProfile,
    setAddedProfile,
    blockedProfile,
    setBlockedProfile,
    errorShow,
    setErrorShow,
    popupMsg,
    setPopupMsg,
  } = useContext(StateContext);
  // const handleInput = (e) => {
  //   setInformation({ ...information, [e.target.name]: e.target.value });
  // };

  return (
    <div className=" shadow-delivery-shadow bg-main-red text-white p-4 rounded-md">
      <div className="flex justify-between my-2 ">
        <div className="flex justify-center items-center  ">
          <span className="text-blue-200">{icon}</span>
          <h1 className="mx-2 text-lg">{title}</h1>
        </div>
        <div
          onClick={() => setShowModal(true)}
          className="flex justify-center cursor-pointer items-center pr-2 rounded-md bg-green-500 text-white font-semibold"
        >
          <span className="px-2">
            <BsPencilSquare />
          </span>
          <h1> Edit</h1>
        </div>
      </div>
      {/* Infos */}
      {showModal && (
        <EditModal
          title={title}
          data={data}
          onEdit={onEdit}
          setShowModal={setShowModal}
          showModal={showModal}
        />
      )}
      <div className="grid lg:grid-cols-2  gap-3 ">
        {Object.keys(data).map((fieldName, index) => {
          return (
            <div key={index} className=" flex justify-between">
              <p className="font-semibold">{fieldName}:</p>
              <p className="text-white">{data[fieldName]}</p>
            </div>
          );
        })}
           

      </div>
    </div>
  );
}

export default MyDataSkelton;
