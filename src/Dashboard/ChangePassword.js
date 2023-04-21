import React, { useState } from 'react'

export default function ChangePassword() {
  const [input , setInput] = useState({
    password:"",
    CPassword:""
  })
  function handleInputs(e){
    const {name,value} = e.target;
    setInput((prevInput)=>({
      ...prevInput , [name]:value
    }))
  }
  return (
    <div className='department-creation-wrapper'>
      <h3>Change Password</h3>
      <input type="password" placeholder='Enter Password'  name="password" onChange={handleInputs}></input>
      <input type="password" placeholder='Confirm Password' name="CPassword" onChange={handleInputs}></input>
      <button>Submit</button>
    </div>
  )
}
