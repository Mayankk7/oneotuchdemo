import React, { useContext } from "react";
import ContactUs from "../components/ContactUs/ContactUs";
import Footer from "../components/Footer/Footer";
import Signup from "../components/signup/Signup";
import { StateContext } from "../context/StateProvider";

function ContactUsPage() {
  const { isModalOpen, setisModalOpen } = useContext(StateContext);
  return (
    <div className="w-full  flex justify-center">
      {isModalOpen && <Signup />}
      <div className="w-full    ">
        <ContactUs />
        <div className="mx-4 mt-20">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default ContactUsPage;
