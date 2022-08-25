import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../../context/StateProvider";
import stepsData from "../../data/stepsData";
import Btn from "../../subcomponents/buttons/Btn";
import Card from "../../subcomponents/Card/Card";
import Header from "../../subcomponents/Header/Header";

function Steps() {
  const { isModalOpen, setisModalOpen } = useContext(StateContext);
  const navigate = useNavigate();

  return (
    <div className=" max-w-full  pt-4">
      <div className="text-6xl">
        <Header title="How We Work" />
      </div>
      {/* Steps with Details */}
      <div className="md:grid md:grid-cols-2 md:justify-items-center xl:grid-cols-4 flex flex-col justify-center  items-center ">
        {stepsData?.map((item, index) => (
          <Card
            key={index.heading}
            icon={item.icon}
            heading={item.heading}
            details={item.details}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <div className=" my-12 w-50 flex justify-center">
          <Btn onClick={() => navigate("/login")} text="Get Started" />
        </div>
      </div>
    </div>
  );
}

export default Steps;
