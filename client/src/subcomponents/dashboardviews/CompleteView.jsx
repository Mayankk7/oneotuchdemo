import { useNavigate } from "react-router-dom";
import LoveLoader from "../../components/PopUpComponent/LoveLoader";
import useFetchProfiles from "../../hooks/useFetchProfiles";
import RecentViewCard from "../Card/RecentViewCard";

const CompleteView = ({ title, url }) => {
  const navigate = useNavigate();
  const { profilesData, isLoading } = useFetchProfiles(url);
  const handleProfileView = (singleData) => {
    navigate(`/${singleData.userid}`);
  };
  return (
    <div className="">
      <div>
        <h1 className="text-2xl  pt-7 font-bold leading-loose text-main-blue">
          {title} : {profilesData.length}
        </h1>
      </div>
      {isLoading ? (
        <LoveLoader />
      ) : (
        <div className="container  mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 pt-6 gap-2 ">
          {profilesData.map((singleData, key) => {
            return (
              <RecentViewCard
                onClick={() => handleProfileView(singleData)}
                singleData={singleData}
                img={singleData.image}
                name={singleData.fullname}
                age={singleData.dob}
                location={singleData.country}
                key={singleData._id}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CompleteView;
