import React, { useEffect, useState } from 'react'
import Button from '../components/Button';
import axios from 'axios';

export default function AssigningPositionToFacultyMember() {
  const [viewPosition , setViewPosition] = useState([]);
  const [faculty , setFaculty] = useState([]);
  const [facultyMember , setFacultyMember] = useState("");
  const [facultyPosition , setFacultyPosition] = useState("")
  const [input , setInput] = useState({
    facultyId:""
  })
  function handleInputs(e){
    const {name , value} = e.target;
    setInput((prevInput)=>({
      ...prevInput , [name]:value
    }));
  }
    function handlePositionAssigning(){
        console.log("function Called");
        const url = "https://nigst.onrender.com/sauth/possition_assi";
        const data = {
          facultyId:`${input.facultyId}`,
          faculty_pos:`${facultyPosition}`,
          position_assi_id:`${facultyMember}`
        }
        axios.post(url ,data).then((res)=>{
          console.log(res)
        }).catch((error)=>{
          console.log(error)
        })
    }
    useEffect(()=>{
      const url = "https://nigst.onrender.com/sauth/view";
      axios.get(url).then((res)=>{
        setViewPosition(res.data.reverse());
      }).catch((error)=>{
        console.log(error);
      });
      const urlFaculty = "https://nigst.onrender.com/sauth/faculty_view";
    axios.get(urlFaculty).then((res)=>{
      setFaculty(res.data.data)
      console.log(res.data)
    }).catch((error)=>{
      console.log(error)
    })
    },[]);

  return (
    <div className='course-creation-wrapper'>
    <h3>Assigning Positions to Faculty Members</h3>
  <select onChange={(e)=>(setFacultyMember(e.target.value))}>
    <option>Select Faculty Member</option>
    {
      faculty.map((data,index)=>{
        return <option key={index} value={data.first_name}>{data.first_name}</option>
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
  <input type={"text"} placeholder={"Faculty Position Id"} onChange={handleInputs} name="facultyId"/>
  <Button value={"Submit"} fun={handlePositionAssigning}/>
</div>
  )
}
