import React from "react";
import Btn from "../../subcomponents/buttons/Btn";
import Input from "../../subcomponents/inputs/Input";
import Label from "../../subcomponents/inputs/Label";

function ContactForm() {
  return (
    <div>
      <div className="w-full flex items-center justify-center md:my-8">
        <div className="  bg-main-red text-white mx-auto  px-3 rounded-2xl py-8 ">
          <p className="md:text-3xl text-xl text-white font-bold leading-7 text-center ">
            We would love to hear from you!
          </p>
          <div className="md:flex items-center text-white mt-12">
            <div className="md:w-72 flex flex-col">
              <Input
                label="Name"
                type="name"
                placeholder="Enter Your Name"
                name="name"
                labelClass="text-white"
                className="text-base leading-none text-white p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-500"
              />
            </div>
            <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
              <Input
                label="Email"
                type="email"
                placeholder="Enter Your Email"
                name="email"
                labelClass="text-white"
                className="text-base leading-none  p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-500"
              />
            </div>
          </div>
          <div>
            <div className="w-full flex flex-col mt-8">
              <Label
                className="text-base font-semibold leading-none text-white"
                text="Message"
              />
              <textarea
                tabIndex={0}
                aria-label="leave a message"
                type="name"
                placeholder="Enter Your message (Min: 190 character)"
                className="h-36 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-500 resize-none"
                defaultValue={""}
              />
            </div>
          </div>

          <div className="flex items-center justify-center w-full">
            <Btn text="Submit" className=" my-4 " />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
