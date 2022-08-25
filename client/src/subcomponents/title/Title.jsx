import React from "react";

function Title({ text }) {
  return (
    <div>
      <h1 className="text-2xl  font-bold leading-loose text-main-blue">
        {text}
      </h1>
    </div>
  );
}

export default Title;
