import React, { useEffect, useState } from 'react'
import Inputs from "../components/Inputs";
import Button from "../components/Button";
import { Alert, CircularProgress } from '@mui/material';
import axios from 'axios';

export default function DepartmentCourseAssignment() {
  const [responseCircular, setCircularResponse] = useState(false);
  const [filter, setFilter] = useState(false);
  const [orgView , setOrgView] = useState([]);
  const [orgName , setOrgName] = useState();
  const [courseId , setCourseId] = useState();
  const [successAlert, setSuccessAlert] = useState(false);
  const [failAlert, setFailAlert] = useState(false);
  const [emptyFieldAlert, setEmptyFieldAlert] = useState(false);
  const [viewCourse , setViewCourse] = useState([]);
  const [inputs, setInputs] = useState({
    description: "",
  });

  function handleFilter() {
    setFilter(true)
  }
  function handleCreationForm() {
    setFilter(false)
  }

  function handleCreation(){
    if(inputs.description !== "" && orgName !== undefined && courseId !== undefined){
      setCircularResponse(true)
      const data = {
        org_name:`${orgName}`,
        courseId:`${courseId}`,
        des:`${inputs.description}`
      }
      const url = "https://nigst.onrender.com/dep/departassi";
      axios.post(url , data).then((res)=>{
        setCircularResponse(false);
        setSuccessAlert(true);
        setTimeout(() => {
          setSuccessAlert(false)
        }, 5000);
      }).catch((error)=>{
        console.log(error)
        setCircularResponse(false)
        setFailAlert(true);
        setTimeout(() => {
          setFailAlert(false)
        }, 5000);
      })
    }
    else{
      setEmptyFieldAlert(true);
      setTimeout(() => {
        setEmptyFieldAlert(false)
      }, 5000);
    }
  }

  function handleInputs(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
    console.log(inputs)
  }

  useEffect(()=>{
    const url = "https://nigst.onrender.com/dep/v";
    axios.get(url).then((res)=>{
      setOrgView(res.data)
    }).catch((error)=>{
      console.log(error)
    })
    const viewUrl = "https://nigst.onrender.com/dep/viewda";
    axios.get(viewUrl).then((res)=>{
      setViewCourse(res.data.reverse());
    }).catch((error)=>{
      console.log(error);
    })
  },[])
  return (
    <>
    {filter ? <div className='filter-wrapper-department'>
       <Inputs placeholder={"Search Organization"}/>
       <Inputs placeholder={"Search Course Schedule Id"}/>
        <Button value={"Apply"} />
        <Button value={"Organization Course Assigned"} fun={handleCreationForm} />
      </div> : ""} 
      <div className="filter-btn">{!filter ? <Button value={"View Assigned Course"} fun={handleFilter} /> : ""}</div>
      {filter ? <div className='user-details-wrapper'>
        <table>
          <tr >
            <th>S.No</th>
            <th>Organization Name</th>
            <th>Course Assigning Id</th>
            <th>Description</th>
          </tr>
          {
            viewCourse.map((data,index)=>{
              return(
            <tr key={index}>
            <td>{index+1}</td>
            <td>{data.organization_name}</td>
            <td>{data.course_id}</td>
            <td>{data.des}</td>
          </tr>
              )
            })
          }
        </table>
      </div> : ""}
    {!filter ? <div className='department-creation-wrapper'>
          {successAlert ? <Alert severity="success" style={{marginBottom:"10px"}}>Department Course Assignment Create successfully</Alert> : ""}
          {failAlert ? <Alert severity="error" style={{marginBottom:"10px"}}>Something Went Wrong Please try again later</Alert> : ""}
          {emptyFieldAlert ? <Alert severity="error" style={{marginBottom:"10px"}}>All fields required</Alert> : ""}
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
      <select onChange={(e)=> setOrgName(e.target.value)}>
        <option>Select Organization </option>
        {orgView.map((data , index)=>{
          return <option value={data.organization} key={index}>{data.organization}</option>
        })}
      </select>
      <select onChange={(e)=>setCourseId(e.target.value)}>
        <option>Select Course Schedule Id </option>
        <option>Course Id 101</option>
        <option>Course Id 102</option>
        <option>Course Id 103</option>
        <option>Course Id 104</option>
      </select>
      <Inputs type={"text"} placeholder={"Description"} name={"description"} fun={handleInputs}/> 
      <Button value={"Submit"} fun={handleCreation}/>
    </div> : ""}
    </>
  )
}
