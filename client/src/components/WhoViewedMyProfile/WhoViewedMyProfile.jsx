import React, { useEffect, useState } from "react";
import CompleteView from "../../subcomponents/dashboardviews/CompleteView";
import Header from "../../subcomponents/Header/Header";
import Btn from "../../subcomponents/buttons/Btn";
import RecentViewCard from "../../subcomponents/Card/RecentViewCard";
import LoveLoader from "../PopUpComponent/LoveLoader";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const WhoViewedMyProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [profilesData, setProfilesData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      const token = localStorage.getItem("auth-token");
      // console.log(token);
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get("/api/auth/getWhoViewedMyProfile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log(response.data);
        setProfilesData(response.data);
        setIsLoading(false);
      } catch (error) {
        // console.log("unable to fetch data");
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);
  const navigate = useNavigate();
  const handleProfileView = (profile) => {
    // console.log(profile);
    navigate(`/${profile.userid}`);
  };

  return (
    <div>
      <div className=" text-center space-y-2 ">
        <Header title="Recent Views" />
        <p className=" border-blue-400">
          These people viewed your profile recently
        </p>

        {/* <Btn text="Next" onClick={() => navigate("/dashboard")} /> */}
      </div>
      <div className="">
        <div className="">
          <h1 className="text-2xl text-center pt-7 font-bold leading-loose text-main-blue">
            Who Viewed : {profilesData.length}
          </h1>
        </div>
        {isLoading ? (
          <LoveLoader />
        ) : (
          <div className="container overflow-hidden mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 pt-6 gap-2 ">
          {profilesData.map((singleData, key) => {
            return (
              //<RecentViewCard
              //  onClick={() => handleProfileView(singleData)}
              //  singleData={singleData}
              //  img={singleData.image}
              //  name={singleData.fullname}
              //  age={singleData.dob}
              //  location={singleData.country}
              //  key={singleData._id}
              ///>
              <div
                onClick={() => handleProfileView(singleData)}
                className="p-2 w-full mx-auto md:w-2/3  cursor-pointer hover:scale-105 transition-all duration-150"
              >
                <div className="rounded bg-main-red text-white  shadow ">
                  <div className="img">
                    <LazyLoadImage
                      effect="blur"
                      src={singleData.image}
                      className="mx-auto d-block object-cover"
                      style={{ height: "210px", width: "500px" }}
                      alt=""
                    />
                  </div>
                  <div className=" text-left p-2">
                    <h1 className="font-semibold">{singleData.fullname}</h1>
                    <p>{singleData.dob}</p>
                    <p>{singleData.country}</p>
                    <div className="text-center">
                      <Btn
                        className="hover:bg-pink-700 w-44 my-4"
                        text="View Profile"
                        onClick={() => {
                          showProfileHandler(singleData);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WhoViewedMyProfile;
