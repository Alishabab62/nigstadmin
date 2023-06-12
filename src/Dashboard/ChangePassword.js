import { Alert } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'

export default function ChangePassword() {
  const [successAlert, setSuccessAlert] = useState(false);
  const [input , setInput] = useState({
    password:"",
    CPassword:""
  })
  function handleInputs(e){
    const {name , value} = e.target;
    setInput((prevInput)=>({
      ...prevInput , [name]:value
    }));
  }

  function changePassword(){
    let token = window.location.href.split("/")[5];
    console.log(token)
    const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/sauth/reset";
    const data ={
      password:`${input.password}`,
      resetToken:`${token}`
    }
    axios.patch(url,data).then((res)=>{
      setSuccessAlert(true);
      setTimeout(() => {
        setSuccessAlert(false);
      }, 5000);
      console.log(res)
    }).catch((error)=>{
      console.log(error);
    })
  }
  return (
    <div className='department-creation-wrapper'>
      <h3>Change Password</h3>
      {successAlert ? <Alert severity="success" style={{marginBottom:"10px"}}>Password Change Successfully successfully</Alert> : ""}
      <input type="password" placeholder='Enter Password'  name="password" onChange={handleInputs} value={input.password}></input>
      <input type="password" placeholder='Confirm Password' name="CPassword" onChange={handleInputs} value={input.CPassword}></input>
      <button onClick={changePassword}>Submit</button>
    </div>
  )
}
