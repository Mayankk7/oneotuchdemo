import axios from "axios";
import React, { useState } from "react";
import Btn from "../../subcomponents/buttons/Btn";
import Input from "../../subcomponents/inputs/Input";
import Label from "../../subcomponents/inputs/Label";
import AdvanceSearch from "./AdvanceSearch";
import BasicSearch from "./BasicSearch";

function Search() {
  const [id, setId] = useState("");

  const searchHandler = () => {
    //console.log("hi");
    axios
      .post(`https://onetouchmatrimony1.herokuapp.com/api/v1/users/${id}`)

      .then((res) => "");
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="mx-auto  w-full p-4 m-4 inline-flex justify-center items-center my-2 space-x-4">
          <div className="text-xl">
            <Label text="Search By ID" className="md:w-24" labelFor="search" />
          </div>
          <Input
            onChange={(e) => setId(e.target.value)}
            value={id}
            name="Search"
            className="w-80"
          />

          <Btn
            onClick={() => {//console.log("Hi")}
            }}
            text="Search Now"
            className=" "
          />
        </div>
      </div>
      {/* Basic Search */}
      <div>
        <BasicSearch />
      </div>
      {/* Advance Search */}
      <div>
        <AdvanceSearch />
      </div>
    </div>
  );
}

export default Search;
