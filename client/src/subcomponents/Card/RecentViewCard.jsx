import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Btn from "../buttons/Btn";

function RecentViewCard({ img, name, age, location, onClick }) {
  return (
    <div
      onClick={onClick}
      className="p-2 cursor-pointer hover:scale-105 transition-all duration-150"
    >
      <div className="rounded bg-main-red text-white  shadow ">
        <div className="img">
          <LazyLoadImage
            effect="blur"
            src={img}
            className="mx-auto d-block"
            style={{ height: "210px", width: "280px" }}
            alt=""
          />
        </div>
        <div className=" text-left p-2">
          <h1 className="font-semibold">{name}</h1>
          <p>{age}</p>
          <p>{location}</p>
          <div className="text-center">
            <Btn
              className="hover:bg-pink-700 w-44 my-4"
              text="View Profile"
              onClick={() => {
                showProfileHandler(profile);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentViewCard;
