import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link, useLocation } from "react-router-dom";
import useSound from "use-sound";
import bgMusic from "../../assets/bg-music.mp3";
import defaultImage from "../../assets/image/default-profile.jpg";
import ganeshJi from "../../assets/logo/ganesh_ji.png";
import ganeshJiManter from "../../assets/logo/ganesh_ji_manter.png";
import onetouch from "../../assets/logo/one touch matrimonial.png";
import { StateContext } from "../../context/StateProvider";
import { MenuItems } from "../../data/menu";
import Btn from "../../subcomponents/buttons/Btn";
import SinglePopup from "../PopUpComponent/SinglePopup";

const { useNavigate } = require("react-router-dom");

export default function Menu() {
  const [show, setShow] = useState(false);
  const [fetchingDetails, setFetchingDetails] = useState(true);
  const [profile, setProfile] = useState({});
  const [isHide, setisHide] = useState(true);
  const location = useLocation();
  const [playIcon, setPlayIcon] = useState(true);
  const [url, setUrl] = useState(null);

  const [play, { pause }] = useSound(bgMusic);

  {
    playIcon ? play() : pause();
  }

  const {
    isLoggedIn,
    setisLoggedIn,
    errorShow,
    setErrorShow,
    popupMsg,
    setPopupMsg,
    registerDet,
    setregisterDet,
  } = useContext(StateContext);

  // Whatsapp function
  const navigate = useNavigate();
  const whatsAppMe = () => {
    window.open("https://wa.me/919417103593");
    axios
      .post("/api/auth/admin/addClick", {})
      .then((res) => {
        //console.log(res.data.msg)
      }
      )
      .catch((err) => {
        console.log(err.response);
        return;
      });
  };

  // get the user details
  useEffect(() => {
    const token = localStorage.getItem("auth-token");

    axios
      .get("/api/auth/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfile(res.data);
        setregisterDet((prevState) => {
          return {
            ...prevState,
            image: res.data.image,
          };
        });
      })

      .catch((err) => {
        setPopupMsg("Failed to fetch profile !");
        setErrorShow(true);
      });
  }, []);

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  const handleLogut = () => {
    setisLoggedIn(!isLoggedIn);
    navigate("/");
    localStorage.removeItem("auth-token");
  };
  return (
    <>
      {/* Top Whatsapp Notification */}
      <div className="bg-indigo-900 text-center py-1   w-full  lg:px-4">
        <span
          onClick={() => whatsAppMe()}
          className="text-white cursor-pointer mx-2 bg-indigo-500 uppercase px-2   text-xs font-bold mr-3 rounded-full"
        >
          Horoscope
        </span>{" "}
        <span className="w-full bg-main-red h-16  text-white my-auto  cursor-pointer mx-2  uppercase px-2   text-xs font-bold mr-3 rounded-full">
          <button className="" onClick={() => setPlayIcon(!playIcon)}>
            {playIcon ? (
              <i class="fa fa-play fa-2x text-white" id="play-btn">
                Pause
              </i>
            ) : (
              <i class="fa fa-play fa-2x text-blue" id="play-btn">
                Play
              </i>
            )}
          </button>
        </span>
      </div>

      {errorShow && (
        <SinglePopup className="bg-red-300" icon={<AiOutlineClose />} />
      )}
      {/* Code block starts */}

      <nav className=" mx-auto hidden lg:block bg-white shadow  border-[2px] border-b-main-red">
        <div className="container w-full px-6 justify-between h-16 flex items-center lg:items-stretch mx-auto">
          <div className="flex items-center mr-2">
            <Link to="/dashboard">
              <img
                src={onetouch}
                className="z-30"
                width="100"
                height="50"
                alt=""
              />
            </Link>
            <img
              src={ganeshJi}
              style={{ marginLeft: 30 }}
              width="65"
              height="50"
              alt="Ganesh Ji"
            />
            <img src={ganeshJiManter} width="100" height="60" alt="Ganesh Ji" />
          </div>
          <ul className="lg:flex justify-center space-x-6 items-center h-full hidden">
            {MenuItems?.map((item, index) => (
              <div>
                <li
                  className={`${
                    url === item.path ? " text-main-blue" : "text-gray-800"
                  } cursor-pointer h-full flex items-center hover:text-main-blue text-base font-semibold text-gray-800 tracking-normal`}
                >
                  {item.dropdown ? (
                    <div className="group">
                      <p className="flex items-center gap-x-2">
                        {item.title}{" "}
                        <BsChevronDown className=" transition-all duration-150 group-hover:rotate-180" />
                      </p>
                      <div className="hidden group-hover:flex z-50 flex-col absolute gap-y-3 rounded-lg shadow-sm shadow-gray-300 px-5 py-5 bg-white">
                        {item.anotherMenus?.map((data) => (
                          <Link to={data.path}>{data.title}</Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link to={item.path}>{item.title}</Link>
                  )}
                </li>
              </div>
            ))}
          </ul>
          <div className=" lg:flex flex-row-reverse items-center justify-end hidden">
            <Btn onClick={handleLogut} className="ml-4" text="Logout" />
            <div className=" h-full flex items-center">
              <div className="w-full h-full flex">
                <div className=" flex items-center justify-end relative cursor-pointer">
                  <Link to="/dashboard">
                    <div className="flex justify-center items-center">
                      <LazyLoadImage
                        effect="blur"
                        className="rounded h-10 w-10 object-cover"
                        src={
                          registerDet.image ? registerDet.image : defaultImage
                        }
                        alt="avatar"
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <div className="lg:hidden relative">
        <div className="bg-gray-50 h-16  border-[2px] border-b-main-red lg:hidden flex justify-between   mx-auto px-4 sm:px-6 lg:px-8 items-center ">
          <Link to="/dashboard">
            <div className="flex justify-between  items-center space-x-3">
              <img src={onetouch} width="100" height="50" alt="" />
            </div>
          </Link>
          <img
            src={ganeshJi}
            style={{ marginLeft: 30 }}
            width="65"
            height="50"
            alt="Ganesh Ji"
          />
          <img src={ganeshJiManter} width="100" height="60" alt="Ganesh Ji" />
          <div
            aria-label="toggler"
            className="flex justify-center items-center"
          >
            <button
              id="open"
              aria-label="open"
              onClick={() => setShow(!show)}
              className={`${!show ? "" : "hidden"} outline-none`}
            >
              {/* Enlarge Icon */}
              <AiOutlineMenu size={35} className="text-main-blue font-bold" />
            </button>
            <button
              id="close"
              aria-label="close"
              onClick={() => setShow(!show)}
              className={`${
                !show ? "hidden" : ""
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800`}
            >
              {/* Cross Icon */}
              <ImCross size={25} className="text-main-red" />
            </button>
          </div>
        </div>
      </div>
      <div
        id="Main"
        className={` ${
          !show ? "-translate-x-full" : "translate-x-0"
        } z-50 bg-white lg:hidden absolute ease-in-out transition transform  lg:translate-x-0 duration-500 flex justify-start items-start w-96 shadow-sm shadow-gray-300 md:w-96  flex-col h-[1200px]`}
      >
        <div className="px-6 py-2 z-50 flex jusitf-start items-start flex-col space-y-2 lg:hidden">
          <Link to="/dashboard" className="-mx-2">
            <div className="flex justify-center items-center">
              <LazyLoadImage
                effect="blur"
                className="rounded h-10 w-10 object-cover"
                src={registerDet.image ? registerDet.image : defaultImage}
                alt="avatar"
              />
            </div>
            <p className="text-gray-800 text-sm ml-2 md:ml-0">
              Welcome, {profile.fullname || "Welcome"}
            </p>
          </Link>
          <Btn onClick={handleLogut} className="mt-4" text="Logout" />
        </div>
        <div className="w-full px-6">
          <hr className="border-gray-300  w-full" />
        </div>
        <div className="mt-6 ml-3 text-lg flex flex-col justify-start items-start lg:hidden  px-4 space-y-3 pb-5 ">
          {MenuItems.map((item, index) => {
            return (
              <div className="lg:hidden">
                <li
                  className={`${
                    url === item.path ? " text-main-blue" : "text-gray-800"
                  } cursor-pointer h-full flex items-center hover:text-main-blue text-base font-semibold text-gray-800 tracking-normal`}
                >
                  {item.dropdown ? (
                    <div className="">
                      <p
                        onClick={() => setisHide(!isHide)}
                        className="flex items-center gap-x-2"
                      >
                        {item.title}{" "}
                        <BsChevronDown
                          className={`${
                            isHide ? "rotate-0" : "rotate-180"
                          } transition-all duration-150 `}
                        />
                      </p>
                      <div
                        className={`${
                          isHide ? "hidden" : "flex"
                        } z-50 flex-col gap-y-3 rounded-lg shadow-sm shadow-gray-300 px-5 py-5 bg-white`}
                      >
                        {item.anotherMenus?.map((data) => (
                          <Link to={data.path} onClick={() => setShow(!show)}>
                            {data.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      className="py-1"
                      to={item.path}
                      onClick={() => setShow(!show)}
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              </div>
            );
          })}
          {/* </button> */}

          <div className="w-full px-6">
            <hr className="border-gray-300  w-full" />
          </div>
        </div>
      </div>
    </>
  );
}
