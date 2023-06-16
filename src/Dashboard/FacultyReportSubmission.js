import { Alert, CircularProgress } from '@mui/material';
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
const [responseCircular, setCircularResponse] = useState(false);
const pdf = useRef();




function handleReportSubmission(e){
  e.preventDefault();
  setCircularResponse(true);
  if(remark && scheduleId && pdf.current){
    
    const user = JSON.parse(localStorage.getItem("user"));
    const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/sauth/report/submit";
    const formData = new FormData();
    formData.append("facultyId",user.id);
    formData.append("scheduleId",scheduleId);
    formData.append("remarks",remark);
    formData.append("pdf",pdf.current.files[0]);
    formData.append("faculty",user.faculty);
    console.log(formData);
    axios.post(url,formData).then((res)=>{
      setCircularResponse(false);
      document.getElementById("form").reset();
      setSuccessAlert(true);
      setTimeout(() => {
        setSuccessAlert(false)
      }, 5000);
    }).catch((error)=>{
      setCircularResponse(false);
      if(error.response.data.message === "Report Already Exists!"){
        setFailAlert(true);
      setTimeout(() => {
        setFailAlert(false);
      }, 5000);
      return;
      }
      
    })
  }
  else{
    setEmptyFieldAlert(true);
    setTimeout(() => {
      setEmptyFieldAlert(false);
    }, 5000);
  }
}

function handlePDFView(data){
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
      setData(res.data.newReports)
  }).catch((error)=>{
    console.log(error)
  })
 },[])

 function viewAllCourse(){
  const user = JSON.parse(localStorage.getItem("user"));
  const url = `http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/sauth/send_course/${user.faculty}`;
  axios.get(url).then((res)=>{
    setViewCompletedCourse(res.data.courses);
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
      {responseCircular && (
          <div
            style={{
              width: "29%",
              height: "30%",
              left: "33%",
              backgroundColor: "rgb(211,211,211)",
              borderRadius: "10px",
              top: "125px",
              position: "absolute",
              padding: "10px 20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress style={{ height: "50px", width: "50px" }} />
          </div>
        ) }
    <h3>Course Report Submission</h3>
    {successAlert ? <Alert severity="success" style={{marginBottom:"10px"}}>Tender Create successfully</Alert> : ""}
    {failAlert ? <Alert severity="error" style={{marginBottom:"10px"}}>Report Already Exist</Alert> : ""}
    {emptyFieldAlert ? <Alert severity="error" style={{marginBottom:"10px"}}>All fields required</Alert> : ""}
    <form id='id'>
    <select onChange={(e)=>setScheduleId(e.target.value)}>
      <option>Select Course</option>
      {
        viewCompletedCourse.map((data,index)=>{
          return <option key={index} value={data.schedulerid}>{data.name} (Batch - {data.batch})</option>
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
            <th>Course Officer</th>
            <th>Course Code</th>
            <th>Course No.</th>
            <th>Faculty</th>
            <th>Schedule ID</th>
            <th>Remark</th>
            <th>View PDF</th>
      </tr>
        {data.map((user,index)=>{
          return(
            <tr key={index}>
            <td>{index + 1}</td>
            <td>{user.submissiondate}</td>
            <td>{user.report_submitter}</td>
            <td>{user.course_code}</td>
            <td>{user.course_no}</td>
            <td>{user.faculty}</td>
            <td>{user.schedule_id}</td>
            <td>{user.remarks}</td>
            <td> <AiFillFilePdf onClick={() => handlePDFView(user.schedule_id)} style={{ color: "red", fontSize: "30px" }} /></td>
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
