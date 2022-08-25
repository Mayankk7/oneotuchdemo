import React from "react";

function MemberDetailsCard({ title, number, icon }) {
  return (
    <div className="flex justify-between w-72 hover:bg-main-red text-main-blue hover:text-white font-semibold hover:scale-110   px-4 py-4 shadow-delivery-shadow">
      <div>
        <div>
          <p className="text-3xl">{number}</p>
        </div>
        <div className="Allmembers">
          <h1>{title}</h1>
        </div>
      </div>
      <div className="flex justify-center   items-center ">{icon}</div>
    </div>
  );
}

export default MemberDetailsCard;
