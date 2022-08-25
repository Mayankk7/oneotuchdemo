import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate, useParams } from "react-router-dom";
import defaultImage from "../../assets/image/default-profile.jpg";
import { StateContext } from "../../context/StateProvider";
import Btn from "../../subcomponents/buttons/Btn";
import RecentViewCard from "../../subcomponents/Card/RecentViewCard";
import ProfileInfoSkelton from "../Dashboard/ProfileInfoSkelton";
import LoveLoader from "../PopUpComponent/LoveLoader";
import SinglePopup from "../PopUpComponent/SinglePopup";

const mapKeys = {
  "User Name": "fullname",
  "Date Of Birth": "dob",
  "Mother Tongue": "lang",
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
  About: "aboutyou",
  Sibling: "sibling",
  "Father's Job": "fatherjob",
  "Mother's Job": "motherjob",
  Mangolik: "mangolik",
  "Zodiac Sign": "zodiac",
  "Preferred Age": "prefAge",
  "Preferred Occupation": "prefOccupation",
  Refferer: "reffer",
  Email: "email",
  Phone: "phone",
};

function ProfilePageAdmin() {
  const { setPopupMsg, errorShow, setErrorShow } = useContext(StateContext);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [savedProfilesData, setSavedProfilesData] = useState([]);
  const { id } = useParams();
  const [matchPercent, setMatchPercent] = useState("0%");
  const [images, setImages] = useState({
    image: "",
    image1: "",
    // image2: "",
    // image3: "",
  });

  const [imageIndex, setImageIndex] = useState(0);

  // Whatsapp function

  const whatsAppMe = () => {
    axios
      .post("/api/auth/admin/addClick", {})
      .then((res) => {
      //console.log(res.data.msg))
      })
      .catch((err) => {
        console.log(err.response);
        return;
      });
    window.open("https://wa.me/919417103593");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const token = localStorage.getItem("token");
    // get profile data of user with id
    axios
      .get(`/api/auth/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setImages((prevState) => {
          return {
            ...prevState,
            image: res.data.image,
            image1: res.data.image1,
            // image2: res.data.image2,
            // image3: res.data.image3,
          };
        });
        //console.log(res.data);
        axios
          .post(
            "/api/auth/admin/savedProfile",
            { userid: res.data._id },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((resp) => {
            setSavedProfilesData((prevState) => resp.data);
          })
          .catch((err) => {
            console.log(err.response);
          });
        // Mapping property stored in database to property being displayed to user
        const mappedData = {};
        for (const key in mapKeys) {
          mappedData[key] = res.data[mapKeys[key]]
            ? res.data[mapKeys[key]]
            : "";
        }
        setUserData(mappedData);
        // console.log(userData);
      })
      .catch((err) => {
        console.log(err.response);
        setPopupMsg((prevState) => "Fetching Details Failed");
        setErrorShow((prevState) => true);
        navigate("/onetouchmatrimony/alogin");
        console.log(err.response);
        setPopupMsg("Fetching Details Failed");
        setErrorShow(true);
        // navigate('/onetouchmatrimony/alogin');
      });

    // get the data of logged in user

    // add current profile to recent views of logged in user

    // add logged in user to who viewed my profile of this user
  }, [id]);

  const detailSummary = {
    "User Name": userData["User Name"],
    "D.O.B": userData["Date Of Birth"],
    Gender: userData["Gender"],
    "Marital Status": userData["Marital Status"],
    Religion: userData["Religion"],
    Country: userData["Country"],
  };

  const basicDetails = {
    "User Name": userData["User Name"],
    "Date Of Birth": userData["Date Of Birth"],
    "Mother Tongue": userData["Mother Tongue"],
    Gender: userData["Gender"],
    Height: userData["Height"],
    "Marital Status": userData["Marital Status"],
    Religion: userData["Religion"],
    Caste: userData["Caste"],
    "Willing to marry other caste?": userData["Willing to marry other caste ?"],
    Sibling: userData["Sibling"],
    "Father's Job": userData["Father's Job"],
    "Mother's Job": userData["Mother's Job"],
    "Marital Status": userData["Marital Status"],
    Mangolik: userData["Mangolik"],
    "Zodiac Sign": userData[" Zodiac Sign"],
    "Preferred Age": userData["Preferred Age"],
    "Preferred Occupation": userData["Preferred Occupation"],
    Refferer: userData["Refferer"],
    Email: userData["Email"],
    Phone: userData["Phone"],
  };

  const eduprofDetails = {
    Education: userData["Education"],
    "Job Type": userData["Job Type"],
    Occupation: userData["Occupation"],
    Company: userData["Company"],
    "Annual Income": userData["Annual Income"],
  };

  const locationDetails = {
    Country: userData["Country"],
    State: userData["State"],
    City: userData["City"],
  };

  const habitDetails = {
    Smoking: userData["Smoking"],
    Drinking: userData["Drinking"],
    "Eating Habits": userData["Eating Habits"],
  };

  return (
    <>
      <div className="lg:mx-28">
        {errorShow && (
          <SinglePopup className="bg-red-300" icon={<AiOutlineClose />} />
        )}
        {/* Short Details */}
        <div className="lg:flex  md:mx-24 mx-4  ">
          <div className="mx-2">
            <LazyLoadImage
              loading="lazy"
              className="  object-cover"
              style={{ height: "220px", minWidth: "100%" }}
              src={
                images ? Object.entries(images)[imageIndex][1] : defaultImage
              }
              alt="image"
              effect="blur"
            />
            {/* <img
              src={
                images ? Object.entries(images)[imageIndex][1] : defaultImage
              }
              className="mx-auto w-96 h-64 rounded mb-5 object-cover"
              alt=""
            /> */}

            {/* Little Images */}
            <div className=" flex w-full justify-center space-x-2 flex-row">
              {Object.entries(images).map((image, index) => {
                return (
                  <div className=" cursor-pointer mb-4  w-10 rounded-3xl">
                    <img
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
          </div>

          <div className="py-2 bg-main-red text-white  shadow-delivery-shadow md:p-2 rounded-md">
            <h1 className="text-2xl my-4 font-bold text-blue-100 text-center  ">
              {userData["User Name"]}
            </h1>
            <div className=" text-sm">
              <ProfileInfoSkelton
                className=""
                data={detailSummary}
                isTrue={true}
              />
              {/* <div className="flex mx-4 my-5">
                <div
                  className=" font-semibold text-white"
                  style={{ width: "80%" }}
                >
                  Matched:{" "}
                </div>

                <div className="w-full p-1  bg-gray-200 rounded-full  ">
                  <div
                    className={` text-xs font-medium text-blue-100 text-center p-1 leading-none rounded-full ${
                      parseInt(matchPercent) > 50
                        ? "bg-green-500"
                        : "bg-red-500"
                    } `}
                    style={{ width: matchPercent }}
                  >
                    <h1>{matchPercent}</h1>
                  </div>
                </div>
              </div> */}

              {/* ID */}
              <div className="flex mx-4 py-6 ">
                <div
                  className=" font-semibold  text-white"
                  style={{ width: "80%" }}
                >
                  User Id:{" "}
                </div>
                <div className=" text-lg tracking-wide text-center w-full">
                  {id}
                </div>
              </div>
              <p className="text-center text-blue-50 my-2 font-bold">
                For Horoscope contact{" "}
                <span
                  onClick={() => whatsAppMe()}
                  className="text-blue-300 cursor-pointer"
                >
                  Here
                </span>{" "}
                !
              </p>
            </div>
            <div className=" my-4 flex justify-evenly w-full ">
              <Btn
                text="Contact"
                onClick={() => {
                  window.open(`tel:${userData["Phone"]}`);
                }}
              />
            </div>
          </div>
        </div>

        {/* Full Details          LEFT PART */}
        <div className="grid grid-cols-1 my-4 md:mx-24 mx-4  ">
          <div className=" space-y-6">
            <div className="text-2xl text-main-red font-semibold my-4 flex space-x-4 justify-center ">
              <h1 className="hover:text-main-blue">Personal Details</h1>
            </div>
            {/* About Section */}
            <div>
              <h1 className="text-2xl text-main-red">About</h1>
              <p className="bg-main-red text-white shadow-delivery-shadow p-4">
                {userData["About"]}
              </p>
            </div>
            {/* Basic Information */}
            <div className="space-y-4">
              <h1 className="text-2xl text-main-red">Basic Information </h1>
              <ProfileInfoSkelton className="py-4" data={basicDetails} />
            </div>

            {/* Qualification & Career */}
            <div className="space-y-4">
              <h1 className="text-2xl text-main-red">
                Education and Professional Details
              </h1>
              <ProfileInfoSkelton className="py-4" data={eduprofDetails} />
            </div>
            {/* Current Location */}
            <div className="space-y-4">
              <h1 className="text-2xl text-main-red">Current Location </h1>
              <ProfileInfoSkelton className="py-4" data={locationDetails} />
            </div>
            {/* Life Styles */}
            <div className="space-y-4">
              <h1 className="text-2xl text-main-red">Life Style </h1>
              <ProfileInfoSkelton className="py-4" data={habitDetails} />
            </div>
            <div className="">
              <div>
                <h1 className="text-2xl  pt-7 font-bold leading-loose text-main-blue">
                  Saved Profiles : {savedProfilesData.length}
                </h1>
              </div>
              {savedProfilesData ? (
                <LoveLoader />
              ) : (
                <div className="container  mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 pt-6 gap-2 ">
                  {savedProfilesData.map((singleData, key) => {
                    return (
                      <RecentViewCard
                        onClick={() => handleProfileView(singleData)}
                        singleData={singleData}
                        img={singleData.image}
                        name={singleData.fullname}
                        age={singleData.dob}
                        location={singleData.country}
                        key={singleData._id}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <PreferencePage /> */}
    </>
  );
}

export default ProfilePageAdmin;
