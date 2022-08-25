import axios from "axios";
import React, { useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";
import { maritalDatas, sexData } from "../../data/selectData";
import Btn from "../../subcomponents/buttons/Btn";
import Header from "../../subcomponents/Header/Header";
import Label from "../../subcomponents/inputs/Label";
import Select from "../../subcomponents/Select/Select";
function BasicSearch() {
  const [country, setCountry] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("Never Married");
  const [gender, setGender] = useState("Male");
  const [data, setData] = useState([]);
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

  // console.log(gender, maritalStatus);
  const searchHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        `https://onetouchmatrimony1.herokuapp.com/api/auth/basicSearch?gender=${gender}&maritalStatus=${maritalStatus}&country=${country}`
      )
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };
  // console.log(data);

  const showProfileHandler = (profile) => {
    navigate(`/${profile.userid}`);
  };

  return (
    <div>
      <div className=" text-center space-y-2  mt-10 mb-12">
        <Header title="Basic Search" />
        {/* <p className=" border-gray-400 border-b-2 border-dotted">
          Searches to provide suitable profiles.
        </p> */}
      </div>
      <div className="md:flex mx-auto justify-center items-center p-4 mt-12">
        <div className="md:w-48 flex flex-col md:ml-6 md:mt-0">
          <Select
            label="I am searching for"
            className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
            datas={sexData}
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>
        <div className="md:w-48 flex flex-col md:ml-6 md:mt-0">
          <Select
            label="Status"
            className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
            datas={maritalDatas}
            value={maritalStatus}
            onChange={(e) => setMaritalStatus(e.target.value)}
          />
        </div>
        <div className="md:w-48 flex flex-col md:ml-6 md:mt-0">
          <Label text="Country" labelFor="country" />
          <CountryDropdown
            className="text-base leading-none text-gray-900  focus:oultine-none focus:border-indigo-700 bg-gray-100 h-10 mt-1 border rounded-lg border-gray-300 placeholder-gray-100"
            name="country"
            value={country}
            onChange={(val) => setCountry(val)}
          />
        </div>
        <div className="md:w-48 flex flex-col md:ml-6  mt-8">
          <Btn onClick={searchHandler} text="Search Now" className=" " />
        </div>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1">
        {data &&
          data.map((profile, key) => {
            return (
              <div key={key} className="my-4 ">
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
            );
          })}
      </div>
      {/* <div className=" flex justify-center items-center">
        <img src={searchImg} className="w-full h-96 object-cover" alt="" />
      </div> */}
    </div>
  );
}

export default BasicSearch;
