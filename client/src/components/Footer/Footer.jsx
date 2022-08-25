import React from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import logo from "../../assets/logo/croppedLogo.png";
import { navigation } from "../../data/footerData";

function Footer({ extraClass }) {
  return (
    <footer className="" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className={`max-w-full ${extraClass}  mt-8  py-12 lg:py-8 `}>
        <div className="xl:grid xl:grid-cols-3 xl:gap-8 ">
          <div className=" ">
            <div className="flex  items-center">
              <img className="w-20 " src={logo} alt="One Touch Matrimony" />
              <h1 className="text-lg font-bold text-main-red">
                One Touch Matrimony
              </h1>
            </div>
            <div className="space-y-4">
              <p className="text-red-900 text-base">
                Making the world a better place through constructing elegant
                hierarchies.
              </p>
            </div>
          </div>

          <div className="bg-green">
            <div className="mt-12 grid grid-cols-1 gap-8 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-blue-800 tracking-wider uppercase">
                    Support
                  </h3>
                  <ul role="list" className="mt-4 space-y-4">
                    {navigation.quicklinks.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-base text-green-900 hover:text-gray-900"
                          target='_blank'
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-blue-800 tracking-wider uppercase">
                    Quick links
                  </h3>
                  <ul role="list" className="mt-4 space-y-4">
                    {navigation.navdata.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-base text-green-900 hover:text-gray-900"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className=" text-center">
            <div className="text-center">
              <h3 className="text-sm font-semibold text-blue-800 tracking-wider uppercase">
                Social Links
              </h3>
              <ul role="list" className="mt-4 space-y-4">
                <div className="flex justify-center space-x-6">
                  {navigation.social.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-blue-600 hover:text-green-900"
                    >
                      <span className="sr-only">{item.name}</span>
                      <item.icon className="h-6 w-6" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-purple-800 xl:text-center">
            &copy; Copyright 2022 <strong>Onetouchmatrimony</strong> | Designed
            By{" "}
            <a href="https://webmicro.co.in">
              <strong>Web Micro</strong>
            </a>{" "}
            +91 98149-49971
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
