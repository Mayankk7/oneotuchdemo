import React, { useContext, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import unblock from "../../animations/unblock.gif";
import { StateContext } from "../../context/StateProvider";

function AddtoShortlist() {
  // const [showElement, setShowElement] = useState(true);
  // Animation Time Function
  const { unblocked, setUnblocked } = useContext(StateContext);

  useEffect(() => {
    const timer = setTimeout(function () {
      setUnblocked(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {unblocked ? (
        <div className="mx-auto h-32 w-64 bg-white border-2 border-main-red rounded-xl  fixed inset-32 z-50 flex  justify-center items-center">
          <div
            className="absolute
           "
          >
            <div className="flex justify-center items-center">
              <LazyLoadImage
                effect="blur"
                height={20}
                width={20}
                src={unblock}
                alt=""
              />
            </div>
            <h1 className="text-2xl text-center font-bold text-main-blue ">
              Unblocked Successfully
            </h1>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default AddtoShortlist;
