import React from 'react'
import Inputs from '../components/Inputs';
import Button from '../components/Button';

function handleLogin(){
  window.location.href = "/admin"
}

export default function Login() {
  return (
    <div className="login-wrapper ">  
      <h3>Login</h3>
      <Inputs type={"email"} placeholder={"Enter email"}/>
      <Inputs type={"password"} placeholder={"Enter Password"}/>
      <select>
        <option>Select</option>
        <option>NIGST Admin</option>
        <option>Faculty Admin</option>
        <option>Faculty Member</option>
      </select>
      <Button value={"Submit"} fun={handleLogin}/>
    </div>
  )
}

