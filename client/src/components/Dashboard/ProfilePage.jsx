import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useParams } from "react-router-dom";
import defaultImage from "../../assets/image/default-profile.jpg";
import demo1 from "../../assets/logo/otherImg/demo1.jpg";
import demo2 from "../../assets/logo/otherImg/demo2.jpg";
import { StateContext } from "../../context/StateProvider";
import contactData from "../../data/contactData";
import Btn from "../../subcomponents/buttons/Btn";
import AddtoBlocklist from "../PopUpComponent/AddtoBlocklist";
import AddtoShortlist from "../PopUpComponent/AddtoShortlist";
import SinglePopup from "../PopUpComponent/SinglePopup";
import PreferencePage from "./PreferencePage";
import ProfileInfoSkelton from "./ProfileInfoSkelton";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";



const mapKeys = {
  "User Name": "fullname",
  "Date Of Birth": "dob",
  "Mother Tongue": "lang",
  Gender: "gender",
  Height: "height",
  "Family Type": "living",
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
  Sibling: "sibling",
  Fatherjob: "fatherjob",
  Motherjob: "motherjob",
  imageURL: "image",
  About: "aboutyou",
  CreatedAt: "createdAt",
};

function ProfilePage() {
  const {
    addedProfile,
    setAddedProfile,
    blockedProfile,
    setBlockedProfile,
    setPopupMsg,
    errorShow,
    setErrorShow,
  } = useContext(StateContext);
  const [userData, setUserData] = useState({});
  const [isSave, setIsSave] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [phone, setPhone] = useState("");
  const { id } = useParams();
  const [matchPercent, setMatchPercent] = useState("0%");
  const [images, setImages] = useState({
    image: "",
    image1: "",
    // image2: "",
    // image3: "",
  });
  const otherImages = [
    {
      img: demo1,
    },
    {
      img: demo2,
    },
    // {
    //   img: demo3,
    // },
    // {
    //   img: demo4,
    // },
  ];
  const [imageIndex, setImageIndex] = useState(0);
  const [member, setMember] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  // Whatsapp function

  const whatsAppMe = () => {
    window.open("https://wa.me/919417103593");
    axios
      .post("/api/auth/admin/addClick", {})
      // .then((res) => console.log(res.data.msg))
      .catch((err) => {
        // console.log(err.response);
        return;
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const token = localStorage.getItem("auth-token");
    // console.log(id);
    axios
      .post(
        "/api/auth/whoViewedMyProfile",
        { profileId: id },
        {
          headers: { Authorization: `Bearer ${token}` },
          // }).then((res)=>{
          //   console.log(res.data)
        }
      )
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`/api/auth/match/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMatchPercent(res.data.percentMatch))
      .catch((err) => console.log(err));
    // get profile data of user with id
    axios
      .get(`/api/auth/${id}`)
      .then((res) => {
        setPhone(() => {
          return res.data.phone;
        });
        setImages((prevState) => {
          return {
            ...prevState,
            image: res.data.image,
            image1: res.data.image1,
            // image2: res.data.image2,
            // image3: res.data.image3,
          };
        });
        // console.log(res.data);
        // Mapping property stored in database to property being displayed to user
        const mappedData = {};
        for (const key in mapKeys) {
          mappedData[key] = res.data[mapKeys[key]]
            ? res.data[mapKeys[key]]
            : "";
        }
        //mappedData.CreatedAt = mappedData.CreatedAt.splice(0,10)
        setUserData(mappedData);
        // console.log(UserData.CreatedAT)
      })
      .catch((err) => {
        setPopupMsg("Fetching Details Failed");
        setErrorShow(true);
      });

    // get the data of logged in user
    axios
      .get("/api/auth/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        //   console.log(res.data);

        // Mapping property stored in database to property being displayed to user
        if (res.data.savedProfiles.indexOf(id) === -1) {
          setAddedProfile(false);
          // console.log("if run");
          setIsSave(false);
        } else {
          setAddedProfile(true);
          setIsSave(true);
        }
        if (res.data.blockedProfiles.indexOf(id) === -1) {
          setBlockedProfile(false);
          // console.log("if run");
          setIsBlocked(false);
        } else {
          setBlockedProfile(true);

          setIsBlocked(true);
        }

        res.data.memberdetails.map((mem) => {
          const currdate = new Date().getTime();
          const expiry = new Date(mem.expiryDate).getTime();
          if (currdate < expiry) {
            setMember(true);
          }
        });
      })
      .catch((err) => {
        setPopupMsg("Fetch Logged in user data error");
        setErrorShow(true);
      });

    // add current profile to recent views of logged in user
    axios.post(
      "/api/auth/storeRecentProfile",
      { profileId: id },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // add logged in user to who viewed my profile of this user
    axios.post(
      "/api/auth/whoViewedMyProfile",
      { profileId: id },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
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
    "Family Type": userData["Family Type"],
    Sibling: userData["Sibling"],
    Fatherjob: userData["Fatherjob"],
    Motherjob: userData["Motherjob"],
    "Joined at": String(userData["CreatedAt"]).slice(0, 10),
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

  // Saving Someones Profile Handling
  const addToShortList = () => {
    setIsClicked(true);
    const token = localStorage.getItem("auth-token");
    axios
      .post(
        "/api/auth/saveProfile",
        { profileId: id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.data.savedProfiles.indexOf(id) === -1) {
          setAddedProfile(false);

          // console.log("if run");
          setIsSave(false);
        } else {
          setAddedProfile(true);
          // console.log("else run");
          setIsSave(true);
        }
        // console.log("res", res);
      })
      .catch((err) => {
        setPopupMsg("Saving Profile Failed!");
        // console.log("Saving error");
        // console.log(err);
        setErrorShow(true);
      });
  };

  // Blocking Someones Profile Handling

  const handleBlock = (profile) => {
    setIsClicked(true);
    const token = localStorage.getItem("auth-token");
    axios
      .post(
        "/api/auth/blockProfile",
        { profileId: id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.data.blockedProfiles.indexOf(id) === -1) {
          setBlockedProfile(false);

          // console.log("if run");
          setIsBlocked(false);
        } else {
          setBlockedProfile(true);
          // console.log("else run");
          setIsBlocked(true);
        }
        // console.log("res", res);
      })
      .catch((err) => {
        setPopupMsg("Blocking Profile Failed!");
        // console.log("blocking error");
        // console.log(err);
        setErrorShow(true);
      });
  };


  // console.log(!blockedProfile && isClicked);
  // console.log(userData);
  return (
    <>
      {addedProfile && isClicked && <AddtoShortlist />}
      {blockedProfile && isClicked && (
        <AddtoBlocklist text="Blocked Succesfully" />
      )}
      {!blockedProfile && isClicked && (
        <AddtoBlocklist text="Unblocked Succesfully" />
      )}
      <div className="lg:mx-28">
        {errorShow && (
          <SinglePopup className="bg-red-300" icon={<AiOutlineClose />} />
        )}
        {/* Short Details */}
        <div className="lg:flex  md:mx-24 mx-4  ">
          <div className="mx-2 " style={{ marginLeft: "auto" }}>
            <span className="flex justify-center my-4">
              <LazyLoadImage
                loading="lazy"
                className=" object-cover"
                style={{ height: "220px", width: "183px" }}
                src={
                  images ? Object.entries(images)[imageIndex][1] : defaultImage
                }
                alt="image"
                effect="blur"
              />
            </span>
            {/* <LazyLoadImage
              effect="blur"
              src={
                images ? Object.entries(images)[imageIndex][1] : defaultImage
              }
              className="mx-auto w-96 h-64 rounded mb-5 object-cover  "
              alt=""
            /> */}

            {/* Little Images */}
            <div className=" flex w-full justify-center space-x-2 flex-row">
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
          </div>

          <div
            className="py-2 bg-main-red text-white  shadow-delivery-shadow md:p-2 rounded-md"
            style={{ marginRight: "auto" }}
          >
            <h1 className="text-2xl my-4 font-bold text-purple-100 text-center  ">
              {userData["User Name"]}
            </h1>
            <div className=" text-sm">
              <ProfileInfoSkelton
                className=""
                data={detailSummary}
                isTrue={true}
              />
              <div className="flex mx-4 my-5">
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
                    style={{ width: `${parseInt(matchPercent)}%` }}
                  >
                    <h1>{parseInt(matchPercent)}</h1>
                  </div>
                </div>
              </div>

              {/* ID */}
              <div className="flex mx-4  ">
                <div
                  className=" font-semibold  text-white"
                  style={{ width: "80%" }}
                >
                  Id:{" "}
                </div>
                <div className=" font-bold tracking-wide text-left w-full">
                  OTM-{id}
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
              {
                <Btn
                  text="Contact"
                  onClick={() => {
                    member
                      ? 
                      Swal.fire({text: `You can contact the person on : ${phone}`,
                                 confirmButtonText: 'Call Now',
                                 showCancelButton: true,
                                 confirmButtonColor: '#3085d6',
                                 cancelButtonColor: '#d33',
                    }).then((result) => {
                        if(result.isConfirmed){
                          window.location.href=`tel:${phone}`
                        }
                      })
                      
                      : navigate("/membership");
                  }}
                />
              }
              <Btn text={isSave ? "Unsave" : "Save"} onClick={addToShortList} />
              <Btn
                text={isBlocked ? "Unblock" : "Block"}
                onClick={() => handleBlock()}
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
              <p className="bg-main-red text-white shadow-delivery-shadow p-4 overflow-y-auto">
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
          </div>
        </div>
      </div>
      <PreferencePage />
    </>
  );
}

export default ProfilePage;
