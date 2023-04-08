import React, { useEffect, useState } from 'react'
import Inputs from '../components/Inputs';
import Button from '../components/Button';
import axios from 'axios';

export default function AssigningPositionToFacultyMember() {
  const [viewPosition , setViewPosition] = useState([]);

    function handlePositionAssigning(){
        console.log("function Called");
    }
    useEffect(()=>{
      const url = "https://nigst.onrender.com/sauth/view";
      axios.get(url).then((res)=>{
        setViewPosition(res.data.reverse());
      }).catch((error)=>{
        console.log(error);
      })
    },[]);

  return (
    <div className='course-creation-wrapper'>
    <h3>Assigning Positions to Faculty Members</h3>
  <select>
    <option>Select Faculty Member</option>
    <option>Faculty 1</option>
    <option>Faculty 2</option>
  </select>
  <select>
    <option>Select Faculty Position</option>
    {
      viewPosition.map((data,index)=>{
        return <option value={data.faculty_pos} key={index}>{data.faculty_pos}</option>
      })
    }
    <option>Head</option>
    <option>Principal</option>
  </select>
  <Inputs type={"text"} placeholder={"Faculty Position Id"}/>
  <Button value={"Submit"} fun={handlePositionAssigning}/>
</div>
  )
}
