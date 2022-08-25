import React from "react";

function MemberPanelCard({ icon, text }) {
  return (
    <div className="flex bg-main-blue text-white px-3 py-2 w-40 rounded-md">
      <div className="flex justify-center items-center mx-2">{icon}</div>
      <div>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default MemberPanelCard;
