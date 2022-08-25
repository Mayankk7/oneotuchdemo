import axios from "axios";
import React, { useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { StateContext } from "../../context/StateProvider";
import useFetchProfiles from "../../hooks/useFetchProfiles";
import Btn from "../../subcomponents/buttons/Btn";
import SettingTitle from "../../subcomponents/Header/SettingTitle";
import LoveLoader from "../PopUpComponent/LoveLoader";
import Unblock from "../PopUpComponent/Unblock";

// get the age of the user from date of birth (dob)
function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function Blacklist() {
  const { profilesData, setProfilesData, isLoading } = useFetchProfiles(
    "/api/auth/blockedProfiles"
  );

  const { unblocked, setUnblocked } = useContext(StateContext);

  function unblockHandler(profile) {
    const token = localStorage.getItem("auth-token");
    axios
      .post(
        "/api/auth/blockProfile",
        { profileId: profile._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        const updatedProfilesData = profilesData.filter(
          (prof) => prof._id !== profile._id
        );
        setProfilesData(updatedProfilesData);
        setUnblocked(true);
      })
      .catch((err) => console.log(err));
  }
  // Total member in blocklist
  const totalBlockedMem = profilesData.length;

  return (
    <div className="md:px-32 px-2 py-14">
      <SettingTitle
        title="Blocked Members List"
        detail="You can see all blocked members list here and you also can block directly from here."
        totalBlockedMem={totalBlockedMem}
      />
      {unblocked && <Unblock />}
      {isLoading ? (
        <LoveLoader />
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          {profilesData.map((profile, key) => {
            return (
              <div
                key={key}
                className="border-[1px] my-4 mx-4 bg-main-red text-white border-gray-300 pb-3"
              >
                <div className=" flex justify-center">
                  <LazyLoadImage
                    effect="blur"
                    src={profile.image}
                    className=" rounded mb-5 object-cover w-44 h-32"
                    alt=""
                  />
                </div>
                <div className="text-center ">
                  <h1 className="font-semibold">Name: {profile.fullname}</h1>
                  <h1>
                    {profile.dob ? getAge(profile.dob) + "," : ""}{" "}
                    {profile.country}
                  </h1>
                </div>
                <div className="flex justify-center mt-2 space-x-2">
                  <Btn
                    className="py-1.5 rounded-md text-sm"
                    onClick={() => unblockHandler(profile)}
                    text="Unblock"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Blacklist;
