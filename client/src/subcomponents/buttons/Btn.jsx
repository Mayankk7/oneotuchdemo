import React from "react";

function Btn({ onClick, className, text, type = "button", icon, fIcon }) {
  return (
    <button
      type={type}
      className={`bg-green-600 outline-none hover:bg-indigo-600 text-white px-4 py-2 rounded-xl text-base font-semibold cursor-pointer transition-all duration-150 ${className}`}
      onClick={onClick}
    >
      {fIcon && fIcon} {text} {icon && icon}
    </button>
  );
}

export default Btn;
