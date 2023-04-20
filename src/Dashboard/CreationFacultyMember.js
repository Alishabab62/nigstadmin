import React, { useEffect, useState } from 'react'
import Inputs from "../components/Inputs";
import Button from "../components/Button";
import axios from 'axios';
export default function CreationFacultyMember() {
  const [faculty , setFaculty] = useState([]);

  useEffect(()=>{
    const url = "https://nigst.onrender.com/admin/faculty_show";
    axios.get(url).then((res)=>{
      setFaculty(res.data)
    }).catch((error)=>{
      console.log(error)
    })
  },[])
  return (
    <div className="department-creation-wrapper">  
      <h3>Creation Faculty Member</h3>
      <Inputs type={"text"} placeholder={"First Name"}/>
      <Inputs type={"text"} placeholder={"Middle Name"}/>
      <Inputs type={"text"} placeholder={"Last name"}/>
      <select>
        <option>Select Faculty</option>
        {
          faculty.map((data)=>{
            return <option key={data.id} value={data.name}>{data.name}</option>
          })
        }
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

