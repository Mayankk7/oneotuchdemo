import lottie from "lottie-web";
import React, { useEffect, useRef } from "react";
import loveLoader from "../../animations/dotloading.json";

function LoveLoader() {
  const anime = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: anime.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: loveLoader,
    });
    return () => lottie.stop();
  }, []);
  return (
    <div className=" flex  justify-center items-center">
      <div style={{ height: 250, width: 300 }} ref={anime}></div>
    </div>
  );
}

export default LoveLoader;
