import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AdminMenuItems } from "../../data/menu";
import Btn from "../../subcomponents/buttons/Btn";
import BtnLink from "../../subcomponents/buttons/BtnLink";

export default function Menu() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState(false);
  const [isHide, setisHide] = useState(true);
  const location = useLocation();
  const [url, setUrl] = useState(null);

  const handleLogut = () => {
    localStorage.removeItem("user");
    navigate("/alogin");
  };
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);
  return (
    <>
      {/* Mobile Navbar */}
      <div className="  relative">
        <div className="bg-gray-50 lg: flex justify-between  p-6 items-center ">
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
          <div className="w-full flex justify-end">
            <ul className="flex space-x-6 justify-center items-center ">
              <li className="text-base text-main-blue ml-2">Hello Admin,</li>
              <li>
                <BtnLink link="/" text="Front-End" />
              </li>
              <li><BtnLink link="/onetouchmatrimony/admin/userSheet" text="User-Sheet" /></li>
              <li><BtnLink link="/onetouchmatrimony/admin/memberSheet" text="Member-Sheet" /></li>
              <li>
                <Btn onClick={handleLogut} text="Logout" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        id="Main"
        className={` ${
          !show ? "-translate-x-full" : "translate-x-0"
        } z-50 bg-white  absolute ease-in-out transition transform  duration-500 flex justify-start items-start w-1/3 shadow-sm shadow-gray-300 md:w-1/5  flex-col h-[1200px]`}
      >
        <div className="w-full px-6">
          <hr className="border-gray-300  w-full" />
        </div>
        <div className="mt-6 ml-3 text-lg flex flex-col justify-start items-start lg:  px-4 space-y-3 pb-5 ">
          {AdminMenuItems.map((item, index) => {
            return (
              <div className="lg:">
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
                          <Link to={data.path}>{data.title}</Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link className="py-1" to={item.path}>
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
