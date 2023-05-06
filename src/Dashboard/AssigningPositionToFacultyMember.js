import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AssigningPositionToFacultyMember() {
  const [faculty, setFaculty] = useState([]);
  const [facultyPosition, setFacultyPosition] = useState("");
  const [user, setUser] = useState("");
  const [position, setPosition] = useState([]);
  const [facId,setFacId] = useState("");
  const [positionId,setPositionId] = useState("");
 

  function handlePositionAssigning(e) {
    const url = "https://nigst.onrender.com/sauth/possition_assi";
    const data = {
      facultyId: facId,
      faculty_pos: facultyPosition,
      position_assi_id: positionId,
      faculty_admin:user.faculty
    };
    console.log(data)
    axios.post(url, data).then((res) => {
      console.log(res);
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    const urlFaculty = "https://nigst.onrender.com/sauth/faculty_view";
    axios.get(urlFaculty).then((res) => {
      setFaculty(res.data.data);
      console.log(res.data);
    }).catch((error) => {
      console.log(error);
    });
    const positionUrl = "https://nigst.onrender.com/sauth/send";
    axios.get(positionUrl).then((res) => {
      setPosition(res.data.position);
    }).catch((error) => {
      console.log(error);
    });
    let user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  function setFacultyMemberFun(e) {
    setFacId(e.target.options[e.target.selectedIndex].getAttribute("data"));
  }

  function setPositionFun(e){
    setFacultyPosition(e.target.value);
    setPositionId(e.target.options[e.target.selectedIndex].getAttribute("data"))
  }

  return (
    <div className='course-creation-wrapper'>

    <h3  style={{margin:"20px auto"}}>Assigning Positions to Faculty Members</h3>
  <select onChange={(e)=>(setFacultyMember(e.target.value))}>
    <option>Select Faculty Member</option>
    {
      faculty.map((data,index)=>{
       return data.faculty === user.faculty  ?  <option key={index} value={data.first_name}>{data.first_name}</option> : ""
      })
    }
  </select>
  <select onChange={(e)=>setFacultyPosition(e.target.value)}>
    <option>Select Faculty Position</option>
    {
      viewPosition.map((data,index)=>{
        return <option value={data.faculty_pos} key={index}>{data.faculty_pos}</option>
      })
    }
    <option>Head</option>
    <option>Principal</option>
  </select>
  <input type={"text"} placeholder={"Faculty Senio Id"} onChange={handleInputs} name="facultyId"/>
  <Button value={"Submit"} fun={handlePositionAssigning}/>
</div>
  )

}
