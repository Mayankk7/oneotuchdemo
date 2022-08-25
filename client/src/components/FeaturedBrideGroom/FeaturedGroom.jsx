import React from "react";
import { groomDatas } from "../../data/featuredBrideGroomData";
import BrideGroomCard from "../../subcomponents/Card/BrideGroomCard";
import Header from "../../subcomponents/Header/Header";

function FeaturedGroom() {
  return (
    <div className="max-w-full  ">
      <Header
        title="Featured Grooms"
        subtitle="This is our featured brides section where you can check our bride profiles."
      />

      {/* Groom Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-2 px-7 lg:px-4 gap-4">
        {groomDatas?.map((groom, index) => (
          <BrideGroomCard
            key={index + groom.name}
            name={groom.name}
            age={groom.age}
            education={groom.education}
            location={groom.location}
            img={groom.img}
          />
        ))}
      </div>
    </div>
  );
}

export default FeaturedGroom;
