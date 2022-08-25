import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Unsubscribe = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState(false);
    const [token, setToken] = useState("")
    useEffect(()=>{
            const token = localStorage.getItem('auth-token');
            setToken(token);
      if (!token) {
        alert("You are not logged in");
        return;
      }

    },[token])

    const navigate = useNavigate();
    const sendReq = async (val) => {
        //console.log(val);
        if(val){
            setStatus("yes");
            const result = await axios.post('/api/auth/unsubscribe', {status: "yes"},{
                headers: { Authorization: `Bearer ${token}` },
            })
            // console.log(result.data);
            navigate("/");

        }else{
            setStatus("no");
        }

    }
  return (
    <div className="mx-auto">
        <div className=''>
            <p className="text-center mt-20">Do you want to unsubscribe to our email service : </p>
        </div>
        <div className="flex flex-wrap mx-0 justify-center mt-8">
            <button className="bg-green-600 mx-4 text-white text-center px-4 py-2 hover:bg-indigo-600 rounded-lg" onClick={()=>{sendReq(true)}}>Yes</button>
            <button className="bg-green-600 text-white text-center px-4 py-2 hover:bg-indigo-600 rounded-lg" onClick={()=>{sendReq(false)}}>No</button>
        </div>
    </div>
  )
}

export default Unsubscribe