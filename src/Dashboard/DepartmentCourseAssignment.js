import React, { useState } from 'react'
import Inputs from "../components/Inputs";
import Button from "../components/Button";
import { CircularProgress } from '@mui/material';

export default function DepartmentCourseAssignment() {
  const [responseCircular, setCircularResponse] = useState(false);
  const [filter, setFilter] = useState(false);

  function handleFilter() {
    setFilter(true)
  }
  function handleCreationForm() {
    setFilter(false)
  }
  function handleCreation(){
    setCircularResponse(true)
  }
  return (
    <>
    {filter ? <div className='filter-wrapper-department'>
       <Inputs placeholder={"Search Organization"}/>
       <Inputs placeholder={"Search Course Schedule Id"}/>
        <Button value={"Apply"} />
        <Button value={"Create Organization"} fun={handleCreationForm} />
      </div> : ""}
      <div className="filter-btn">{!filter ? <Button value={"View Organization"} fun={handleFilter} /> : ""}</div>
      {filter ? <div className='user-details-wrapper'>
        <table>
          <tr>
            <th>Course Schedule Id</th>
            <th>Organization Name</th>
            <th>Course Assigning Id</th>
            <th>Description</th>
          </tr>
          <tr>
            <td>101</td>
            <td>Survey of India</td>
            <td>Departmental</td>
            <td>Department</td>
          </tr>
          <tr>
            <td>102</td>
            <td>Survey of India</td>
            <td>Departmental</td>
            <td>Department</td>
          </tr>
        </table>
      </div> : ""}
    {!filter ? <div className='department-creation-wrapper'>
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
      <Button value={"Submit"} fun={handleCreation}/>
    </div> : ""}
    </>
  )
}
