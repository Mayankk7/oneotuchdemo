import {
  FaConnectdevelop,
  FaRegRegistered,
  FaRocketchat,
} from "react-icons/fa";
import { IoMdCreate } from "react-icons/io";
import { GiLovers } from "react-icons/gi";
import { SiHandshake } from "react-icons/si";
import { MdOutlineContactPhone } from "react-icons/md";

const stepsData = [
  {
    icon: <IoMdCreate />,
    heading: "Sign Up",
    details: "Register Free and put your matromony profile",
  },
  {
    icon: <SiHandshake />,
    heading: "Connect",
    details: "Select and connect with matches you like in seconds",
  },
  {
    icon: <MdOutlineContactPhone />,
    heading: "Contact",
    details:
      "Become a premium member and start a conversation directly by call",
  },
  {
    icon: <GiLovers />,
    heading: "Meet & Marry",
    details: "Marry your soul mate",
  },
];

export default stepsData;
