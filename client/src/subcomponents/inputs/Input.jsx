import React from "react";

function Input({
  type = "text",
  id,
  placeholder,
  name,
  value,
  label,
  src,
  style,
  defaultValue,
  OnClick,
  className,
  onChange,
  required,
  labelClass,
}) {
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className={`block ${labelClass} text-md mb-2 text-black font-medium  `}
        >
          {label} {required && "*"}
        </label>
      )}

      <input
        name={name}
        type={type}
        id={id}
        src={src}
        onClick={OnClick}
        style={style}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
        className={`shadow-sm bg-gray-50 text-black border border-gray-300  text-sm rounded-lg outline-main-blue focus:ring-blue-500 focus:border-blue-500 block w-full p-2 ${className}`}
        required=""
      ></input>
    </div>
  );
}

export default Input;
