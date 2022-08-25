import React, { useState } from "react";
import Btn from "../../subcomponents/buttons/Btn";
import CurrentStatus from "../../subcomponents/CurrentStatus";
import SettingTitle from "../../subcomponents/Header/SettingTitle";

function Contact() {
  const [show, setshow] = useState(false);
  return (
    <div className="md:px-32 px-4 py-14">
      <SettingTitle
        title="Contact show setting"
        detail="Contact show setting option gives you access to set privacy for your contact detail."
      />
      <div className="md:w-[500px]">
        <CurrentStatus
          onClick={() => setshow(!show)}
          status="Visible To Paid members only"
        />
      </div>
      {show && (
        <div className="flex py-3 gap-x-2">
          <Btn
            text="All Members"
            className="bg-main-blue hover:bg-blue-800 text-white px-8 rounded-md"
          />
          <Btn
            text="Paid Members"
            className="bg-main-blue hover:bg-blue-800 text-white px-8 rounded-md"
          />
          <Btn
            text="Only Me"
            className="bg-main-blue hover:bg-blue-800 text-white px-8 rounded-md"
          />
        </div>
      )}
    </div>
  );
}

export default Contact;
