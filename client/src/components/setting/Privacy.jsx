import React, { useState } from "react";
import Btn from "../../subcomponents/buttons/Btn";
import CurrentStatus from "../../subcomponents/CurrentStatus";
import SettingTitle from "../../subcomponents/Header/SettingTitle";

function Privacy() {
  const [show, setshow] = useState(false);
  return (
    <div className="md:px-32 px-4 py-14">
      <SettingTitle
        title="Photo Privacy Setting"
        detail="You can set you photo privacy from here,so can manage who can see your photos."
      />
      <div className="md:w-[500px]">
        <CurrentStatus onClick={() => setshow(!show)} status="Visible To All" />
      </div>
      {show && (
        <div className="flex py-1 md:py-3 gap-x-2">
          <Btn
            text="All Members"
            className="bg-main-blue hover:bg-blue-800 text-white md:px-8 px-2 text-sm md:text-base rounded-md"
          />
          <Btn
            text="Paid Members"
            className="bg-main-blue hover:bg-blue-800 text-white md:px-8 px-2 text-sm md:text-base rounded-md"
          />
          <Btn
            text="Only Me"
            className="bg-main-blue hover:bg-blue-800 text-white md:px-8 px-2 text-sm md:text-base rounded-md"
          />
        </div>
      )}
    </div>
  );
}

export default Privacy;
