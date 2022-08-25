import React from "react";

const SettingTitle = ({ title, detail }) => {
  return (
    <div className="border-b-[1px] border-gray-200">
      <div className="flex justify-between">
        {" "}
        <h2 className="text-2xl text-main-red font-bold">{title}</h2>
      </div>

      <p className="text-gray-500 text-sm py-2">{detail}</p>
    </div>
  );
};

export default SettingTitle;
