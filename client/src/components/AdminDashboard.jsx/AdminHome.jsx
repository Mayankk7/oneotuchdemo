/* This example requires Tailwind CSS v2.0+ */
import axios from "axios";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";
import Btn from "../../subcomponents/buttons/Btn";
import Input from "../../subcomponents/inputs/Input";
import Title from "../../subcomponents/title/Title";
import AdminMenu from "../navbar/AdminMenu";
import LoveLoader from "../PopUpComponent/LoveLoader";

export default function AdminHome() {
  const [id, setId] = useState("");
  const [isOpen, setisOpen] = useState(false);
  const [totalclicks, setTotalclicks] = useState(0);
  const [profile, setProfile] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [recentSignup, setRecentSignup] = useState([]);

  const navigate = useNavigate();

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

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .post(
        "/api/auth/checkAdmin",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setTotalclicks((prevstate) => res.data.totalclicks);
        //console.log(res.data.totalclicks);
      })
      .catch((err) => {
        //console.log(err.response);
        navigate("/onetouchmatrimony/alogin");
      });

    axios
      .get("/api/auth/admin/getAllUsers", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAllUsers(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });

    axios
      .post(
        "/api/auth/recentSignup",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setRecentSignup(res.data.users);
        axios
          .post(
            "/api/auth/updateLastView",
            {
              lastViewed: Date.now(),
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((res) => {
            //console.log(res.data);
          })
          .catch((err) => {
            console.log(err.response);
          });
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const searchHandler = (e) => {
    e.preventDefault();
    setisOpen((prevstate) => !prevstate);
    axios
      .get(`/api/auth/${id}`)
      .then((res) => setProfile(res.data))
      .catch((err) => console.log(err));
  };

  const showProfileHandler = (profile) => {
    navigate(`/onetouchmatrimony/${profile._id}`);
  };

  const deleteProfileHandler = (profile) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`/api/auth/deleteUser/${profile._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAllUsers((prevstate) => {
          return prevstate.filter((item) => item._id !== profile._id);
        });
        //console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div style={{ backgroundColor: "yellow" }}>
      {/* Admin Navbar */}
      <div>
        <AdminMenu />
      </div>{" "}
      <div className="mx-10 ">
        <div>
          <Title text="Search Users" />
          <div>
            <div className=" items-center justify-center flex my-8">
              <Input
                label="Search By Id"
                name="idsearch"
                type="text"
                onChange={(e) => setId(e.target.value)}
                value={id}
                placeholder="ID"
                className="w-80 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 bg-gray-100 border rounded border-gray-200"
              />
            </div>
            <div className=" flex justify-center items-center flex-col my-12  mt-8">
              <Btn onClick={searchHandler} text="Search Now" className=" " />
            </div>
          </div>
          <div className="flex justify-center">
            {isOpen && profile && (
              <div className="my-4 ">
                <div className=" cursor-pointer hover:scale-105 transition-all duration-150">
                  <div className=" mx-4   rounded   shadow ">
                    <div>
                      <LazyLoadImage
                        effect="blur"
                        src={profile.image}
                        className="mx-auto d-block object-cover"
                        style={{ height: "180px", minWidth: "85%" }}
                        alt=""
                      />
                    </div>
                    <div className=" text-center p-2 h-20">
                      <h1 className="font-semibold">{profile.fullname}</h1>
                      <p>{profile.dob ? getAge(profile.dob) + " Years" : ""}</p>
                      <p>{profile.country ? profile.country : ""}</p>
                    </div>
                    <div className="flex justify-center mt-2  space-x-2 pb-5">
                      <Btn
                        onClick={() => addToShortList(profile)}
                        className="px-2"
                        text="Save"
                      />
                      <Btn
                        text="View"
                        onClick={() => {
                          showProfileHandler(profile);
                        }}
                      />
                      {/* <Btn
                          onClick={() => handleBlock(profile)}
                          text="Block"
                        /> */}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          {/* User Details */}
          {/* <Title text="User Details" />
          <div className="flex justify-center ">
            <div className="lg:grid grid-cols-3 gap-8 lg:space-y-0 space-y-8 mt-4 ">
              {allmember.map((member) => (
                <MemberDetailsCard
                  title={member.title}
                  number={member.number}
                  icon={member.icon}
                />
              ))}
            </div>
          </div> */}
          {/* Recent Users Component */}
          <div>
            <Title text={`Total clicks : ${totalclicks}`} />
            <Title text={`Recent Users : ${recentSignup.length}`} />
            {recentSignup.length == 0 ? (
              <LoveLoader />
            ) : (
              <div className="md:mx-44 grid lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 grid-cols-1">
                {recentSignup &&
                  recentSignup.map((profile, key) => {
                    return (
                      <div key={key} className="my-4 ">
                        <div className=" cursor-pointer hover:scale-105 transition-all duration-150">
                          <div className=" mx-4 rounded shadow ">
                            <div>
                              <LazyLoadImage
                                effect="blur"
                                src={profile.image}
                                className="mx-auto d-block object-cover"
                                style={{ height: "180px", minWidth: "85%" }}
                                alt=""
                                onClick={() => {
                                  showProfileHandler(profile);
                                }}
                              />
                            </div>
                            <div className=" text-center p-2">
                              <h1 className="font-semibold">
                                {profile.fullname}
                              </h1>
                              {/* <div className="flex flex-wrap pt-3 justify-around items-center">
                            <p>
                              {profile.dob ? getAge(profile.dob) + " Years" : ""}
                            </p>
                            <p>{profile.country ? profile.country : ""}</p>
                            </div> */}
                            </div>
                            <div className="flex justify-center mt-2 border-t-[1px] pt-3  space-x-2 pb-5">
                              <Btn
                                text="View"
                                onClick={() => {
                                  showProfileHandler(profile);
                                }}
                              />
                              <Btn
                                onClick={() => deleteProfileHandler(profile)}
                                className="px-3"
                                text="Delete"
                              />
                              {/* <Btn
                              onClick={() => handleBlock(profile)}
                              text="Block"
                            /> */}
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

        <Title text={`All Users : ${allUsers.length}`} />
        {allUsers.length == 0 ? (
          <LoveLoader />
        ) : (
          <div className="md:mx-44 grid lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 grid-cols-1">
            {allUsers &&
              allUsers.map((profile, key) => {
                return (
                  <div key={key} className="my-4 ">
                    <div className=" cursor-pointer hover:scale-105 transition-all duration-150">
                      <div className=" mx-4 rounded shadow ">
                        <div>
                          <img
                            effect="blur"
                            loading="lazy"
                            src={profile.image}
                            className="mx-auto d-block object-cover"
                            style={{ height: "210px", width: "280px" }}
                            alt=""
                            onClick={() => {
                              showProfileHandler(profile);
                            }}
                          />
                        </div>
                        <div className=" text-center p-2">
                          <h1 className="font-semibold">{profile.fullname}</h1>
                          {/* <div className="flex flex-wrap pt-3 justify-around items-center">
                        <p>
                          {profile.dob ? getAge(profile.dob) + " Years" : ""}
                        </p>
                        <p>{profile.country ? profile.country : ""}</p>
                        </div> */}
                        </div>
                        <div className="flex justify-center mt-2 border-t-[1px] pt-3  space-x-2 pb-5">
                          <Btn
                            text="View"
                            onClick={() => {
                              showProfileHandler(profile);
                            }}
                          />
                          <Btn
                            onClick={() => deleteProfileHandler(profile)}
                            className="px-3"
                            text="Delete"
                          />
                          {/* <Btn
                          onClick={() => handleBlock(profile)}
                          text="Block"
                        /> */}
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
}
