import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Btn from "../../subcomponents/buttons/Btn";
import Footer from "../Footer/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const type = useParams("type");
  const [isLoading, setIsLoading] = useState(true);
  // const price = useParams("price");
  // const id = useParams("id");
  // const fullname = useParams("fullname");
  const token = localStorage.getItem("auth-token");
  //  console.log(token);
  if (!token) {
    setIsLoading(false);
    //console.log(token);
    return;
  }

  const navigate = useNavigate();

  const initPayment = (data) => {
    //console.log(data.data.id);
    const date = new Date();
    const options = {
      key: "rzp_test_kTXf1E4PobsO2X",
      amount: type.price,
      currency: data.currency,
      name: name,
      description: "Memberhip Payment",
      order_id: data.data.id,
      handler: async (response) => {
        try {
          const object = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            id: type.id,
            type: type.type,
            amountpaid: type.price,
            activateDate: date,
            expireAfterSeconds: type.months,
          };
          //console.log(object);
          const res = await axios.post("/api/auth/verify", object, {
            headers: { Authorization: `Bearer ${token}` },
          });
          navigate(`/payment/success/${type.type}/${type.price}/${type.id}`);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const generatePayment = async (name) => {

    //console.log(type.months);
    var object = {
      amountpaid: type.price,
    };
    //console.log(object);

    const response = await axios.post("/api/auth/orders", object, {
      headers: { Authorization: `Bearer ${token}` },
    });
    //console.log(response.data);
    initPayment(response.data);
  };

  useEffect(() => {
    //console.log(type.type);
    //    console.log(price);
    //    console.log(fullname);
    //    console.log(id);
  }, []);

  const [name, setname] = useState(`${type.fullname}`);
  const [duration, setduration] = useState(1);
  return (
    <>
      <div className="container mx-auto px-6 lg:px-0">
        <div className="relative ">
          <h2 className="mt-12 mb-4 text-main-blue text-center font-bold text-2xl lg:text-4xl">
            Payment Details
          </h2>

          <div className="absolute transform -translate-y-4 top-0 left-0 h-2 bg-gradient-to-r from-main-blue to-main-red w-1/3"></div>
          <div className="absolute bottom-0 right-0 transform translate-y-4 h-2 bg-gradient-to-r from-main-red to-main-blue w-1/3"></div>
        </div>
      </div>
      <div className="w-full md:h-full">
        <div className="m-auto md:w-[50vw] md:h-[100vh] w-[80vw] h-[90vh] bg-white rounded-lg mt-16 md:mt-20">
          <div className="">
            <p className="text-[#878787] pt-12 text-sm md:text-md text-left px-4 md:px-16">
              Enter your Details :
            </p>
            <div className=" justify-center">
              <input
                type="text"
                className=" w-[55vw] md:w-[30vw] mt-8 mx-[10vw] px-8 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-none md:text-sm text-xs"
                placeholder="Name"
                defaultValue={type.fullname}
                onChange={(e) => {
                  setname(e.target.value);
                }}
              />
              <input
                type="text"
                className="w-[55vw] md:w-[30vw] mx-[10vw] mt-8 px-8 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-none md:text-sm text-xs"
                placeholder="Type"
                defaultValue={type.type}
                disabled
              />
              <input
                type="text"
                className="w-[55vw] md:w-[30vw] mx-[10vw] mt-8 px-8 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-none md:text-sm text-xs"
                placeholder="Price"
                defaultValue={`${type.price}/month`}
                disabled
              />
              <input
                type="number"
                className="w-[55vw] md:w-[30vw] mx-[10vw] mt-8 px-8 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-none md:text-sm text-xs"
                placeholder="Number of Months"
                defaultValue={type.months}
                disabled
              />
              <input
                type="text"
                className="w-[55vw] md:w-[30vw] mx-[10vw] mt-8 px-8 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-none md:text-sm text-xs"
                placeholder="Amount"
                defaultValue={`Rs. ${type.price}`}
                disabled
              />
              <button
                className="px-8 py-4 ml-[20vw] cursor-pointer hover:bg-blue-400 bg-blue-500 mt-12 text-white"
                onClick={() => {
                  generatePayment(name);
                }}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Payment;
