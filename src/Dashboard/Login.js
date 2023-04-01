import React from 'react'
import Inputs from '../components/Inputs';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

// function handleLogin(){
//   // window.location.href = "https://unrivaled-seahorse-94d284.netlify.app/admin"
//   // window.location.href = "/admin"
// Navigate('/admin')  
// }

export default function Login() {
const navigate = useNavigate();
function handleLogin(){
  // window.location.href = "https://unrivaled-seahorse-94d284.netlify.app/admin"
  // window.location.href = "/admin"
  navigate('/admin')  
}
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

