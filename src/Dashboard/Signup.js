import React from 'react'
import Inputs from "../components/Inputs";
import Button from "../components/Button";

export default function Signup() {
  return (
    <div className="department-creation-wrapper ">  
      <h3>Sign Up</h3>
      <Inputs type={"text"} placeholder={"First Name"}/>
      <Inputs type={"text"} placeholder={"Middle Name"}/>
      <Inputs type={"text"} placeholder={"Last name"}/>
      <Inputs type={"date"} />
      <select>
        <option>Select Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>
      <select>
        <option>Select Faculty</option>
        <option>Survey of India</option>
        <option>THCPL</option>
        <option>NHCPL</option>
      </select>
      <Inputs type={"tel"} placeholder={"Enter Phone"}/>
      <Inputs type={"email"} placeholder={"Enter email"}/>
      <Inputs type={"password"} placeholder={"Enter Password"}/>
      <Inputs type={"password"} placeholder={"Confirm Password"}/>
      <Button value={"Submit"}/>
    </div>
  )
}

