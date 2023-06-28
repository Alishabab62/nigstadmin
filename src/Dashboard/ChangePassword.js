import { Alert, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'

export default function ChangePassword() {
  const [successAlert, setSuccessAlert] = useState(false);
  const [passwordMatchAlert, setPasswordMatchAlert] = useState(false);
  const [fieldsAlert, setFieldsAlert] = useState(false);
  const [responseCircular, setCircularResponse] = useState(false);

  const [input , setInput] = useState({
    password:"",
    CPassword:""
  });

  function handleInputs(e){
    const {name , value} = e.target;
    setInput((prevInput)=>({
      ...prevInput , [name]:value
    }));
  }

  function changePassword(){
    setCircularResponse(true);
    if(input.password !== input.CPassword){
      setCircularResponse(false);
      setPasswordMatchAlert(true);
      setTimeout(() => {
        setPasswordMatchAlert(false);
      }, 5000);
      return;
    }
    if(!input.password || !input.CPassword){
      setCircularResponse(false)
      setFieldsAlert(true);
      setTimeout(() => {
        setFieldsAlert(false);
      }, 5000);
      return;
    }
    let token = window.location.href.split("/")[5];
    const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/sauth/reset";
    const data ={
      password:`${input.password}`,
      resetToken:`${token}`
    }
    axios.patch(url,data).then((res)=>{
      setCircularResponse(false);
      setSuccessAlert(true);
      setTimeout(() => {
        setSuccessAlert(false);
      }, 5000);
      console.log(res)
    }).catch((error)=>{
      setCircularResponse(false);
      console.log(error);
    })
  }
  return (
    <div className='department-creation-wrapper'>
       {responseCircular && (
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
        ) }
      <h3>Change Password</h3>
      {successAlert ? <Alert severity="success" style={{marginBottom:"10px"}}>Password Change Successfully </Alert> : ""}
      {passwordMatchAlert ? <Alert severity="error" style={{marginBottom:"10px"}}>Password are not same </Alert> : ""}
      {fieldsAlert ? <Alert severity="error" style={{marginBottom:"10px"}}>All fields required</Alert> : ""}
      <input type="password" placeholder='Enter Password'  name="password" onChange={handleInputs} value={input.password}></input>
      <input type="password" placeholder='Confirm Password' name="CPassword" onChange={handleInputs} value={input.CPassword}></input>
      <Button onClick={changePassword} sx={{bgcolor:"#1b3058",color:"white"}} variant="contained">Submit</Button>
    </div>
  )
}
