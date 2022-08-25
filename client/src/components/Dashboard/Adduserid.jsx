import axios from "axios";
import "../../styles/Register.css"
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../../context/StateProvider";
//import { similarProfiles } from "../../data/profileDetailsData";
import Btn from "../../subcomponents/buttons/Btn";
import Header from "../../subcomponents/Header/Header";
import AddtoBlocklist from "../PopUpComponent/AddtoBlocklist";
import AddtoShortlist from "../PopUpComponent/AddtoShortlist";
import LoveLoader from "../PopUpComponent/LoveLoader";
import SinglePopup from "../PopUpComponent/SinglePopup";

import Input from "../../subcomponents/inputs/Input";
import Label from "../../subcomponents/inputs/Label";
import Select from "../../subcomponents/Select/Select";

// get the age of the user from date of birth (dob)


function Adduserid() {
  const [tid, setTid] = useState("");
  const [available,setAvailable] = useState(true)
  const [tokenst,setTokenst] = useState("")
  const [msg , setMsg] = useState("")
  const [id, setId] = useState("");

  const {
    registerDet,
    addedProfile,
    setAddedProfile,
    blockedProfile,
    setBlockedProfile,
    errorShow,
    setErrorShow,
    popupMsg,
    setPopupMsg,
  } = useContext(StateContext);
  const navigate = useNavigate();

  const [ht,setHt] = useState("100vh")
  // fetching similar profiles from database
  useEffect(() => {

 setHt("0") 
    setTokenst(localStorage.getItem("auth-token"))
    //console.log(tokenst)
    // console.log(token);
    // axios
    //   .post(
    //     "/api/auth/allUsers",
    //     { gender: registerDet.gender },
    //     {
    //       headers: { Authorization: `Bearer ${token}` },
    //     }
    //   )
    //   .then((res) => {
    //     console.log(res);
    //     setSimilarProfiles(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err.response);
    //     setPopupMsg(" Failed to fetch details !");
    //     setErrorShow(true);
    //   });
  }, []);

  // Saving Someones Profile Handling
  const addToShortList = (profile) => {
    // const token = localStorage.getItem("auth-token");
    axios
      .post(
        "/api/auth/saveProfile",
        { profileId: profile._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setAddedProfile(true);
      })
      .catch((err) => {
        setPopupMsg("Failed to add profile");
        setErrorShow(true);
      });
  };

  // Blocking Someones Profile Handling

  // const handleBlock = (profile) => {
  //   const token = localStorage.getItem("auth-token");
  //   axios
  //     .post(
  //       "/api/auth/blockProfile",
  //       { profileId: profile._id },
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     )
  //     .then((res) => {
  //       const updatedSimilarProfile = similarProfiles.filter(
  //         (prof) => prof._id !== profile._id
  //       );
  //       setBlockedProfile(true);
  //       setSimilarProfiles(updatedSimilarProfile);
  //     })
  //     .catch((err) => console.log(err));
  // };

useEffect(() => {

axios.get("/api/auth/nameavailable/"+tid ).then(e=>
  {
    const re = /^[a-zA-Z0-9_]+$/;
    const sp = /^\S*$/
   


  if(tid.length <3 && tid.length >0)
  setMsg("Too Short!")
  
 
 else
  if(!re.test(tid))
  setMsg("No special characters allowed")
 else
  if(!sp.test(tid))
  setMsg("No spaces allowed")
 
  else
  if(tid.length >3)
  setMsg("available")
}).catch(e=>setMsg("username already taken"));



  return () => {
    
  }
}, [tid])

useEffect(() => {
  
  if(msg === "available")
  setAvailable(true)
  else
  setAvailable(false)
  return () => {
    
  }
}, [msg])



  const showProfileHandler = (profile) => {
    navigate(`/${profile._id}`);
  };

  return (
    <div style = {{"position": "absolute","top" :ht,"width":"100vw","height":"100vh","transition":"top .5s ease-in"}} className = "bg">
   
      <div className="mb-6 w-50 center">
      
        <p className="text-main-red font-noto-sans">{}</p>
      </div>
      




<div>
      <div className=" text-center space-y-2  mt-10 mb-12">
        <Header title="Create Your User Id" />
        {/* <p className=" border-gray-400 border-b-2 border-dotted">
          Quick search by id.
        </p> */}
      </div>
      <div style = {{"display":"flex","flexDirection":"column"}}>
        <div className=" items-center justify-center flex my-8 " style = {{"display":"flex","flexDirection":"column","width":"max-content","padding":"30px","margin":"auto"}}>
         {/* <div className = "center" style= {{"padding-top" : "34px","padding-right" : "5px","margin-right":"-60px","z-index":"2"}}>OTM-</div> */}
         {/* <Label labelFor="zodiac" text="User Id" /> */}
         <div>
        <Input
          name="zodiac"
          placeholder="Create  Your User Id"
          value= {tid}
          
          style = {{"padding" : "20px"}}
          onChange = {(e)=>{


            setTid(e.target.value)

          }}
          
         
        />
      

        </div>
        <div className= {`flex justify-center items-center flex-col my-12  mt-8 capitalize + ${!available?`text-rose-800`:`text-green-800 `}`}>
        {/* {(available) ? (<>yes it is available</>):(<>Please type another userid</>)} */}
        {msg}
        </div>
        <Btn
        className={!available?`bg-slate-200 hover:bg-slate-200 my-5`:`bg-green-500 hover:bg-green-200 `}
        onClick={()=>{
  const token = localStorage.getItem("auth-token");
 if(available) axios
    .get(`/api/auth/saveuserid/${tid}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).
    then(e=>{navigate("/preference")}).catch(e=>console.log(e))
}} text = "Save"/>

        </div>
      </div>
      {/* Footer Image */}
      {/* <div>
        <div className=" flex justify-center items-center">
          <img src={searchImg} className="w-full h-96 object-cover" alt="" />
        </div>
      </div> */}

    </div>




    </div>
  );
}

export default Adduserid;
