import axios from 'axios';
import React, { useState } from 'react'

export default function ChangePassword() {
  const [input , setInput] = useState({
    password:"",
    CPassword:""
  })
  function handleInputs(e){
    const {name , value} = e.target;
    setInput((prevInput)=>({
      ...prevInput , [name]:value
    }));
    console.log(input)
  }

  function changePassword(){
    let token = window.location.href.split("/")[5];
    console.log(token)
    const url = "https://nigst.onrender.com/sauth/reset";
    const data ={
      password:`${input.password}`,
      resetToken:`${token}`
    }
    axios.patch(url,data).then((res)=>{
      console.log(res)
    }).catch((error)=>{
      console.log(error);
    })
  }
  return (
    <div className='department-creation-wrapper'>
      <h3>Change Password</h3>
      <input type="password" placeholder='Enter Password'  name="password" onChange={handleInputs}></input>
      <input type="password" placeholder='Confirm Password' name="CPassword" onChange={handleInputs}></input>
      <button onClick={changePassword}>Submit</button>
    </div>
  )
}
