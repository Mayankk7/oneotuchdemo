import React from "react";

function Header({ title, subtitle }) {
  return (
    <div className="container mx-auto px-6 lg:px-0">
      <div className="relative ">
        <h2 className="mt-12 mb-4 text-main-blue text-center font-bold text-2xl lg:text-4xl">
          {title}
        </h2>

        <div className="absolute transform -translate-y-4 top-0 left-0 h-2 bg-gradient-to-r from-main-blue to-main-red w-1/3"></div>
        <div className="absolute bottom-0 right-0 transform translate-y-4 h-2 bg-gradient-to-r from-main-red to-main-blue w-1/3"></div>
      </div>
    </div>
  );
}

export default Header;
