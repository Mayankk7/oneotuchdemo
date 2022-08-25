import React, { useContext } from "react";
import Footer from "../components/Footer/Footer";
import Membership from "../components/Membership/Membership";
import Signup from "../components/signup/Signup";
import { StateContext } from "../context/StateProvider";

function MembershipPage() {
  const { isModalOpen, setisModalOpen } = useContext(StateContext);
  return (
    <div className="w-full flex justify-center">
      {isModalOpen && <Signup />}
      <div>
        <Membership />
        <div className="mt-20">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default MembershipPage;
