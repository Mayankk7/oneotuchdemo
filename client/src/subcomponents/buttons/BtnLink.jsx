import React from "react";
import { Link } from "react-router-dom";

function BtnLink({ text, link, icon, className, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-xl text-base font-semibold cursor-pointer transition-all duration-150 ${className}`}
    >
      {link ? <Link to={link}>{text}</Link> : <p>{text}</p>}
    </button>
  );
}

export default BtnLink;
