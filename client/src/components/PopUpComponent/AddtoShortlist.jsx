import React, { useContext, useEffect } from "react";
import { StateContext } from "../../context/StateProvider";

function AddtoShortlist() {
  // const [showElement, setShowElement] = useState(true);
  // Animation Time Function
  const { addedProfile, setAddedProfile } = useContext(StateContext);

  useEffect(() => {
    const timer = setTimeout(function () {
      setAddedProfile(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {addedProfile ? (
        <div className="w-full  flex justify-center z-50 fixed">
          <h1 className=" w-72 p-3 font-bold border-main-blue border-2 bg-green-400 rounded-lg text-center text-2xl text-white  ">
            Added Successfully
          </h1>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default AddtoShortlist;
