import React from "react";

function MemberActionCard({ icon, text }) {
  return (
    <div className="flex justify-center  bg-main-blue text-white  px-4 py-2 border-2 border-gray-300 ">
      <span className="flex items-center justify-center">{icon}</span>
      <div className="px-2">
        <p>{text}</p>
      </div>
    </div>
  );
}

export default MemberActionCard;
