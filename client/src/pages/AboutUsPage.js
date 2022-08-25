import React, { useContext } from "react";
import AboutUs from "../components/AboutUs/AboutUs";
import Footer from "../components/Footer/Footer";
import Signup from "../components/signup/Signup";
import { StateContext } from "../context/StateProvider";

function AboutUsPage() {
  const { isModalOpen, setisModalOpen } = useContext(StateContext);
  return (
    <div className="w-full  ">
      <div className="flex justify-center ">{isModalOpen && <Signup />}</div>
      <div>
        <AboutUs />
        <div className="mx-4 mt-20">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;
