import React, { useContext, useEffect } from "react";
import { StateContext } from "../../context/StateProvider";

function AddtoBlocklist({ text }) {
  // const [showElement, setShowElement] = useState(true);
  // Animation Time Function
  const { blockedProfile, setBlockedProfile } = useContext(StateContext);

  useEffect(() => {
    const timer = setTimeout(function () {
      setBlockedProfile(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {blockedProfile ? (
        <div className="w-full flex justify-center z-50 fixed">
          <h1 className="w-48 p-3 font-bold bg-green-400 rounded-lg text-center text-2xl text-white  border-main-blue border-2">
            {text}
          </h1>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default AddtoBlocklist;
