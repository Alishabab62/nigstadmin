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
        <option>Faculty Of Geodesy</option>
        <option>Faculty of TS & LIS</option>
        <option>Faculty of Photogrammetry & RS</option>
        <option>Faculty of GEO-ICT</option>
        <option>Faculty of Carto , DM & GIS</option>
      </select>
      <Inputs type={"email"} placeholder={"Enter email"}/>
      <Inputs type={"tel"} placeholder={"Enter Phone"}/>
      <Inputs type={"password"} placeholder={"Enter Password"}/>
      <div style={{display:"flex" , alignItems:"center"}}>
      <Inputs type={"radio"} value={"true"} name={"admin verification"}/> <label>Login Access</label>
      <Inputs type={"radio"} value={"false"} name={"admin verification"}/> <label>No Login Access</label>
      </div>
      <Button value={"Submit"}/>
    </div>
  )
}

