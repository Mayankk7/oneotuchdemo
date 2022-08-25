import React from "react";
import LinuxCard from "../../subcomponents/Card/LinuxCard";
import Header from "../../subcomponents/Header/Header";

function WhyUs() {
  return (
    <div className="max-w-full  py-4 ">
      <div className="title">
        <Header title="Why Choose Us" />
      </div>

      {/* Different reason to choose us */}
      <div className="grid grid-cols-1 lg:grid-cols-2  mx-2 md:mx-0">
        <LinuxCard
          title="Avoid the intro part"
          details="It is quite embarrassing and irritating to introduce yourself to every new individual. In addition, introducing yourself in the midst of so many people from both families is more awkward as well. With online matrimonial services, you can overcome the introduction part. "
        />
        <LinuxCard
          title="Stepping out of your dream world"
          details="Now no longer dream about your soul mate; take a step ahead and create a profile online to fulfill your dream. Certainly, your dream partner will not come and knock your door. It is meaningless to wait for a coincidence just as you see in daily soap and movies. "
        />
        <LinuxCard
          title="Easy and quick accessibility"
          details="Matrimonial websites are usually user-friendly and they ensure transparent and easy access to registered profiles of candidates. "
        />
        <LinuxCard
          title="Privacy and security"
          details="Matrimonial sites make sure not to reveal your personal details to third parties without your consent. "
        />
      </div>
    </div>
  );
}

export default WhyUs;
