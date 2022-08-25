import React from "react";

function SubMyProfile({ title, data }) {
  return (
    <div className="mt-4 shadow-delivery-shadow rounded">
      <div className="bg-main-red text-center py-2 text-white rounded">
        <h1 className="text-lg font-semibold">
          <a href="/profile">{title}</a>
        </h1>
      </div>
      <div className="p-4">
        {data.map((msg, index) => (
          <div className="flex justify-between items-center mt-4">
            <p className="">
              <a href="#">{msg.title}</a>
            </p>
            <span className="bg-gray-700 rounded-full px-2 text-white">
              {msg.notification}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubMyProfile;
