import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../../context/StateProvider";
// import { similarProfiles } from "../../data/profileDetailsData";
import Btn from "../../subcomponents/buttons/Btn";
import Header from "../../subcomponents/Header/Header";
import AddtoBlocklist from "../PopUpComponent/AddtoBlocklist";
import AddtoShortlist from "../PopUpComponent/AddtoShortlist";
import LoveLoader from "../PopUpComponent/LoveLoader";
import SinglePopup from "../PopUpComponent/SinglePopup";

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

function PreferencePage() {
  const [fetchingDetails, setFetchingDetails] = useState(true);

  const [similarProfiles, setSimilarProfiles] = useState([]);
  const [noSimilarProfiles,setnoSimilarProfiles] =useState(false)
  const {
    registerDet,
    addedProfile,

    setAddedProfile,
    blockedProfile,
    setBlockedProfile,
    errorShow,
    setErrorShow,
    popupMsg,
    setPopupMsg,
  } = useContext(StateContext);
  const navigate = useNavigate();

  // fetching similar profiles from database
  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    //console.log(token);

    //console.log("userid is added?", registerDet.useridadded);

    axios
      .post(
        "/api/auth/allUsers",
        { gender: registerDet.gender },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        //console.log(res);
        setSimilarProfiles(res.data);
        res.data.length == 0 ? (setnoSimilarProfiles(true)) : (setnoSimilarProfiles(false));
      })
      .catch((err) => {
        //console.log(err.response);
        setPopupMsg(" Failed to fetch details !");
        setErrorShow(true);
      });
  }, []);

  // Saving Someones Profile Handling
  const addToShortList = (profile) => {
    const token = localStorage.getItem("auth-token");
    axios
      .post(
        "/api/auth/saveProfile",
        { profileId: profile._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setAddedProfile(true);
      })
      .catch((err) => {
        setPopupMsg("Failed to add profile");
        setErrorShow(true);
      });
  };

  // Blocking Someones Profile Handling

  // const handleBlock = (profile) => {
  //   const token = localStorage.getItem("auth-token");
  //   axios
  //     .post(
  //       "/api/auth/blockProfile",
  //       { profileId: profile._id },
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     )
  //     .then((res) => {
  //       const updatedSimilarProfile = similarProfiles.filter(
  //         (prof) => prof._id !== profile._id
  //       );
  //       setBlockedProfile(true);
  //       setSimilarProfiles(updatedSimilarProfile);
  //     })
  //     .catch((err) => console.log(err));
  // };

  const showProfileHandler = (profile) => {
    navigate(`/${profile.userid}`);
  };

  return (
    <div>
      {errorShow && (
        <SinglePopup className="bg-red-300" icon={<AiOutlineClose />} />
      )}

      {blockedProfile && (
        <AddtoBlocklist setBlockedProfile={setBlockedProfile} />
      )}

      <div>
        <div className=" text-center space-y-2 ">
          {addedProfile && <AddtoShortlist />}
          <Header title="Profiles suggested to you" />
          <p className=" border-blue-400">
            These profiles are very similar with your preference
          </p>

          <Btn text="Next" onClick={() => navigate("/dashboard")} />
        </div>

        {similarProfiles.length == 0 ? (
          noSimilarProfiles ? (<p  style={{textAlign:"center" , marginTop:"20px" , fontSize:"18px"}}>No Result Found</p>) : (<LoveLoader />) 
          
        ) : (
          <div className="md:mx-44 grid lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 grid-cols-1">
            {similarProfiles &&
              similarProfiles.map((profile, key) => {
                return (
                  <div key={key} className="my-4 ">
                    <div className=" cursor-pointer m-2 xl:m-6 hover:scale-105 transition-all duration-150">
                      <div className=" bg-main-red text-white  rounded-lg shadow-md  md:mx-auto">
                        <img
                          loading="lazy"
                          className="  object-cover"
                          style={{ height: "220px", minWidth: "100%" }}
                          src={profile.image}
                          alt="image"
                          effect="blur"
                        />

                        <div className="space-y-1 pt-3">
                          <div className="text-left pl-4">
                            <h1 className="font-semibold text-lg">
                              {profile.fullname}
                            </h1>
                            <p>
                              {profile.dob
                                ? getAge(profile.dob) + " Years"
                                : ""}
                            </p>
                            <p>
                              {profile.education
                                ? profile.education.toUpperCase()
                                : ""}
                            </p>
                            <p>
                              {profile.city ? profile.city : ""},
                              {profile.state ? profile.state : ""}
                            </p>
                          </div>

                          <div className=" text-center">
                            <Btn
                              className="hover:bg-pink-700 w-44 my-4"
                              text="View Profile"
                              onClick={() => {
                                showProfileHandler(profile);
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* <div className="bg-main-red text-white mx-4 rounded shadow ">
                        <div className="img">
                          <img
                            loading="lazy"
                            effect="blur"
                            src={profile.image}
                            className="mx-auto d-block lazy"
                            style={{ height: "210px", width: "280px" }}
                            alt=""
                          />
                        </div>

                        <div className=" text-center p-2">
                          <h1 className="font-semibold">{profile.fullname}</h1>
                          <div className="flex flex-wrap pt-3 justify-around items-center">
                            <p>
                              {profile.dob
                                ? getAge(profile.dob) + " Years"
                                : ""}
                            </p>
                            <p>{profile.education ? profile.education : ""}</p>
                          </div>
                          <div className="flex flex-wrap pt-3 justify-around items-center">
                            <p>{profile.city ? profile.city : ""}</p>
                            <p>{profile.state ? profile.state : ""}</p>
                          </div>
                        </div>
                        <div className="flex justify-center mt-2 border-t-[1px] pt-3  space-x-2 pb-5">
                       
                          <Btn
                            className="hover:bg-pink-700 w-44 my-4"
                            text="View"
                            onClick={() => {
                              showProfileHandler(profile);
                            }}
                          />
                        </div>
                      </div> */}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}

export default PreferencePage;
