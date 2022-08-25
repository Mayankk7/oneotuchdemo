import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaCheck, FaEdit, FaRegWindowClose } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
import defaultImage from "../../assets/image/default-profile.jpg";
import blur from "../../assets/image/PermittedImage/blurImage.jpg";
import closeup from "../../assets/image/PermittedImage/cropImg.jpg";
import fullView from "../../assets/image/PermittedImage/fullView.jpg";
import group from "../../assets/image/PermittedImage/groupImg.jpg";
import side from "../../assets/image/PermittedImage/sideImg.jpg";
import { StateContext } from "../../context/StateProvider";
import Btn from "../../subcomponents/buttons/Btn";
import CompleteView from "../../subcomponents/dashboardviews/CompleteView";
import RightwrongImage from "../../subcomponents/PermittedImage/RightwrongImage";

const totalFields = [
  "fullname",
  "phone",
  "dob",
  "lang",
  "email",
  "gender",
  "height",
  "marital",
  "education",
  "work",
  "profession",
  "company",
  "income",
  "religion",
  "caste",
  "country",
  "state",
  "city",
  "smoking",
  "drinking",
  "diet",
  "image",
];

export default function IndexPage() {
  const { registerDet, setregisterDet } = useContext(StateContext);
  const [profileProgress, setProfileProgress] = useState(0);
  const [showRecent, setShowRecent] = useState(true);
  const [showSaved, setShowSaved] = useState(false);
  const [showBlocked, setShowBlocked] = useState(false);
  const [showWhoViewed, setShowWhoViewed] = useState(false);
  const [member, setMember] = useState(false);
  const [members, setMembers] = useState([]);
  const [showMembers, setshowMembers] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("auth-token");

    async function fetchUserData() {
      const userlogin = await axios
        .get("/api/auth/users", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setId(res.data.userid);
          setMembers(res.data.memberdetails);
          res.data.memberdetails.map((mem) => {
            const currdate = new Date().getTime();
            const expiry = new Date(mem.expiryDate).getTime();
            if (currdate < expiry) {
              setMember(true);
            }
          });
        });
      calcProfileProgress(userlogin.data);
      setregisterDet(userlogin.data);
    }

    fetchUserData();
  }, []);

  function calcProfileProgress(userData) {
    let count = 0;
    for (let key = 0; key < totalFields.length; key++) {
      if (userData[totalFields[key]]) count++;
    }
    setProfileProgress(Math.round((count * 100) / totalFields.length));
  }

  const showRecentHandler = () => {
    setShowRecent(true);
    setShowSaved(false);
    setShowBlocked(false);
    setShowWhoViewed(false);
    setshowMembers(false);
  };

  const showSavedHandler = () => {
    setShowSaved(true);
    setShowRecent(false);
    setShowBlocked(false);
    setShowWhoViewed(false);
    setshowMembers(false);
  };

  const showBlockedHandler = () => {
    setShowBlocked(true);
    setShowRecent(false);
    setShowSaved(false);
    setShowWhoViewed(false);
    setshowMembers(false);
  };

  const showWhoViewedHandler = () => {
    setShowWhoViewed(true);
    setShowBlocked(false);
    setShowRecent(false);
    setShowSaved(false);
    setshowMembers(false);
  };

  const showmember = () => {
    setshowMembers(true);
    setShowWhoViewed(false);
    setShowBlocked(false);
    setShowRecent(false);
    setShowSaved(false);
  };
  const GenerateInvoice = ({ amountPaid, id, type }) => {
    axios(`/api/auth/invoice/${type}/${amountPaid}/${id}`, {
      method: "GET",
      responseType: "blob", //Force to receive data in a Blob Format
    })
      .then((response) => {
        //Create a Blob from the PDF Stream
        const file = new Blob([response.data], { type: "application/pdf" });
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        //Open the URL on new Window
        window.open(fileURL);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="w-full h-full">
        <div className="lg:flex flex-no-wrap md:mx-40">
          {/* Dashboard Left Part */}
          <div className="lg:w-1/3 mx-2 ">
            <div className=" flex justify-center">
              <LazyLoadImage
                loading="lazy"
                className="  object-cover"
                style={{ height: "220px", minWidth: "100%" }}
                src={registerDet.image ? registerDet.image : defaultImage}
                alt="image"
                effect="blur"
              />
            </div>
            <div className="flex justify-center ">
              {" "}
              <Link
                className="w-full my-1"
                to="/myprofile"
                state={{ data: registerDet }}
              >
                <Btn
                  className="text-sm w-full flex justify-center py-2 !rounded-none"
                  text="Change Profile Picture"
                />
              </Link>
            </div>
            {/* My Profile Section */}
            <div className="mt-1 shadow  ">
              <div className="bg-main-red text-center my-2 py-2 text-white rounded">
                <h1 className="text-lg font-semibold">
                  <Link
                    to={`/${registerDet.userid}`}
                    state={{ data: registerDet }}
                  >
                    My Profile
                  </Link>
                </h1>
              </div>
              <div className="p-4  bg-main-red text-white">
                <h1 className="border-b-[1px] border-gray-300 py-3 cursor-pointer">
                  <Link to="/myprofile">Edit Profile</Link>
                </h1>
                <h1
                  className="border-b-[1px] border-gray-300 py-3 cursor-pointer"
                  onClick={showRecentHandler}
                >
                  Recent Profiles
                </h1>
                <h1
                  className="border-b-[1px] border-gray-300 py-3 cursor-pointer"
                  onClick={showSavedHandler}
                >
                  Saved Profiles
                </h1>
                {/* <h1
                  className="border-b-[1px] border-gray-300 py-3 cursor-pointer"
                  onClick={showWhoViewedHandler}
                >
                  Who Viewed
                </h1> */}
                <h1
                  className="py-3 border-gray-300 border-b-[1px] cursor-pointer"
                  onClick={showBlockedHandler}
                >
                  Blocked Profiles
                </h1>
                <h1 className="py-3 cursor-pointer" onClick={showmember}>
                  Membership Details
                </h1>
              </div>
            </div>
            {/* <PartnerPref
              prefAge={registerDet.prefAge}
              prefOccupation={registerDet.prefOccupation}
            /> */}
            {/* Profile Details Section */}
            {/* <div className="mt-4 shadow  ">
              <div className="bg-main-red text-center py-2 text-white rounded">
                <h1 className="text-lg font-semibold">Profile Details</h1>
              </div>
              <div className="p-4">
                {profileDetailsData.map((data, index) => {
                  return (
                    <div
                      className={`${
                        index < myProfile.length + 4 &&
                        "border-b-[1px] border-gray-300"
                      } py-3 flex justify-between my-1`}
                    >
                      <h1>
                        <Link to={data.path}>{data.title}</Link>{" "}
                      </h1>
                      <div className="bg-gray-600 text-white rounded-full flex justify-center items-center w-8 h-8">
                        {data.notification}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div> */}
          </div>

          {/* Dashboard Right Part */}
          <div className="w-full overflow-hidden px-4 ">
            <div className="  py-10  text-center">
              <div>
                {showMembers ? null : (
                  <>
                    <h1 className="md:text-6xl text-2xl font-noto-sans text-main-blue leading-loose my-2">
                      Hello, {registerDet.fullname}
                    </h1>
                    {/* Progress Bar */}
                    Your Profile Progress
                    <div className="w-full  bg-gray-200 rounded-full  ">
                      <div
                        style={{ width: `${profileProgress}%` }}
                        className={`bg-main-blue  text-xs font-medium text-blue-100 text-center p-1 leading-none rounded-l-full`}
                      >
                        {profileProgress}
                      </div>
                    </div>
                    <Link to="/myprofile" state={{ data: registerDet }}>
                      {" "}
                      <Btn
                        icon={<FaEdit className="inline" />}
                        text="Complete your profile "
                        className=" my-4 "
                      />
                    </Link>
                  </>
                )}
              </div>
              {showMembers && (
                <div className="">
                  {member && (
                    <>
                      <div>
                        <h1 className="text-2xl  pt-7 font-bold leading-loose text-main-blue">
                          Membership Details
                        </h1>
                      </div>
                      <table class="responsive-table overflow-x-auto">
                        <thead className="table-header-row">
                          <tr>
                            <th
                              scope="col"
                              style={{ width: "70px" }}
                              rowspan="2"
                            >
                              Sr. No.
                            </th>
                            <th scope="col" rowspan="2">
                              Activation Date
                            </th>
                            <th scope="col" rowspan="2">
                              Expires On{" "}
                            </th>
                            <th scope="col" rowspan="2">
                              Amount Paid{" "}
                            </th>
                            <th scope="col" rowspan="2">
                              Invoice
                            </th>
                            <th scope="col" rowspan="2">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {members.map((mem) => {
                            let serialNO = 1;
                            const activationDate = mem.activeDate
                              ? mem.activeDate
                              : null;
                            var amountPaid = 0;
                            if (mem.plan === "Gold") {
                              amountPaid = 5100;
                            } else if (mem.plan === "Platinum") {
                              amountPaid = 11000;
                            } else {
                              amountPaid = 1700;
                            }
                            const type = mem.plan ? mem.plan : null;

                            serialNO = serialNO + 1;

                            //activationDate
                            var date = new Date(activationDate);
                            var dd = String(date.getDate()).padStart(2, "0");
                            var mm = String(date.getMonth() + 1).padStart(
                              2,
                              "0"
                            ); //January is 0!
                            var yyyy = date.getFullYear();

                            date = mm + "/" + dd + "/" + yyyy;

                            //ExpiryDate
                            var expirydate = new Date(mem.expiryDate);
                            var dd = String(expirydate.getDate()).padStart(
                              2,
                              "0"
                            );
                            var mm = String(expirydate.getMonth() + 1).padStart(
                              2,
                              "0"
                            ); //January is 0!
                            var yyyy = expirydate.getFullYear();

                            expirydate = mm + "/" + dd + "/" + yyyy;

                            const curr = new Date().getTime();
                            const exp = new Date(mem.expiryDate).getTime();

                            if (exp > curr) {
                              var status = "Active";
                            } else {
                              var status = "Expired";
                            }
                            return (
                              <tr>
                                <td
                                  scope="col"
                                  style={{ width: "70px" }}
                                  rowspan="2"
                                >
                                  {serialNO}
                                </td>
                                <td scope="col" rowspan="2">
                                  {date}
                                </td>
                                <td scope="col" rowspan="2">
                                  {expirydate}
                                </td>
                                <td scope="col" rowspan="2">
                                  {amountPaid}
                                </td>
                                <td scope="col" rowspan="2">
                                  <button
                                    className="hover:underline"
                                    onClick={() => {
                                      GenerateInvoice({
                                        amountPaid,
                                        id,
                                        type,
                                      });
                                    }}
                                  >
                                    Download
                                  </button>
                                </td>
                                <td scope="col" rowspan="2">
                                  {status}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </>
                  )}
                </div>
              )}

              {showBlocked && (
                <CompleteView
                  title="Blocked Profiles"
                  url="/api/auth/blockedProfiles"
                />
              )}
              {showRecent && (
                <CompleteView
                  title="Recently Viewed"
                  url="/api/auth/recentProfiles"
                />
              )}

              {showSaved && (
                <CompleteView
                  title="Saved Profiles"
                  url="/api/auth/savedProfile"
                />
              )}

              {showWhoViewed && (
                <CompleteView
                  title="Who Viewed"
                  url="/api/auth/getWhoViewedMyProfile"
                />
              )}
            </div>

            {/* Uploadable image */}
            <div className="md:flex  justify-between text-main-blue ">
              <div className="my-8">
                <span className="flex justify-center items-center">
                  <FaCheck className="text-green-400" />
                  <h1 className="text-lg font-bold  mx-2">
                    Photos you can upload
                  </h1>
                </span>
                <div className="grid grid-cols-2 md:mr-5 space-x-4">
                  <RightwrongImage img={fullView} title="Full View" />
                  <RightwrongImage img={closeup} title="Close Up" />
                </div>
              </div>

              {/* Image we can't use */}
              <div className="my-8 mb-16 ">
                <span className="flex justify-center  items-center">
                  <FaRegWindowClose className="text-red-700 mx-2" />
                  <h1 className="text-lg font-bold">Photos you can't upload</h1>
                </span>
                <div className="grid grid-cols-3 space-x-4 ">
                  <RightwrongImage img={group} title="Group" />
                  <RightwrongImage img={blur} title="Blur & Watermark" />
                  <RightwrongImage img={side} title="Side Face" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
