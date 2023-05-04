import React, { useEffect, useRef, useState } from 'react'
import Inputs from "../components/Inputs";

import axios from 'axios';
import { Alert } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
export default function CreationFacultyMember() {
  const [faculty , setFaculty] = useState([]);
  const [viewFrame , setViewFrame] = useState(false);
  const [facultyView , setFacultyView] = useState([]);
  const [successAlert, setSuccessAlert] = useState(false);
  const [failAlert, setFailAlert] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [userEmail , setUserEmail] = useState("");
  const [userStatus , setUserStatus] = useState("");

  // const [emptyFieldAlert, setEmptyFieldAlert] = useState(false);
  const [input, setInput] = useState({
    f_name:"",
    l_name:"",
    m_name:"",
    email:"",
    phone:"",
    education:"",
    designation:"",
  });
  const [gender , setGender] = useState("");
  const [facultyInput , setFacultyInput] = useState("");
  const [login , setLogin] = useState("");
  const [user,setUser] = useState("");
  const dobRef = useRef();

  function handleInputs(e){
    const {name,value} = e.target;
    setInput((prevInput)=>({
      ...prevInput , [name]:value
    }));
  }

  useEffect(()=>{
    const url = "https://nigst.onrender.com/admin/faculty_show";
    axios.get(url).then((res)=>{
      setFaculty(res.data)
    }).catch((error)=>{
      console.log(error)
    })
   facultyViewFun();
   let user = JSON.parse(localStorage.getItem("user"));
   setUser(user)
  },[])

  function facultyViewFun(){
    const urlView = "https://nigst.onrender.com/sauth/faculty_view"
    axios.get(urlView).then((res)=>{
      console.log(res)
      setFacultyView(res.data.data.reverse())
    }).catch((error)=>{
      console.log(error);
    })
  }

  function handleCreationMembers(){
    const url = "https://nigst.onrender.com/sauth/create";
    const data = {
      first_name:`${input.f_name}`,
      middle_name:`${input.m_name}`,
      last_name:`${input.l_name}`,
      dob:`${dobRef.current.value}`,
      phone:`${input.phone}`,
      email:`${input.email}`,
      gender:`${gender}`,
      education:`${input.education}`,
      designation:`${input.designation}`,
      loginAccess:`${login}`,
      faculty:`${facultyInput}`,
    }
    axios.post(url,data).then((res)=>{
      facultyViewFun()
      setSuccessAlert(true)
      setTimeout(() => {
        setSuccessAlert(false)
      }, 5000);
    }).catch((error)=>{
      setFailAlert(true)
      setTimeout(() => {
        setFailAlert(false)
      }, 5000);
      console.log(error);
    })
  }

function viewData(){
  setViewFrame(!viewFrame);
}

function setFalseLoginAccess(e){
  const url = "https://nigst.onrender.com/admin/access";
  const data = {
      email:`${userEmail}`,
      access:"false"
  }
  axios.patch(url,data).then((res)=>{
    facultyViewFun();
  }).catch((error)=>{
    console.log(error)
  })
}

function setTrueLoginAccess(e){
  const url = "https://nigst.onrender.com/admin/access";
  const data = {
      email:`${userEmail}`,
      access:"true"
  }
  axios.patch(url,data).then((res)=>{
    facultyViewFun();
  }).catch((error)=>{
    console.log(error)
  })
}

function statusChange(){
  setOpen(false)
  userStatus === "green" ? setFalseLoginAccess() : setTrueLoginAccess() 
}
  const handleClickOpen = (e) => {
    setOpen(true);
    setUserEmail(e.target.getAttribute("data"));
    setUserStatus(e.target.style.color);
  };

function closeModal(){
  setOpen(false)
}

  return (
    <>
    <div style={{position:"absolute" , top:"120px" , right:"20px"}}>
      {
        viewFrame ? <button onClick={viewData}>Create Faculty</button> : <button onClick={viewData}>View Created Faculty</button>
      }
    </div>
  {
    viewFrame ?   <div className='user-details-wrapper'>
    <table>
      <tbody>
        <tr>
            <th>S.No</th>
            <th>Faculty Id.</th>
            <th>Created At</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Faculty</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Edu.</th>
            <th>Admin Verification</th>
        </tr>
        {
          facultyView.map((data,index)=>{
            return data.faculty===user.faculty ? 
             (
              <tr>
                <td>{index+1}</td>
                <td>{data.faculty_id}</td>
                <td>{data.created_on_date_time}</td>
                <td>{data.first_name}</td>
                <td>{data.middle_name}</td>
                <td>{data.last_name}</td>
                <td>{data.phone}</td>
                <td>{data.email}</td>
                <td>{data.faculty}</td>
                <td>{data.designation}</td>
                <td>{data.gender}</td>
                <td>{data.education}</td>
                <td>{data.admin_verified ? <button data={data.email} onClick={handleClickOpen} style={{backgroundColor:"green" , color:"green" , borderRadius:"50%" , height:"40px" , width:"40px"}} ></button> : <button  data={data.email} onClick={handleClickOpen} style={{ height:"40px" , width:"40px" , backgroundColor:"red" , color:"red" , borderRadius:"50%"}}></button>}</td>
              </tr>
            ) : ""
          })
        }
          </tbody>
    </table>
    </div>  : ""
  }
    {
      !viewFrame ? <div className="faculty-member-creation-wrapper">  
      <h3>Creation Faculty Member</h3>
      {successAlert ? <Alert severity="success" style={{marginBottom:"10px"}}>Faculty Created Successfully</Alert> : ""}
        {failAlert ? <Alert severity="error" style={{marginBottom:"10px"}}>Something Went Wrong Please try again later</Alert> : ""}
        {/* {emptyFieldAlert ? <Alert severity="error" style={{marginBottom:"10px"}}>All fields required</Alert> : ""} */}
      <Inputs type={"text"} placeholder={"First Name"} name={"f_name"} fun={handleInputs}/>
      <Inputs type={"text"} placeholder={"Middle Name"} name={"m_name"} fun={handleInputs}/>
      <Inputs type={"text"} placeholder={"Last name"} name={"l_name"} fun={handleInputs}/>
      <select onChange={(e)=>(setFacultyInput(e.target.value))}>
        <option >Select Faculty</option>
        {
          faculty.map((data)=>{
            return <option key={data.id} value={data.name}>{data.name}</option>
          })
        }
      </select>
      <input type='date' ref={dobRef}></input>
      <select onChange={(e)=>(setGender(e.target.value))}>
        <option>Select Gender</option>
        <option value={"male"}>Male</option>
        <option value={"female"}>Female</option>
        <option value={"other"}>Other</option>
      </select>
      <Inputs type={"email"} placeholder={"Enter email"} name={"email"} fun={handleInputs}/>
      <Inputs type={"tel"} placeholder={"Enter Phone"} name={"phone"} fun={handleInputs}/>
      <input type='text' placeholder='Enter Highest Qualification' name={"education"} onChange={handleInputs}></input>
      <input type='text' placeholder='Enter Designation' name={"designation"} onChange={handleInputs}></input>
      {/* <Inputs type={"password"} placeholder={"Enter Password"} name={"password"} fun={handleInputs}/> */}
      <div style={{display:"flex" , alignItems:"center"}}>
      <input type="radio" value="true" name="admin verification" onChange={(e)=>(setLogin(e.target.value))}/> <label>Login Access</label>
      <input type="radio" value="false" name="admin verification" onChange={(e)=>(setLogin(e.target.value))}/> <label>No Login Access</label>
      </div>
      <button  onClick={handleCreationMembers}>Submit</button>
    </div> : ""
    }
    <Dialog
        open={open}
        onClose={closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do You want to change the login status of faculty
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Disagree</Button>
          <Button onClick={statusChange}  autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog> 
    </>
  )
}

