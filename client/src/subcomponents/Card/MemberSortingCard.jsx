import React from "react";

function MemberSortingCard({ text, notification }) {
  return (
    <div className="flex bg-main-blue text-white px-3 py-2 w-40 rounded-md justify-between">
      <div>
        <p>{text}</p>
      </div>
      <span className=" rounded-full px-2 text-main-blue bg-white  ">
        {notification}
      </span>
    </div>
  );
}

export default MemberSortingCard;
