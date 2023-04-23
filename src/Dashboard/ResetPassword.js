import axios from 'axios';
import React, { useState } from 'react'

export default function ResetPassword() {
  const [input , setInput] = useState({
    password:"",
    CPassword:"",
    faculty:""
  });
  function handleInputs(e){
    const {name,value} = e.target;
    setInput((prevInput)=>({
      ...prevInput , [name]:value
    }))
  }

  function handleResetPassword(){
    const url = "https://nigst.onrender.com/sauth/change";
    const data = {
      facultyId:`${input.faculty}`,
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
      <input type="text" placeholder='Faculty Id'  name="faculty" onChange={handleInputs}></input>
      <input type="password" placeholder='Old Password'  name="password" onChange={handleInputs}></input>
      <input type="password" placeholder='New Password' name="CPassword" onChange={handleInputs}></input>
      <button onClick={handleResetPassword}>Submit</button>
    </div>
  )
}
