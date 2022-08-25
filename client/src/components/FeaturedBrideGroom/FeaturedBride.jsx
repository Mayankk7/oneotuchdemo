import React from "react";
import { brideDatas } from "../../data/featuredBrideGroomData";
import BrideGroomCard from "../../subcomponents/Card/BrideGroomCard";
import Header from "../../subcomponents/Header/Header";

function FeaturedBride() {
  return (
    <div>
      <Header
        title="Featured Brides"
        subtitle="This is our featured brides section where you can check our bride profiles."
      />
      {/* Bride Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-2 px-7 lg:px-4 gap-4">
        {brideDatas?.map((bride, index) => (
          <BrideGroomCard
            key={index + bride.name}
            name={bride.name}
            age={bride.age}
            education={bride.education}
            location={bride.location}
            img={bride.img}
          />
        ))}
      </div>
    </div>
  );
}

export default FeaturedBride;
