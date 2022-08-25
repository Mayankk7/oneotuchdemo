import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
function RightwrongImage({ title, img }) {
  return (
    <div className="flex items-center justify-center my-2">
      <figure className="relative max-w-xs cursor-pointer">
        <LazyLoadImage
          effect="blur"
          className="rounded-lg shadow-xl hover:shadow-2xl w-36 h-40 object-cover "
          src={img}
          alt={title}
        />
        <figcaption className="absolute text-lg w-full -mt-0 text-center text-green-600 px-4">
          <div className="flex justify-center items-center mt-1">
            <h1 className="font-bold">{title}</h1>
          </div>
        </figcaption>
      </figure>
    </div>
  );
}

export default RightwrongImage;
