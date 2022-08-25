import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "../../context/StateProvider";
import priceData from "../../data/PricingData";
import MembershipCard from "../../subcomponents/Card/MembershipCard";
import Header from "../../subcomponents/Header/Header";
import axios from "axios";
function Membership() {
  const { isModalOpen, setisModalOpen } = useContext(StateContext);
  const [user, setUser] = useState({});
  const [member, setMember] = useState(false);
  const [details,setDetails] = useState({});
  const [expiry,setExpiry] = useState();

  const token = localStorage.getItem("auth-token");

  useEffect(async () => {
    await axios
      .get("/api/auth/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        res.data.memberdetails.map((mem) => {
          const currdate = new Date().getTime();
          const expiry = new Date(mem.expiryDate).getTime();
          if (currdate < expiry) {
            setMember(true);
            setDetails(mem);
            var date = new Date(mem.expiryDate);
            var dd = String(date.getDate()).padStart(2, "0");
            var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
            var yyyy = date.getFullYear();
          
            date = mm + "/" + dd + "/" + yyyy;
            //console.log(date);
            setExpiry(date);
          }

        });
        //console.log(member);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {member ? (
        <>
        <div className=" max-w-full mx-auto  px-4 ">
              <Header
                title="You are already a Member"
              />
              <p className="mt-12 md:ml-[40vw] text-lg font-bold">You are already a {details.plan} Member</p>
              <p className="mt-12 md:ml-[38vw] text-lg font-bold">Your Membership expires on : {expiry}</p>

        </div>
        </>
      ) : (
        <>
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
                    months={item.months}
                    data={item.data}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Membership;
