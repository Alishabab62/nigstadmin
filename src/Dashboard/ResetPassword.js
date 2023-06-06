import axios from 'axios';
import React, { useState } from 'react'

export default function ResetPassword() {
  const [input , setInput] = useState({
    password:"",
    CPassword:"",
    confirmPassword:""
  });
  function handleInputs(e){
    const {name,value} = e.target;
    setInput((prevInput)=>({
      ...prevInput , [name]:value
    }))
  }

  function handleResetPassword(){
    const user = JSON.parse(localStorage.getItem("user"));
    const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/sauth/change";
    const data = {
      facultyId:`${user.id}`,
      oldPassword:`${input.password}`,
      newPassword:`${input.CPassword}`
    }
    axios.patch(url,data).then((res)=>{
      console.log(res)
    }).catch((error)=>{
      console.log(error);
    })
  }
  return (
    <div className='department-creation-wrapper'>
       <h3>Reset Password</h3>
      <input type="password" placeholder='Old Password'  name="password" onChange={handleInputs}></input>
      <input type="password" placeholder='New Password' name="CPassword" onChange={handleInputs}></input>
      <input type="text" placeholder='Confirm Password'  name="confirmPassword" onChange={handleInputs}></input>
      <button onClick={handleResetPassword}>Submit</button>
    </div>
  )
}
