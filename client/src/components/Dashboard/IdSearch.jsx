import axios from "axios";
import { useState } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";
import Btn from "../../subcomponents/buttons/Btn";
import Header from "../../subcomponents/Header/Header";
import Input from "../../subcomponents/inputs/Input";

function IdSearch() {
  const [id, setId] = useState("");
  const [isOpen, setisOpen] = useState(false);
  const [profile, setProfile] = useState({});

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

  const searchHandler = (e) => {
    e.preventDefault();
    setisOpen(true);
    axios
      .get(`/api/auth/${id}`)
      .then((res) => setProfile(res.data))
      .catch((err) => console.log(err));
  };

  const showProfileHandler = (profile) => {
    navigate(`/${profile.userid}`);
  };

  return (
    <div>
      <div className=" text-center space-y-2  mt-10 mb-12">
        <Header title="Search By ID" />
        {/* <p className=" border-gray-400 border-b-2 border-dotted">
          Quick search by id.
        </p> */}
      </div>
      <div>
        <div className=" items-center justify-center flex my-8">
          <div
            className="center"
            style={{
              "padding-top": "34px",
              "padding-right": "5px",
              "margin-right": "-60px",
              "z-index": "2",
            }}
          >
            OTM-
          </div>
          <Input
            label="Search By ID"
            name="idsearch"
            type="text"
            style={{ "padding-left": "55px" }}
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="DH3232H"
            className="w-80 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 bg-gray-100 border rounded border-gray-200"
          />
        </div>
        <div className=" flex justify-center items-center flex-col my-12  mt-8">
          <Btn onClick={searchHandler} text="Search Now" className=" " />
        </div>
      </div>
      {/* Footer Image */}
      {/* <div>
        <div className=" flex justify-center items-center">
          <img src={searchImg} className="w-full h-96 object-cover" alt="" />
        </div>
      </div> */}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1">
        {isOpen && profile && (
          <div className="my-4 ">
            <div className=" cursor-pointer hover:scale-105 transition-all duration-150">
              <div className=" mx-4   rounded   shadow ">
                <div>
                  <img
                    loading="lazy"
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
                  {/* <Btn
                    onClick={() => addToShortList(profile)}
                    className="px-2"
                    text="Save"
                  /> */}
                  <Btn
                    text="View Profile"
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
  );
}

export default IdSearch;
