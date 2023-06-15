import { Alert } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { AiFillFilePdf } from 'react-icons/ai';


export default function FacultyReportSubmission() {

const [remark,setRemark] = useState("");
const [scheduleId , setScheduleId] = useState("");
const [viewCompletedCourse,setViewCompletedCourse] = useState([]);
const [view,setView] = useState(true);
const [data,setData] = useState([])
const [successAlert, setSuccessAlert] = useState(false);
const [failAlert, setFailAlert] = useState(false);
const [emptyFieldAlert, setEmptyFieldAlert] = useState(false);
const pdf = useRef();




function handleReportSubmission(){
  if(remark && scheduleId && pdf.current){
    const user = JSON.parse(localStorage.getItem("user"));
    const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/sauth/report/submit";
    const formData = new FormData();
    formData.append("facultyId",user.id);
    formData.append("scheduleId",scheduleId);
    formData.append("remarks",remark);
    formData.append("pdf",pdf.current.files[0]);
    formData.append("faculty",user.faculty);
    axios.post(url,formData).then((res)=>{
      document.getElementById("form").reset();
      console.log(res);
      setSuccessAlert(true);
      setTimeout(() => {
        setSuccessAlert(false)
      }, 5000);
    }).catch((error)=>{
      setFailAlert(true);
      setTimeout(() => {
        setFailAlert(false);
      }, 5000);
      console.log(error)
    })
  }
  else{
    setEmptyFieldAlert(true);
    setTimeout(() => {
      setEmptyFieldAlert(false);
    }, 5000);
  }
}

function handlePDFView(e){
    const data = e.target.getAttribute("data");
    const url = `http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/sauth/report/view/${data}`;
    axios.get(url, { responseType: "blob" }).then((res) => {
      const objectUrl = URL.createObjectURL(res.data);
      const newWindow = window.open();
      
      if (!newWindow) {
        alert('Pop-up blocked. Please allow pop-ups for this website.');
      } else {
        newWindow.document.body.innerHTML = "<embed width='100%' height='100%' src='" + objectUrl + "' type='application/pdf'></embed>";
        newWindow.document.title = "PDF";
      }
    }).catch((error) => {
      console.log(error);
    });
}

function handleView(){
  setView(!view)
}

 useEffect(()=>{
  viewAllCourse();
  const user = JSON.parse(localStorage.getItem("user"))
  const url = `http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/sauth/view_by_faculty/${user.faculty}`;
  axios.get(url).then((res)=>{
      setData(res.data.reports)
  }).catch((error)=>{
    console.log(error)
  })
 },[])

 function viewAllCourse(){
  const user = JSON.parse(localStorage.getItem("user"));
  const url = `http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/sauth/send_course/${user.faculty}`;
  axios.get(url).then((res)=>{
    setViewCompletedCourse(res.data.courses);
    console.log(res);
  }).catch((error)=>{
    console.log(error)
  })
 }

  return (
    <div>
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      {
        view ? <button className='toggle_btn' onClick={handleView}>View Course Report</button> : <button className='toggle_btn' onClick={handleView}> Report Submit</button>
      }
    </div>
    { 
    view &&
    <div className='department-creation-wrapper'>
    <h3>Course Report Submission</h3>
    {successAlert ? <Alert severity="success" style={{marginBottom:"10px"}}>Tender Create successfully</Alert> : ""}
    {failAlert ? <Alert severity="error" style={{marginBottom:"10px"}}>Something Went Wrong Please try again later</Alert> : ""}
    {emptyFieldAlert ? <Alert severity="error" style={{marginBottom:"10px"}}>All fields required</Alert> : ""}
    <form id='id'>
    <select onChange={(e)=>setScheduleId(e.target.value)}>
      <option>select course</option>
      {
        viewCompletedCourse.map((data,index)=>{
          return <option key={index} value={data.schedulerid}>{data.name}</option>
        })
      }
    </select>
      <input placeholder='Enter Remark' type='text' name='remark' onChange={(e)=>setRemark(e.target.value)}></input>
      <input type='file' ref={pdf}></input>
      <button onClick={handleReportSubmission}>Submit</button>
      </form>
    </div>
    }
 {
 ( !view && data.length >0) &&  <div className='user-details-wrapper'>
  <table>
    <tbody>
      <tr>
          <th>S.No</th>
          <th>Submission At</th>
          <th>Faculty</th>
          <th>Schedule ID</th>
          <th>Remark</th>
          <th>View PDF</th>
      </tr>
        {data.map((user,index)=>{
          return(
            <tr key={index}>
            <td>{index+1}</td>
            <td>{user.submission_date}</td>
            <td>{user.faculty}</td>
            <td>{user.schedule_id}</td>
            <td>{user.remarks}</td>
            <td><button  onClick={handlePDFView}  data={user.schedule_id}> <AiFillFilePdf style={{color:"red" , fontSize:"30px"}} onClick={handlePDFView} data={user.schedule_id}/></button></td>
           </tr>
          )
        })}
        </tbody>
  </table>
  </div> 
 }
  {
       (data.length === 0 && !view) && 
        <div style={{ width: "100%", textAlign: "center", fontSize: "30px", marginTop: "200px" }}>No data to show</div>
      }
    </div>
  )
}
