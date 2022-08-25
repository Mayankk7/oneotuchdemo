import { createContext, useContext, useState } from "react";

export const StateContext = createContext("");

const StateProvider = ({ children }) => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [unblocked, setUnblocked] = useState(false);
  const [savedProfiles, setSavedProfiles] = useState([]);
  const [blockedProfiles, setBlockedProfiles] = useState([]);

  const [isLoggedIn, setisLoggedIn] = useState(false);

  const [user, setUser] = useState({
    token: "",
    user: "",
  });
  const [popupMsg, setPopupMsg] = useState("");
  const [errorShow, setErrorShow] = useState(false);
  const [preRegModal, setPreRegModal] = useState(true);

  const [addedProfile, setAddedProfile] = useState(false);
  const [blockedProfile, setBlockedProfile] = useState(false);
  const [registerDet, setregisterDet] = useState({
    profile: "self",
    gender: "",
    phone: "",
    email: "",
    password: "",
    fullname: "",
    dob: "",
    religion: "hindu",
    lang: "hindi",
    country: "",
    state: "",
    city: "",
    marital: "",
    height: "4.1",
    living: "joint",
    education: "B.A",
    work: "private",
    profession: "",
    company: "",
    income: "",
    aboutyou: "",
    image: "https://i.ibb.co/SPbpbRr/default-profile.jpg",
    prefAge: "",
    prefOccupation: "",
    id: "",
    sibling: "0",
    fatherjob: "",
    motherjob: "",
    reffer: "",
    mangolik: "",
    zodiac: "",
  });

  const [validation, setValidation] = useState({
    profile: "",
    gender: "",
    phone: "",
    email: "",
    password: "",
    fullname: "",
    dob: "",
    religion: "",
    lang: "",
    country: "",
    city: "",
    marital: "",
    height: "",
    living: "",
    education: "",
    work: "",
    profession: "",
    company: "",
    income: "",
    aboutyou: "",
    prefAge: "",
    prefOccupation: "",
  });

  return (
    <StateContext.Provider
      value={{
        isModalOpen,
        setisModalOpen,
        isLoggedIn,
        user,
        setUser,
        savedProfiles,
        setSavedProfiles,
        setisLoggedIn,
        registerDet,
        setregisterDet,
        blockedProfiles,
        setBlockedProfiles,
        addedProfile,
        setAddedProfile,
        blockedProfile,
        setBlockedProfile,
        unblocked,
        setUnblocked,
        errorShow,
        setErrorShow,
        popupMsg,
        setPopupMsg,
        validation,
        setValidation,
        preRegModal,
        setPreRegModal,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(StateContext);
};

export default StateProvider;
