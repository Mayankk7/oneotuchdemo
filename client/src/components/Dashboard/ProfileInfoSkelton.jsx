import React from "react";

function ProfileInfoSkelton({ data, isTrue = false, className }) {
  return (
    <div
      className={`w-full ${
        !isTrue &&
        "shadow-delivery-shadow bg-main-red text-white px-4 rounded-md"
      }`}
    >
      {/* Infos */}

      <div className={`grid lg:grid-cols-2  gap-6 ${className}`}>
        {Object.keys(data).map((fieldName, index) => {
          return (
            <div key={index} className="  flex justify-between  px-4">
              <p className="font-semibold">{fieldName}:</p>
              <p className={`${data[fieldName] && "text-red-50"}`}>
                {data[fieldName] ? data[fieldName] : "Not available"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProfileInfoSkelton;
