import React from "react";

function Label({ className, labelFor, text }) {
  return (
    <label
      htmlFor={labelFor}
      className={`block  w-max mb-1 text-base font-medium ${className}`}
    >
      {text}
    </label>
  );
}

export default Label;
