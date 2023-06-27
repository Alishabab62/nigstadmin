import { Alert, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'

export default function ResetPassword() {
  const [successAlert, setSuccessAlert] = useState(false);
  const [passwordMatchAlert, setPasswordMatchAlert] = useState(false);
  const [fieldsAlert, setFieldsAlert] = useState(false);
  const [responseCircular, setCircularResponse] = useState(false);
  const [input , setInput] = useState({
    password:"",
    CPassword:"",
    confirmPassword:""
  });
  function handleInputs(e){
    const {name,value} = e.target;
    setInput((prevInput)=>({
      ...prevInput , [name]:value
    }))
  }

  function handleResetPassword(){
    setCircularResponse(true);
    if(input.password !== input.CPassword){
      setCircularResponse(false);
      setPasswordMatchAlert(true);
      setTimeout(() => {
        setPasswordMatchAlert(false);
      }, 5000);
      return;
    }
    if(!input.password || !input.CPassword || !input.password){
      setCircularResponse(false)
      setFieldsAlert(true);
      setTimeout(() => {
        setFieldsAlert(false);
      }, 5000);
      return;
    }
    const user = JSON.parse(localStorage.getItem("user"));
    const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/sauth/change";
    const data = {
      facultyId:`${user.id}`,
      oldPassword:`${input.password}`,
      newPassword:`${input.CPassword}`
    }
    axios.patch(url,data).then((res)=>{
      setCircularResponse(false);
      setSuccessAlert(true);
      setTimeout(() => {
        setSuccessAlert(false);
      }, 5000);
    }).catch((error)=>{
      setCircularResponse(false);
      console.log(error);
    })
  }
  return (
    <div className='department-creation-wrapper'>
       <h3>Reset Password</h3>
       {responseCircular && (
          <div
            style={{
              width: "29%",
              height: "30%",
              left: "33%",
              backgroundColor: "rgb(211,211,211)",
              borderRadius: "10px",
              top: "120px",
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
       {successAlert ? <Alert
        severity="success" style={{marginBottom:"10px"}}>Password Change Successfully </Alert> : ""}
      {passwordMatchAlert ? <Alert severity="error" style={{marginBottom:"10px"}}>Password are not same </Alert> : ""}
      {fieldsAlert ? <Alert severity="error" style={{marginBottom:"10px"}}>All fields required</Alert> : ""}
      <input type="password" placeholder='Old Password'  name="password" onChange={handleInputs}></input>
      <input type="password" placeholder='New Password' name="CPassword" onChange={handleInputs}></input>
      <input type="text" placeholder='Confirm Password'  name="confirmPassword" onChange={handleInputs}></input>
      <Button onClick={handleResetPassword}>Submit</Button>
    </div>
  )
}
