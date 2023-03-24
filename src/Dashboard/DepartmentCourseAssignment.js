import React, { useState } from 'react'
import Inputs from "../components/Inputs";
import Button from "../components/Button";
import { CircularProgress } from '@mui/material';

export default function DepartmentCourseAssignment() {
  const [responseCircular, setCircularResponse] = useState(false);

  return (
    <div className='department-creation-wrapper'>
         {responseCircular ? (
        <div
          style={{
            width: "29%",
            height: "30%",
            left: "33%",
            backgroundColor: "rgb(211,211,211)",
            borderRadius: "10px",
            top: "100px",
            position: "absolute",
            padding: "10px 20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress style={{ height: "50px", width: "50px" }} />
        </div>
      ) : (
        ""
      )}
        <h3>Department Course Assignment</h3>
      <select>
        <option>Select Organization </option>
        <option>Organization 1</option>
        <option>Organization 1</option>
        <option>Organization 1</option>
        <option>Organization 1</option>
      </select>
      <select>
        <option>Select Course Id </option>
        <option>Course Id 101</option>
        <option>Course Id 102</option>
        <option>Course Id 103</option>
        <option>Course Id 104</option>
      </select>
      <Inputs type={"text"} placeholder={"Description"}/> 
      <Button value={"Submit"}/>
    </div>
  )
}
