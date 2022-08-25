import React, {useContext, useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import Btn from "../../subcomponents/buttons/Btn";
import axios from "axios";
import Payment from "../../components/Membership/Payment";
import { useNavigate } from "react-router-dom";

function MembershipCard({ plan, popular, price, duration,months, data }) {
  const [UserDetails, setUserDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [type, settype] = useState("");
  const [payment, setshowpayment] = useState(false);

  const navigate = useNavigate();

  useEffect(async() => {
    const token = localStorage.getItem("auth-token");
    //  console.log(token);
    if (!token) {
      setIsLoading(false);
      console.log(token);
      return;
    }

    const response = await axios.get("/api/auth/users", {
     headers: { Authorization: `Bearer ${token}` },
    });

    console.log(response.data);
    setUserDetails(response.data);

  }, []);

  return (
    <div>
      {/* {payment && <Payment type={type} price={price} id={UserDetails.userid} fullname={UserDetails.fullname}/>} */}
      <div className="rounded-lg shadow-lg border-2 border-gray-200 overflow-hidden mb-4 transform transition duration-500 hover:scale-105 ">
        <div className="px-6 py-8 bg-white relative sm:p-10 sm:pb-6">
          {popular && (
            <p className="absolute bg-main-blue text-lg text-white rotate-45 font-semibold px-5 py-2 right-0 top-8 rounded-md">
              Popular
            </p>
          )}
          <div className="flex justify-center">
            <span className="inline-flex px-4 py-1  rounded-full text-sm leading-5 font-semibold tracking-wide uppercase">
              {plan}
            </span>
          </div>
          <div className="mt-4 flex  justify-center text-6xl leading-none font-extrabold dark:text-white">
            <span className="ml-1 mr-3 text-xl leading-8 font-medium text-gray-500 ">
              from
            </span>
            <span className="text-main-blue">₹{price}</span>

            <span className="ml-1 pt-8 text-2xl leading-8 font-medium text-gray-500 dark:text-gray-400">
              /{duration}
            </span>
          </div>
        </div>
        <div className="px-6 pt-6 pb-8 bg-white dark:bg-gray-800 sm:p-10 sm:pt-6">
          <ul>
            {data.map((feature, index) => (
              <li className="mt-4 flex items-start">
                <p className="ml-3 text-base leading-6 text-gray-700 gap-x-3 flex items-center">
                  {feature.isAvailable ? (
                    <div className="p-1 bg-white text-green-700 rounded-full">
                      <TiTick className="text-xl" />
                    </div>
                  ) : (
                    <div className="p-2 bg-white text-red-500 rounded-full">
                      <ImCross
                        className="text-xs
              "
                      />
                    </div>
                  )}
                  {feature.name}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-md pt-8  flex justify-center items-center">
            <Btn
              text="Get Started"
              className="hover:bg-main-red"
              onClick={() => {
                navigate(`/payment/${plan}/${price}/${months}/${UserDetails.userid}/${UserDetails.fullname}`);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MembershipCard;
