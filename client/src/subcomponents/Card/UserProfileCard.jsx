import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Btn from "../buttons/Btn";

function UserProfileCard({ name, membership, id, image, data }) {
  return (
    <div>
      <div className=" shadow-delivery-shadow p-4 rounded-md">
        <div className=" w-full  ">
          <div className="flex justify-between mb-4 ">
            <div className="flex space-x-4 justify-evenly">
              <span>
                <input
                  type="checkbox"
                  id="select"
                  name="selectall"
                  value="selectall"
                />
              </span>
              <span className="text-3xl font-serif">{name}</span>
              <span className=" font-noto-sans text-main-red font-bold">
                {id}
              </span>
            </div>
            <div>
              <h1 className="text-lg rounded-lg px-4 border-gray-600 bg-main-blue text-white font-bold py-1">
                {membership}
              </h1>
            </div>
          </div>
          <div className="flex text-left items-center justify-center  ">
            <div className=" hidden md:block mx-2">
              <LazyLoadImage
                effect="blur"
                src={image}
                className="w-48 lg:block"
                alt=""
              />
            </div>
            <div className="grid lg:grid-cols-2  gap-3 ">
              {data.map((singleData, index) => {
                return (
                  <div className=" flex justify-between space-x-6">
                    <p className="font-semibold">{singleData.title}:</p>
                    <p className="text-main-blue">{singleData.value}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <Btn className="bg-main-blue" text="View Profile" />
            <Btn className="bg-main-blue" text="Edit Profile" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileCard;
