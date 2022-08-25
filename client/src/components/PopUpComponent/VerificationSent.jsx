import lottie from "lottie-web";
import React, { useEffect, useRef, useState } from "react";
import verification from "../../animations/Verification.json";

function VerificationSent() {
  const [showElement, setShowElement] = useState(true);
  useEffect(() => {
    const timer = setTimeout(function () {
      setShowElement(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  const anime = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: anime.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: verification,
    });
    return () => lottie.stop();
  }, []);
  return (
    <div>
      {showElement ? (
        <div className="mx-auto h-64 w-64 bg-white border-2 border-main-red rounded-xl  fixed inset-0 z-50 flex  justify-center items-center">
          <div
            className="absolute"
            style={{ height: 150, width: 300 }}
            ref={anime}
          >
            <h1 className="text-2xl font-bold text-main-blue ">
              Verification Sent Successfully
            </h1>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default VerificationSent;
