import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
import Btn from "../buttons/Btn";

function BrideGroomCard({ name, age, education, location, img }) {
  return (
    <div>
      <div>
        <div className=" bg-main-red text-white  rounded-lg shadow-md  md:mx-auto">
          <Link to="/login" className="flex items-center justify-center">
            <img
              loading="lazy"
              className="  object-cover"
              style={{ height: "220px", minWidth: "100%" }}
              src={img}
              alt="image"
              effect="blur"
            />
          </Link>
          <div className="space-y-1 pt-3">
            <div className="text-left pl-4">
              <h3 className="text-lg font-bold">{name}</h3>
              <p>{age} years</p>
              <p>{education}</p>
              <p>{location}</p>
            </div>

            <div className=" text-center">
              <Link to="/login">
                <Btn
                  text="View Profile"
                  className="hover:bg-pink-700 w-48 my-4"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrideGroomCard;
