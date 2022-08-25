import React, { useContext } from "react";
import PreRegistration from "../components//PopUpComponent/PreRegistration";
import FeaturedBride from "../components/FeaturedBrideGroom/FeaturedBride.jsx";
import FeaturedGroom from "../components/FeaturedBrideGroom/FeaturedGroom.jsx";
import Footer from "../components/Footer/Footer.jsx";
// import HomeMembership from "../components/Membership/HomeMembership.jsx";
// import Login fro../components/Register/LoginComponent.jsxjsx";
import Register from "../components/Register/Register.jsx";
import Signup from "../components/signup/Signup.jsx";
import Steps from "../components/Steps/Steps.jsx";
import WhyUs from "../components/Why Us/WhyUs.jsx";
import { StateContext } from "../context/StateProvider.js";

function Home() {
  const { isModalOpen, setisModalOpen, preRegModal, setPreRegModal } =
    useContext(StateContext);
  const handleCloseBtn = () => {
    setisModalOpen(false);
  };

  return (
    <div className="w-full flex  justify-center">
      {isModalOpen && <Signup />}
      {preRegModal && <PreRegistration />}
      <div className={` ${isModalOpen && "opacity-60"}`}>
        <div className="">
          <Register />
          <Steps />
          <WhyUs />
          <FeaturedBride />
          <FeaturedGroom />
          {/* <HomeMembership /> */}
          <Footer extraClass={"mx-[30px]"} />
        </div>
      </div>
    </div>
  );
}

export default Home;
