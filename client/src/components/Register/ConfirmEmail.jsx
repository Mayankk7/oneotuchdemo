import React, { useEffect, useState } from "react";
import Header from "../../subcomponents/Header/Header";
import EmailVerified from "../PopUpComponent/EmailVerified";
const axios = require("axios");
const { useNavigate, useParams } = require("react-router-dom");

function ConfirmEmail(props) {
  const navigate = useNavigate();
  const { email, token } = useParams();
  const [message, setMessage] = useState("");
  const [info, setInfo] = useState(false);

  useEffect(() => {
    axios
      .post(`/api/auth/confirmation/${email}/${token}`)
      .then((res) => {
        //console.log("res", res);
        setMessage(res.data);
        setInfo(true);
      })
      .catch((err) => {
        if (err.response) setMessage(err.response.data.msg);
        else setMessage("Failed to verify");
      });
  }, []);

  return (
    <div id="signup" className="login w-full  pt-4">
      <Header title="Confirm Email" />
      <div className="w-full flex justify-center items-center ">
        <div className="">
          <EmailVerified />
        </div>
      </div>
    </div>
  );
}

export default ConfirmEmail;
