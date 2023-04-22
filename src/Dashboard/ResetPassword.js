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
  return (
    <div className='department-creation-wrapper'>
       <h3>Reset Password</h3>
      <input type="password" placeholder='Faculty Id'  name="faculty" onChange={handleInputs}></input>
      <input type="password" placeholder='Old Password'  name="password" onChange={handleInputs}></input>
      <input type="password" placeholder='New Password' name="CPassword" onChange={handleInputs}></input>
      <button>Submit</button>
    </div>
  )
}
