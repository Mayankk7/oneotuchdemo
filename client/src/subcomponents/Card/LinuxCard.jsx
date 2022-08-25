import React from "react";

function LinuxCard({ title, details }) {
  return (
    <div className="text-left ">
      <div className="  lg:grid grid-cols-2 p-4 space-y-6 lg:space-y-0">
        <div className="shadow-lg border col-span-2 bg-main-red text-white border-blue-500 rounded">
          <div className="relative flex p-4 justify-between  border-b border-gray-500">
            <h3 className="text-lg font-bold">{title}</h3>
            <div className="flex gap-2 items-center">
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
            </div>
          </div>
          <p className="p-4">{details}</p>
        </div>
      </div>
    </div>
  );
}

export default LinuxCard;
