import lottie from "lottie-web";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import success from "../../animations/success.json";
import Btn from "../../subcomponents/buttons/Btn";

function EmailVerified() {
  const anime = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: anime.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: success,
    });
    return () => lottie.stop();
  }, []);
  return (
    <div className=" flex flex-col  justify-center items-center my-4">
      <div className="my-8" style={{ height: 250, width: 600 }} ref={anime}>
        <h1 className="text-lg  text-center font-bold text-main-red">
          Your Email has been verified successfully
        </h1>
      </div>
      <Link to="/login">
        <Btn text="Login" />
      </Link>
    </div>
  );
}

export default EmailVerified;
