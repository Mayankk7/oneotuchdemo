import React, { useContext, useEffect, useState } from "react";
import { AiFillCloseCircle, AiOutlineClose } from "react-icons/ai";
import { BiBookAlt, BiCurrentLocation } from "react-icons/bi";
import { BsPencilFill } from "react-icons/bs";
import { FcViewDetails } from "react-icons/fc";
import { GiHabitatDome, GiLovers } from "react-icons/gi";
import { MdOutlineCastForEducation } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import defaultImage from "../../assets/image/default-profile.jpg";
import { StateContext } from "../../context/StateProvider";
import Input from "../../subcomponents/inputs/Input";
import SinglePopup from "../PopUpComponent/SinglePopup";
import MyDataSkelton from "./MyDataSkelton";

const axios = require("axios");

const mapKeys = {
  "User Name": "fullname",
  "Mobile No": "phone",
  "Date Of Birth": "dob",
  "Mother Tongue": "lang",
  Email: "email",
  Gender: "gender",
  Height: "height",
  "Marital Status": "marital",
  Education: "education",
  "Job Type": "work",
  Occupation: "profession",
  Company: "company",
  "Annual Income": "income",
  Religion: "religion",
  Caste: "caste",
  "Willing to marry other caste ?": "othercaste",
  Country: "country",
  State: "state",
  City: "city",
  Smoking: "smoking",
  Drinking: "drinking",
  "Eating Habits": "diet",
  imageURL: "image",
  Sibling: "sibling",
  "Father's Job": "fatherjob",
  "Mother's Job": "motherjob",
  Mangolik: "mangolik",
  "Zodiac Sign": "zodiac",
  "Preferred Age": "prefAge",
  "Preferred Occupation": "prefOccupation",
  "User_Id" : "userid"
};

function MyProfile() {
  const [notification, setNotification] = useState(true);

  const [userDetails, setUserDetails] = useState({});
  const {
    registerDet,
    setregisterDet,
    errorShow,
    setErrorShow,
    popupMsg,
    setPopupMsg,
  } = useContext(StateContext);

  const [images, setImages] = useState({
    image: "",
    image1: "",
    // image2: "",
    // image3: "",
  });

  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    axios
      .get("/api/auth/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setImages((prevState) => {
          return {
            image: res.data.image,
            image1: res.data.image1,
            // image2: res.data.image2,
            // image3: res.data.image3,
          };
        });
        // Mapping property stored in database to property being displayed to user
        const mappedData = {};
        for (const key in mapKeys) {
          mappedData[key] = res.data[mapKeys[key]]
            ? res.data[mapKeys[key]]
            : "";
        }
        setUserDetails(mappedData);
        setregisterDet((prevState) => {
          return { ...prevState, image: res.data.image };
        });
      })

      .catch((err) => {
        setPopupMsg("Failed to fetch details !");
        setErrorShow(true);
      });
  }, []);

  const basicDetails = {
    "User Name": userDetails["User Name"],
    "Mobile No": userDetails["Mobile No"],
    "Date Of Birth": userDetails["Date Of Birth"],
    "Mother Tongue": userDetails["Mother Tongue"],
    Email: userDetails["Email"],
    Gender: userDetails["Gender"],
    Height: userDetails["Height"],
    Sibling: userDetails["Sibling"],
    "Father's Job": userDetails["Father's Job"],
    "Mother's Job": userDetails["Mother's Job"],
    "Marital Status": userDetails["Marital Status"],
    Mangolik: userDetails["Mangolik"],
    "Zodiac Sign": userDetails[" Zodiac Sign"],
    "Preferred Age": userDetails["Preferred Age"],
    "Preferred Occupation": userDetails["Preferred Occupation"],
    "User_Id" : "OTM-"+userDetails['User_Id']
  };

  const eduprofDetails = {
    Education: userDetails["Education"],
    "Job Type": userDetails["Job Type"],
    Occupation: userDetails["Occupation"],
    Company: userDetails["Company"],
    "Annual Income": userDetails["Annual Income"],
  };

  const religionDetails = {
    Religion: userDetails["Religion"],
    Caste: userDetails["Caste"],
    "Willing to marry other caste?":
      userDetails["Willing to marry other caste ?"],
  };

  const locationDetails = {
    Country: userDetails["Country"],
    State: userDetails["State"],
    City: userDetails["City"],
  };

  const habitDetails = {
    Smoking: userDetails["Smoking"],
    Drinking: userDetails["Drinking"],
    "Eating Habits": userDetails["Eating Habits"],
  };
  const prefPartner = {
    "Preferred Age": userDetails["Preferred Age"],
    "Preferred Occupation": userDetails["Preferred Occupation"],
  };

  const detailsChangeHandler = (details) => {
    const mappedDetails = {};
    for (const prop in details) {
      mappedDetails[mapKeys[prop]] = details[prop];
    }
    //console.log("Mapped Details ", mappedDetails);

    const token = localStorage.getItem("auth-token");

    axios
      .post(
        `/api/auth/editUserDetails`,
        { ...mappedDetails },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setUserDetails((prevState) => {
          return { ...prevState, ...details };
        });
      })
      .catch((err) => {
        setPopupMsg("Changes Failed !");
        setErrorShow(true);
      });
  };

  const handlepicture = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "matrimony");
    data.append("cloud_name", "dhgagcbfh");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dhgagcbfh/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    if (imageIndex == 0) {
      setregisterDet((prevState) => {
        return { ...prevState, image: file.url };
      });
    }

    // detailsChangeHandler({ imageURL: file.url });
    let changeImage = "image";
    if (imageIndex > 0) {
      changeImage += imageIndex;
    }
    let changeImageObj = {
      [changeImage]: file.url,
    };
    //console.log(changeImageObj);
    setImages((prevState) => {
      return { ...prevState, [changeImage]: file.url };
    });
    const token = localStorage.getItem("auth-token");
    axios
      .post(
        `/api/auth/editUserDetails`,
        { ...changeImageObj },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        //console.log(res.data);
      })
      .catch((err) => {
        setPopupMsg("Changes Failed !");
        //console.log(err.response);
        setErrorShow(true);
      });
  };

  return (
    <div>
      {/* Popup msg set if failed */}

      {errorShow && (
        <SinglePopup className="bg-red-300" icon={<AiOutlineClose />} />
      )}
      <div className="text-center my-3 ">
        <h1 className="text-3xl font-semibold  my-3 text-main-red">
          My Profile
        </h1>
        <p className=" my-3">
          This is your all profile detail which you added.You can view your all
          details and also can edit all your detail from here.
        </p>
      </div>
      {/* Editing Notify */}
      {notification && (
        <div className="flex justify-between mx-4 md:mx-10 bg-blue-100 rounded px-3 py-2">
          <p>
            Edit your profile details is very easy just click on the left pencil
            button ({" "}
            <span>
              <BsPencilFill className=" inline-block" />
            </span>{" "}
            ) and here we go. You can edit your profile detail
          </p>
          <span className="flex justify-center items-center">
            <AiFillCloseCircle
              onClick={() => setNotification(!notification)}
              size={20}
            />
          </span>
        </div>
      )}
      <div>
        {/* Profile Left Part */}
        <div className="lg:flex mx-4 md:mx-10  my-10">
          <div className="lg:w-1/3  ">
            {/* Profile Image */}
            <div className=" flex justify-center">
              <label for="image">
                <Input
                  type="file"
                  name="image"
                  onChange={(e) => handlepicture(e)}
                  id="image"
                  style={{ display: "none" }}
                />
                <LazyLoadImage
                  effect="blur"
                  src={
                    images
                      ? Object.entries(images)[imageIndex][1]
                      : defaultImage
                  }
                  // src={registerDet.image ? registerDet.image : defaultImage}
                  alt="image.jpg"
                  className=" object-cover w-64 h-48  "
                />
              </label>
            </div>
            {/* Little Images */}
            <div className=" flex w-full mt-4 justify-center  flex-row">
              {Object.entries(images).map((image, index) => {
                return (
                  <div className=" cursor-pointer mb-4  w-10 rounded-3xl">
                    <LazyLoadImage
                      effect="blur"
                      className="h-8 w-7"
                      onClick={() => {
                        setImageIndex((prevImageIndex) => index);
                      }}
                      src={image[1]}
                      alt=""
                    />
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center">
              {" "}
              <label htmlFor="image">
                <input
                  className="w-full flex justify-center"
                  type="file"
                  name="image"
                  onChange={(e) => handlepicture(e)}
                  id="image"
                  style={{ display: "none" }}
                />
                <div className=" w-64 mb-2  !rounded-none bg-main-red outline-none hover:bg-pink-600 text-white px-4 py-2  text-center text-base font-semibold cursor-pointer transition-all duration-150">
                  Change Profile Picture
                  {/* <Btn
                  className="text-sm w-64 py-4 !rounded-none"
                  text="Change Profile Picture"
                /> */}
                </div>
              </label>
            </div>

            {/* Layer 1  */}
            {/* <div className="p-4 shadow-delivery-shadow rounded mt-4">
              {layer1.map((data, index) => (
                <p className="flex items-center">
                  <span className="m-2">{data.icon}</span> {data.title}
                </p>
              ))}
            </div> */}

            {/* <SubMyProfile title="Interest Data" data={interestData} /> */}
            {/* Photo Request Section */}
            {/* <SubMyProfile title="Photo Request" data={photoRequestData} /> */}
          </div>
          {/* Right Part Started */}
          <div className="lg:ml-4 space-y-4  w-full md:mx-4">
            {/* Basic Details */}
            <MyDataSkelton
              title="Basic Details"
              icon={<FcViewDetails />}
              data={basicDetails}
              onEdit={detailsChangeHandler}
            />

            {/* Education & Profession */}
            <MyDataSkelton
              title="Education & Profession Details"
              icon={<MdOutlineCastForEducation />}
              data={eduprofDetails}
              onEdit={detailsChangeHandler}
            />

            {/* Religion Data */}
            <MyDataSkelton
              title="Religion Details"
              icon={<BiBookAlt size={20} />}
              data={religionDetails}
              onEdit={detailsChangeHandler}
            />

            {/* Location Data */}
            <MyDataSkelton
              title="Location Details"
              icon={<BiCurrentLocation />}
              data={locationDetails}
              onEdit={detailsChangeHandler}
            />

            {/* Habit Data */}
            <MyDataSkelton
              title="Habit Details"
              icon={<GiHabitatDome />}
              data={habitDetails}
              onEdit={detailsChangeHandler}
            />

            {/* Preference paste here*/}

            <MyDataSkelton
              title="Partner Preference"
              icon={<GiLovers />}
              data={prefPartner}
              onEdit={detailsChangeHandler}
            />
          </div>
        </div>

        {/* Full Part Ends */}
      </div>
    </div>
  );
}

export default MyProfile;

/* 

<h1 className="py-3 text-white rounded my-8 bg-main-blue text-center font-semibold text-3xl">
              Partner Preference
            </h1>

            {// Partner Preference Data's }
            {// Basic Details }

            <MyDataSkelton
              title="Basic Preference"
              icon={<GrDocumentText />}
              data={prefUserData}
            />
            {// Education & Profession }

            <MyDataSkelton
              title="Education & Profession Preference"
              icon={<MdOutlineCastForEducation />}
              data={prefenceEducation}
            />
            {// Religion Data }
            <MyDataSkelton
              title="Religion Preference"
              icon={<BiBookAlt size={20} />}
              data={religionDatas}
            />

            {// Location Data }
            <MyDataSkelton
              title="Location Preference"
              icon={<BiCurrentLocation />}
              data={prefLocation}
            />
            {// Habit Data }
            <MyDataSkelton
              title="Habit Preference"
              icon={<GiHabitatDome />}
              data={prefHabit}
            />
*/
