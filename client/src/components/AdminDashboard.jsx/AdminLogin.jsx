import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Btn from "../../subcomponents/buttons/Btn";
import Input from "../../subcomponents/inputs/Input";
import Label from "../../subcomponents/inputs/Label";
const AdminLogin = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });

  const handleInputs = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('/api/auth/adminlogin', admin).then((res) => {
      //console.log(res.data)
      localStorage.setItem("token", res.data.token);
      navigate("/onetouchmatrimony/admin");
    }).catch((err) => {
      console.log(err.response);
    })

  };
  //console.log(admin);

  return (
    <section className="bg-main-blue ">
      <div className=" flex justify-center lg:items-center px-10">
        <form className="w-[400px]  text-white py-12 px-2 sm:px-0">
          <div className="pt-0 px-2 flex flex-col items-center justify-center">
            <h2 className="text-4xl leading-tight pt-8 uppercase font-semibold">
              Admin Login
            </h2>
          </div>
          <div className="pt-16 px-2 flex flex-col items-center justify-center">
            <h3 className="text-2xl sm:text-3xl xl:text-2xl font-bold leading-tight">
              Login To Your Account
            </h3>
          </div>
          <div className="mt-12 w-full px-2 sm:px-6">
            <div className="flex flex-col mt-5">
              <Label text="Your Email" labelFor="email" />
              <Input
                name="email"
                type="email"
                id="email"
                placeholder="Type your email here"
                onChange={handleInputs}
                value={admin.email}
              />
            </div>
            <div className="flex flex-col mt-5">
              <Label labelFor="password" text="Your Password" />
              <Input
                name="password"
                type="password"
                id="password"
                placeholder="Type your password here"
                onChange={handleInputs}
                value={admin.password}
              />
            </div>
          </div>
          <div className="pt-6 w-full flex justify-between px-2 sm:px-6">
            <div className="flex items-center">
              <input id="rememberme" className="w-3 h-3 mr-2" type="checkbox" />
              <label htmlFor="rememberme" className="text-xs">
                Remember Me
              </label>
            </div>
          </div>
          <div className="px-2 sm:px-6">
            <Btn
              text="Login"
              type="submit"
              onClick={handleLogin}
              className="text-white bg-main-red px-7 mt-4 hover:bg-pink-700 w-full"
            />
          </div>
        </form>
      </div>
    </section>
  );
};
export default AdminLogin;
