import React from "react";
import Footer from "../Footer/Footer";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const params = useParams();
  const token = localStorage.getItem("auth-token");
  //console.log(token);

  const GenerateInvoice = () => {
    const object = {
      type: params.type,
      price: params.price,
      id: params.id,
    };
    //console.log(object);
    axios(`/api/auth/invoice/${object.type}/${object.price}/${object.id}`, {
      method: "GET",
      responseType: "blob", //Force to receive data in a Blob Format
    })
      .then((response) => {
        //Create a Blob from the PDF Stream
        const file = new Blob([response.data], { type: "application/pdf" });
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        //Open the URL on new Window
        window.open(fileURL);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="container mx-auto px-6 lg:px-0">
        <div className="relative ">
          <h2 className="mt-12 mb-4 text-main-blue text-center font-bold text-2xl lg:text-4xl">
            Payment Status
          </h2>

          <div className="absolute transform -translate-y-4 top-0 left-0 h-2 bg-gradient-to-r from-main-blue to-main-red w-1/3"></div>
          <div className="absolute bottom-0 right-0 transform translate-y-4 h-2 bg-gradient-to-r from-main-red to-main-blue w-1/3"></div>
        </div>
      </div>
      <div className="container mx-auto text-center">
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl mt-16 font-bold text-green-400">
            Your Payment is Successful !
          </p>
          <p className="mt-8">We are delighted to inform you that we have received your payment.</p>
          <div className="flex flex-wrap">
          <button
            className="px-4 py-2 text-white rounded-md mt-24 mr-16 bg-green-600 hover:bg-indigo-600"
            onClick={() => (window.location.href = "/")}
          >
            Go to Home
          </button>
          <button
            className="px-4 py-2 text-white rounded-md mt-24 bg-green-600 hover:bg-indigo-600"
            onClick={() => GenerateInvoice()}
          >
            Download Invoice
          </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PaymentSuccess;
