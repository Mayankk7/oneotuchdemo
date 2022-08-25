import React from "react";
import Btn from "../../subcomponents/buttons/Btn";
import SettingTitle from "../../subcomponents/Header/SettingTitle";
import Input from "../../subcomponents/inputs/Input";

function Password() {
  return (
    <div className="md:px-32 px-4 py-14">
      <SettingTitle
        title="Change Password"
        detail="Have any privacy concern ? You can easily change your account password from here."
      />
      <div className="md:w-[500px] space-y-4 ">
        {/* <CurrentStatus status="Visible To All" /> */}
        <Input
          id="oldpassword"
          placeholder="Old Password"
          name="oldpassword"
          label="Enter Your Current Password"
          className=""
          required={true}
        />
        <Input
          id="newpassword"
          placeholder="New Password"
          name="newpassword"
          label="Enter Your New Password"
          className=""
          required={true}
        />
        <Input
          id="newpassword"
          placeholder="Confirm New Password"
          name="newpassword"
          label="Confirm New Password"
          className=""
          required={true}
        />
        <Btn text="Change Password" />
      </div>
    </div>
  );
}

export default Password;
