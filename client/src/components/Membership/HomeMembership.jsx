import React from "react";
import priceData from "../../data/PricingData";
import MembershipCard from "../../subcomponents/Card/MembershipCard";
import Header from "../../subcomponents/Header/Header";

function HomeMembership() {
  return (
    <div>
      <div className=" max-w-full mx-auto  px-4 ">
        <Header
          title="Membership Plans"
          subtitle="Select from our multiple membership plan and find your best life partner with membership benefits."
        />

        {/* Membership Card */}

        <div className=" grid grid-cols-1 lg:grid-cols-3 py-4 gap-5 ">
          {priceData?.map((item, index) => (
            <MembershipCard
              key={index + item.name}
              plan={item.name}
              popular={item.isPopular}
              price={item.price}
              duration={item.duration}
              data={item.data}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeMembership;
