import { FaMailBulk, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const goMap = () => {
  window.open("https://goo.gl/maps/w6hiF7WoZ1C1ifVx6");
};
const callMe = () => {
  window.open("tel:+91-8728070931");
};
const mailMe = () => {
  window.open("mailto:onetouchmatrimony@gmail.com");
};

const contactData = [
  {
    icon: <FaMailBulk />,
    heading: "onetouchmatrimony@gmail.com",
    link: () => {
      mailMe();
    },
  },
  {
    icon: <FaMapMarkerAlt />,
    heading: "Amritsar, India",
    link: () => {
      goMap();
    },
  },
  {
    icon: <FaPhoneAlt />,
    heading: "+918728070931",
    link: () => {
      callMe();
    },
  },
];

export default contactData;
