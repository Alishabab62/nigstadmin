import React from 'react'
import Inputs from "../components/Inputs";
import Button from "../components/Button";
export default function CreationFacultyMember() {
  return (
    <div className="department-creation-wrapper">  
      <h3>Creation Faculty Member</h3>
      <Inputs type={"text"} placeholder={"First Name"}/>
      <Inputs type={"text"} placeholder={"Middle Name"}/>
      <Inputs type={"text"} placeholder={"Last name"}/>
      <select>
        <option>Select Faculty</option>
        <option>faculty 1</option>
        <option>faculty 2</option>
        <option>faculty 3</option>
        <option>faculty 4</option>
        <option>faculty 5</option>
      </select>
      <Inputs type={"email"} placeholder={"Enter email"}/>
      <Inputs type={"tel"} placeholder={"Enter Phone"}/>
      <Inputs type={"password"} placeholder={"Enter Password"}/>
      <div style={{display:"flex" , alignItems:"center"}}>
      <Inputs type={"radio"} value={"true"} name={"admin verification"}/> <label>Verified</label>
      <Inputs type={"radio"} value={"false"} name={"admin verification"}/> <label>Not Verified</label>
      </div>
      <Button value={"Submit"}/>
    </div>
  )
}

