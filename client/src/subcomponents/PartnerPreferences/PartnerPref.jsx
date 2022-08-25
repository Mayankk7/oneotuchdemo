import React from "react";

function PartnerPref({ prefOccupation, prefAge }) {
  return (
    <div className=" shadow-delivery-shadow p-4 my-8 ">
      <h1 className="text-center text-main-blue text-2xl my-2 font-bold">
        Partner Preference
      </h1>
      <div className="text-lg ">
        <h1 className="flex justify-evenly">
          <span className=" font-mono">Age</span> :{" "}
          <span className="text-main-red font-mono">
            {prefAge || "Not Selected"}
          </span>
        </h1>
        <h1 className="flex justify-evenly">
          <span className=" font-mono">Occupation</span> :{" "}
          <span className="text-main-red font-mono">
            {prefOccupation || "Not Selected"}
          </span>
        </h1>
      </div>
    </div>
  );
}

export default PartnerPref;
