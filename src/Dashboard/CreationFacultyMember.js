import React, { useEffect, useRef, useState } from 'react'
import Inputs from "../components/Inputs";
import Button from "../components/Button";
import axios from 'axios';
export default function CreationFacultyMember() {
  const [faculty , setFaculty] = useState([]);
  const [input, setInput] = useState({
    f_name:"",
    l_name:"",
    m_name:"",
    email:"",
    phone:"",
    education:"",
    designation:"",
  });
  const [gender , setGender] = useState("");
  const [facultyInput , setFacultyInput] = useState("");
  const [login , setLogin] = useState("");
  const dobRef = useRef();

  function handleInputs(e){
    const {name,value} = e.target;
    setInput((prevInput)=>({
      ...prevInput , [name]:value
    }));
  }

  useEffect(()=>{
    const url = "https://nigst.onrender.com/admin/faculty_show";
    axios.get(url).then((res)=>{
      setFaculty(res.data)
    }).catch((error)=>{
      console.log(error)
    })
  },[])


  function handleCreationMembers(){
    const url = "https://nigst.onrender.com/sauth/create";
    const data = {
      first_name:`${input.f_name}`,
      middle_name:`${input.m_name}`,
      last_name:`${input.l_name}`,
      dob:`${dobRef.current.value}`,
      phone:`${input.phone}`,
      email:`${input.email}`,
      gender:`${gender}`,
      education:`${input.education}`,
      designation:`${input.designation}`,
      loginAccess:`${login}`,
      faculty:`${facultyInput}`,
    }
    console.log(data)
    axios.post(url,data).then((res)=>{
      console.log(res)
    }).catch((error)=>{
      console.log(error);
    })
  }
  return (
    <div className="faculty-member-creation-wrapper">  
      <h3>Creation Faculty Member</h3>
      <Inputs type={"text"} placeholder={"First Name"} name={"f_name"} fun={handleInputs}/>
      <Inputs type={"text"} placeholder={"Middle Name"} name={"m_name"} fun={handleInputs}/>
      <Inputs type={"text"} placeholder={"Last name"} name={"l_name"} fun={handleInputs}/>
      <select onChange={(e)=>(setFacultyInput(e.target.value))}>
        <option >Select Faculty</option>
        {
          faculty.map((data)=>{
            return <option key={data.id} value={data.name}>{data.name}</option>
          })
        }
      </select>
      <input type='date' ref={dobRef}></input>
      <select onChange={(e)=>(setGender(e.target.value))}>
        <option>Select Gender</option>
        <option value={"male"}>Male</option>
        <option value={"female"}>Female</option>
        <option value={"other"}>Other</option>
      </select>
      <Inputs type={"email"} placeholder={"Enter email"} name={"email"} fun={handleInputs}/>
      <Inputs type={"tel"} placeholder={"Enter Phone"} name={"phone"} fun={handleInputs}/>
      <input type='text' placeholder='Enter Highest Qualification' name={"education"} onChange={handleInputs}></input>
      <input type='text' placeholder='Enter Designation' name={"designation"} onChange={handleInputs}></input>
      {/* <Inputs type={"password"} placeholder={"Enter Password"} name={"password"} fun={handleInputs}/> */}
      <div style={{display:"flex" , alignItems:"center"}}>
      <input type="radio" value="true" name="admin verification" onChange={(e)=>(setLogin(e.target.value))}/> <label>Login Access</label>
      <input type="radio" value="false" name="admin verification" onChange={(e)=>(setLogin(e.target.value))}/> <label>No Login Access</label>
      </div>
      <Button value={"Submit"} fun={handleCreationMembers}/>
    </div>
  )
}

