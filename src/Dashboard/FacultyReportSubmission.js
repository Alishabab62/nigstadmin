import axios from 'axios';
import React, { useRef, useState } from 'react'


export default function FacultyReportSubmission() {
const [courseTitle,setCourseTitle] = useState("");
const [remark,setRemark] = useState("");
const pdf = useRef();
function handleReportSubmission(){
  const url = "";
  const data={};
  axios.post(url,data).then((res)=>{
    console.log(res)
  }).catch((error)=>{
    console.log(error)
  })
}



  return (
    <div className='department-creation-wrapper'>
       <h3>Course Scheduling</h3>
       <select onChange={(e)=>setCourseTitle(e.target.value)}>
            <option>Select Course Title</option>
       </select>
        <input placeholder='Enter Remark' type='text' name='remark' onChange={(e)=>setRemark(e.target.value)}></input>
        <input type='file' ref={pdf}></input>
        <button onClick={handleReportSubmission}>Submit</button>
    </div>
  )
}
