import { Transition } from "@headlessui/react";
import axios from "axios";
import "flowbite";
import { useContext, useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link, useLocation } from "react-router-dom";
import useSound from "use-sound";
import bgMusic from "../../assets/bg-music.mp3";
import ganeshJi from "../../assets/logo/ganesh_ji.png";
import ganeshJiManter from "../../assets/logo/ganesh_ji_manter.png";
import onetouch from "../../assets/logo/one touch matrimonial.png";
import { StateContext } from "../../context/StateProvider";
import navData from "../../data/Navdata";
import BtnLink from "../../subcomponents/buttons/BtnLink";

function Navbar() {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [playIcon, setPlayIcon] = useState(true);
  const [play, { pause }] = useSound(bgMusic);

  {
    playIcon ? play() : pause();
  }

  const { isModalOpen, setisModalOpen } = useContext(StateContext);

  const handleSignupClick = () => {
    setisModalOpen(true);
    setIsOpen(!isOpen);
  };

  // Whatsapp function

  const whatsAppMe = () => {
    window.open("https://wa.me/919417103593");
    axios
      .post("/api/auth/admin/addClick", {})
      .then((res) => {//console.log(res.data.msg)
      })
      .catch((err) => {
        console.log(err.response);
        return;
      });
  };

  const [url, setUrl] = useState(null);
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  return (
    <div>
      {/* Top Whatsapp Notification */}
      <div className="bg-indigo-900 text-center py-1  w-full  lg:px-4">
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
                Pause Music
              </i>
            ) : (
              <i class="fa fa-play fa-2x text-blue" id="play-btn">
                Play Music
              </i>
            )}
          </button>
        </span>
      </div>

      {/* Big Screen Navbar */}
      <nav className="bg-gray-50 border-[2px] border-b-main-red">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/">
                <img src={onetouch} width="100" height="50" alt="" />
              </Link>
            </div>
            <div className="flex items-center mr-2">
              <img
                src={ganeshJi}
                style={{ marginLeft: 30 }}
                width="65"
                height="50"
                alt="Ganesh Ji"
              />
              <img
                src={ganeshJiManter}
                width="100"
                height="60"
                alt="Ganesh Ji"
              />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex space-x-4">
                <Link
                  to="/"
                  className={`${
                    url === "/"
                      ? "border-main-blue border-b-2 text-main-blue"
                      : "text-black"
                  }  transition-all duration-150 hover:border-main-blue border-b-2 border-gray-50 hover:text-main-blue px-3 py-2 rounded-md text-base font-medium`}
                >
                  Home
                </Link>
                {/* <Link
                  to="/membership"
                  className={`${
                    url === "/membership"
                      ? "border-main-blue border-b-2 text-main-blue"
                      : "text-black"
                  }  transition-all duration-150 border-gray-50 hover:border-main-blue border-b-2 hover:text-main-blue px-3 py-2 rounded-md text-base font-medium`}
                >
                  Membership
                </Link> */}
                <Link
                  to="/about"
                  className={`${
                    url === "/about"
                      ? "border-main-blue border-b-2 text-main-blue"
                      : "text-black"
                  }  transition-all duration-150 hover:border-main-blue border-b-2 border-gray-50 hover:text-main-blue px-3 py-2 rounded-md text-base font-medium`}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className={`${
                    url === "/contact"
                      ? "border-main-blue border-b-2 text-main-blue"
                      : "text-black"
                  }  transition-all duration-150 hover:border-main-blue border-b-2 border-gray-50 hover:text-main-blue px-3 py-2 rounded-md text-base font-medium`}
                >
                  Contact
                </Link>
              </div>
            </div>
            <div className="hidden md:flex gap-x-4 text-center">
              <BtnLink
                text="Log In"
                link="/login"
                className="text-main-red hover:bg-main-red hover:text-white"
              />
              <BtnLink
                text="Sign Up"
                onClick={handleSignupClick}
                className="text-white bg-main-red px-7 hover:bg-pink-700"
              />
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-50 inline-flex items-center justify-center "
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <AiOutlineMenu size={25} className="text-main-blue " />
                ) : (
                  <ImCross size={25} className="text-main-red" />
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navData?.map((item, index) => (
                  <a
                    key={index + item.link}
                    href={item.link}
                    className="text-black transition-all duration-150 hover:border-main-blue border-b-2 border-gray-50 hover:text-main-blue block px-3 py-2 rounded-md text-base font-medium"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="md:hidden flex justify-center items-center py-5 gap-x-4 text-center">
                <BtnLink
                  onClick={() => setIsOpen(!isOpen)}
                  text="Login"
                  link="/login"
                  className="text-main-red hover:bg-main-red hover:text-white"
                />
                <BtnLink
                  text="Signup"
                  onClick={handleSignupClick}
                  className="text-white bg-main-red px-7 hover:bg-pink-700"
                />
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}

export default Navbar;
