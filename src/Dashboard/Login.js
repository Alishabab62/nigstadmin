import React from 'react'
import Inputs from '../components/Inputs';
import Button from '../components/Buttons/Button';

export default function Login() {
  return (
    <div className="department-creation-wrapper ">  
      <h3>Login</h3>
      <Inputs type={"email"} placeholder={"Enter email"}/>
      <Inputs type={"password"} placeholder={"Enter Password"}/>
      <Button value={"Submit"}/>
    </div>
  )
}

