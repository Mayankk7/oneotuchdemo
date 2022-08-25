import axios from "axios";
import React, { useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";
import {
  ageData,
  heightDatas,
  maritalDatas,
  sexData,
} from "../../data/selectData";
import Btn from "../../subcomponents/buttons/Btn";
import Header from "../../subcomponents/Header/Header";
import Label from "../../subcomponents/inputs/Label";
import Select from "../../subcomponents/Select/Select";

function AdvanceSearch() {
  const [country, setCountry] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [gender, setGender] = useState("");
  const [ageGte, setAgeGte] = useState("");
  const [ageLte, setAgeLte] = useState("");
  const [heightGte, setHeightGte] = useState("");
  const [heightLte, setHeightLte] = useState("");

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

  const searchHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        `/api/auth/advancedSearch?${gender && `gender=${gender}&`}${
          maritalStatus && `maritalStatus=${maritalStatus}&`
        }${country && `country=${country}&`}${ageGte && `age[gte]=${ageGte}&`}${
          ageLte && `age[lte]=${ageLte}&`
        }${heightGte && `height[gte]=${heightGte}&`}${
          heightLte && `height[lte]=${heightLte}`
        }`
      )
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  const showProfileHandler = (profile) => {
    navigate(`/${profile.userid}`);
  };

  // console.log(data);
  return (
    <div className="space-y-4 ">
      <Header title="Advanced Search" />
      {/* <p className=" border-gray-400 border-b-2 border-dotted">
          Your Search Our Result.
        </p> */}
      <div className="w-full flex items-center justify-center">
        <div className="   rounded  lg:px-12 px-4 ">
          {/* Searching sex */}
          <div className="md:flex items-center ">
            <div className="md:w-72 flex flex-col">
              <Select
                label="I am"
                className="text-base leading-none text-gray-900 px-3 focus:oultine-none focus:border-indigo-700 mb-3 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
                datas={[{ text: "None", value: "" }, ...sexData]}
              />
            </div>
            <div className="md:w-72 flex flex-col md:ml-6 md:mt-0  ">
              <Select
                label="searching for"
                className="text-base leading-none text-gray-900 px-3 focus:oultine-none focus:border-indigo-700 mb-3 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
                datas={[{ text: "None", value: "" }, ...sexData]}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
          </div>
          {/* Age Preference */}
          <div className="md:flex items-center ">
            <div className="md:w-72 flex flex-col">
              <Select
                label="age"
                className="text-base leading-none text-gray-900 px-3 focus:oultine-none focus:border-indigo-700 mb-3 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
                datas={[{ text: "None", value: "" }, ...ageData]}
                value={ageLte}
                onChange={(e) => setAgeLte(e.target.value)}
              />
            </div>

            <div className="md:w-72 flex flex-col md:ml-6 md:mt-0">
              <Select
                label="to"
                className="text-base leading-none text-gray-900 px-3 focus:oultine-none focus:border-indigo-700 mb-3 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
                datas={[{ text: "None", value: "" }, ...ageData]}
                value={ageGte}
                onChange={(e) => setAgeGte(e.target.value)}
              />
            </div>
          </div>
          {/* Height Preference */}
          <div className="md:flex items-center mb-3">
            <div className="md:w-72 flex flex-col">
              <Select
                label="height"
                className="text-base leading-none text-gray-900 px-3 focus:oultine-none focus:border-indigo-700 mb-3 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
                datas={[{ text: "None", value: "" }, ...heightDatas]}
                value={heightLte}
                onChange={(e) => setHeightLte(e.target.value)}
              />
            </div>

            <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mb-3">
              <Select
                label="to"
                className="text-base leading-none text-gray-900 px-3 focus:oultine-none focus:border-indigo-700 mb-3 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
                datas={[{ text: "None", value: "" }, ...heightDatas]}
                value={heightGte}
                onChange={(e) => setHeightGte(e.target.value)}
              />
            </div>
          </div>

          {/* Status and Country Preference */}
          <div className="md:flex items-center mb-3">
            <div className="md:w-72 flex flex-col">
              <Select
                label="Marital Status"
                className="text-base leading-none text-gray-900 px-3 focus:oultine-none focus:border-indigo-700 mb-3 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
                datas={[{ text: "None", value: "" }, ...maritalDatas]}
                value={maritalStatus}
                onChange={(e) => setMaritalStatus(e.target.value)}
              />
            </div>

            <div
              className="md:w-72 flex flex-col"
              style={{ position: "relative", top: "-4px", left: "20px" }}
            >
              <Label text="Country" labelFor="country" />
              <CountryDropdown
                className="text-base leading-none text-gray-900  focus:oultine-none focus:border-indigo-700 bg-gray-100 h-10 border rounded-lg border-gray-300 placeholder-gray-100"
                name="country"
                value={country}
                onChange={(val) => setCountry(val)}
              />
            </div>
          </div>
          <div className="  flex justify-center">
            <Btn
              text="Search Now"
              className="bg-main-red m-8 text-white"
              onClick={searchHandler}
            />
          </div>
        </div>
      </div>
      {/* <div className=" flex justify-center items-center"> 
        <img src={searchImg} className="w-full h-96 object-cover" alt="" />
      </div> */}
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
    </div>
  );
}

export default AdvanceSearch;
