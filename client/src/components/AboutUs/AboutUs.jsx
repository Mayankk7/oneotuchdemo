import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Carousel from "../SuccessCarousel/Carousel";

function AboutUs() {
  return (
    <div className="mx-4">
      {/* About One Touch Matrimony */}
      <div className=" flex md:flex-row flex-col-reverse">
        <div className=" lg:w-2/4   text-center lg:py-20">
          <h1 className=" text-4xl font-bold text-main-red">
            ABOUT ONE TOUCH MATRIMONY
          </h1>
          <p className=" leading-loose text-left mx-auto     text-lg py-8">
            Onetouchmatrimoney, one of India's best known brands matrimonial
            service was founded with a simple objective - to help people find
            happiness. The company pioneered online matrimonials in 2022 and
            continues to lead the exciting matrimony category after more than a
            decade. By redefining the way people meet for marriage,
            Onetouchmatrimony has created a world-renowned service that has
            touched over 35 million people.
          </p>
        </div>
        <div className="lg:w-2/4 mt-10 ">
          <LazyLoadImage
            effect="blur"
            src="https://i.ibb.co/sFwhyds/about-Img-compressed.jpg"
            className=" w-40% "
            alt=""
          />
        </div>
      </div>
      <div className="  text-center bg-main-red pt-1 pb-10">
        <h1 className="text-3xl leading-8 font-semibold my-12 text-center text-white">
          Success of Onetouchmatrimony
        </h1>
        <p className="text-left pl-10 pr-5 text-lg text-white">
          Onetouchmatrimony, the india's most successful matchmaking service,
          has been trusted since 2022 by people all over the world to help them
          find their soulmates. Today, hundreds of thousands of people have met
          their life partners through our revolutionary matchmaking service and
          countless others have made some very special friends.
        </p>
      </div>
      <div className="2xl:container 2xl:mx-auto 2xl:px-0 py-3 ">
        <Carousel />
      </div>
    </div>
  );
}

export default AboutUs;
