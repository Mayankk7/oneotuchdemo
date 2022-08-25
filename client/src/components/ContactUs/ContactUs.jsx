import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import sideImg from "../../assets/image/persons/sideImg.png";
import contactData from "../../data/contactData";
import Card from "../../subcomponents/Card/Card";
import Header from "../../subcomponents/Header/Header";
import ContactForm from "../ContactUs/ContactForm";

function ContactUs() {
  return (
    <div>
      <div>
        <Header title="Contact US" />
      </div>

      {/* Contact Information */}

      <div className=" md:grid  md:justify-items-center lg:grid-cols-3 flex flex-col justify-center items-center gap-6   ">
        {contactData?.map((item, index) => (
          <div className="my-2">
            <Card
              className="cursor-pointer"
              key={index.heading}
              icon={item.icon}
              heading={item.heading}
              details={item.details}
              onClick={item.link}
            />
          </div>
        ))}
      </div>
      {/* Contact form with hero Image */}
      <div className="  lg:flex justify-center">
        <div className=" flex justify-center  items-center">
          <LazyLoadImage
            effect="blur"
            src={sideImg}
            alt=""
            className="md:w-[400px] w-[200px]"
          />
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
