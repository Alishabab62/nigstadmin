import axios from 'axios';
import React, { useRef, useState } from 'react'


export default function FacultyReportSubmission() {

const [remark,setRemark] = useState("");
const [scheduleId , setScheduleId] = useState("");
const pdf = useRef();




function handleReportSubmission(){

  const user = JSON.parse(localStorage.getItem("user"));
  const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/";
  const data={
    facultyId:`${user.id}`,
    scheduleId:`${scheduleId}`,
    remarks:`${remark}`,
    pdf:pdf.current.file[0]
  };
  axios.post(url,data).then((res)=>{
    console.log(res)
  }).catch((error)=>{
    console.log(error)
  })
}



  return (
    <div className='department-creation-wrapper'>
       <h3>Course Scheduling</h3>
       <input placeholder='Enter Schedule ID' type='text' name='schedule' onChange={(e)=>setScheduleId(e.target.value)}></input>
        <input placeholder='Enter Remark' type='text' name='remark' onChange={(e)=>setRemark(e.target.value)}></input>
        <input type='file' ref={pdf}></input>
        <button onClick={handleReportSubmission}>Submit</button>
    </div>
  )
}
