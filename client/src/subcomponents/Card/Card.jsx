import React from "react";

function Card({ icon, heading, details, className, onClick }) {
  return (
    <div>
      <div className="flex  text-main-blue my-2  ">
        <div className={`space-y-3 text-center ${className}`}>
          <div className="bg-main-red inline-flex p-6 rounded-full text-[80px] text-white">
            {icon}
          </div>
          <div onClick={onClick}>
            <h3 className="text-base md:text-2xl font-bold pt-6">{heading}</h3>
            <p className="w-80 ">{details}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
