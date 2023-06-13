import React, { useRef, useState } from 'react'
import Inputs from '../components/Inputs';
import {  CircularProgress,Alert } from "@mui/material";
import axios from 'axios';
import { Link } from 'react-router-dom';





export default function Login() {
  const [responseCircular, setCircularResponse] = useState(false);
  const [inputs, setInputs] = useState({email:"" , password:""})
  const [loginType , setLoginType] = useState("");
  const [emptyFieldAlert,setEmptyFieldAlert] = useState(false);
  const [errorAlert,setErrorAlert] = useState(false);
  const [wrongAlert,setWrongAlert] = useState(false);
  const [userNotAlert,setUserNotAlert] = useState(false);
  const buttonRef = useRef();


  function handleInputs(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({  
      ...prevInputs,
      [name]: value,
    }));
  }

  function handleLoginAdmin(e) {
    e.preventDefault();
    setCircularResponse(true);
    console.log(loginType)
    const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/sadmin/login";
    const data = {
      username: `${inputs.email}`,
      password: `${inputs.password}`
    }
    axios.post(url, data).then((res) => {
      setCircularResponse(false);
      localStorage.setItem("user" , JSON.stringify(res.data))
      if(res.data.type === "NIGST Admin"){
        window.location.hash = "/admin";
      }
      else if(res.data.type === "Faculty Admin"){
        window.location.hash = "/facultyadmin";
      }
    }).catch((error) => {
      setCircularResponse(false);
      if(error.response.data.message === "Wrong password."){
        setWrongAlert(true);
        setTimeout(() => {
          setWrongAlert(false);
        }, 5000);
        buttonRef.current.disabled = false;
        return;
      }
      if(error.response.data.message === "User Not Exists."){
        setUserNotAlert(true);
        setTimeout(() => {
          setUserNotAlert(false);
        }, 5000);
        buttonRef.current.disabled = false;
        return;
      }
      setErrorAlert(true);
      setTimeout(() => {
        setErrorAlert(false);
      }, 5000);
      buttonRef.current.disabled = false;
    }) 
  }


  function handleLoginFaculty(e) {
    setCircularResponse(true);
    e.preventDefault();
    const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/sauth/login";
    const data = {
      email: `${inputs.email}`,
      password: `${inputs.password}`
    }
    axios.post(url, data).then((res) => {
      setCircularResponse(false);
      localStorage.setItem("user" , JSON.stringify(res.data))
      window.location.hash = "/faculty";
    }).catch((error) => {
      setCircularResponse(false);
      if(error.response.data.message === "Wrong password."){
        setWrongAlert(true);
        setTimeout(() => {
          setWrongAlert(false);
        }, 5000);
        buttonRef.current.disabled = false;
        return;
      }
      if(error.response.data.message === "User Not Exists."){
        setUserNotAlert(true);
        setTimeout(() => {
          setUserNotAlert(false);
        }, 5000);
        buttonRef.current.disabled = false;
        return;
      }
      setErrorAlert(true);
      setTimeout(() => {
        setErrorAlert(false);
      }, 5000);
      buttonRef.current.disabled = false;
    }) 
  }

  function handleLogin(e){
    if(loginType !== "" && inputs.email !== "" && inputs.password !== ""){
      buttonRef.current.disabled = true;
      if(loginType === "admin"){
        handleLoginAdmin(e)
      }
      else{
        handleLoginFaculty(e)
      }
    }
    else{
      setEmptyFieldAlert(true);
      setTimeout(() => {
        setEmptyFieldAlert(false);
      }, 5000);
    }
  }

  return (
    <div className="login-wrapper ">
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
      <h3>Login</h3>
      {emptyFieldAlert && <Alert severity='error' style={{marginBottom:"20px"}}>All fields required</Alert> }
      {wrongAlert && <Alert severity='error' style={{marginBottom:"20px"}}>Wrong Password</Alert> }
      {userNotAlert && <Alert severity='error' style={{marginBottom:"20px"}}>User Not Exists</Alert> }
      {errorAlert && <Alert severity='error' style={{marginBottom:"20px"}}>Something went wrong</Alert> }
      <Inputs type={"email"} placeholder={"Enter Username"} name={"email"} fun={handleInputs} />
      <Inputs type={"password"} placeholder={"Enter Password"} name={"password"} fun={handleInputs} />
      <select onChange={(e)=>setLoginType(e.target.value)}>
        <option>Select</option>
        <option value={"admin"}>Admin</option>
        <option value={"faculty"}>Faculty Member</option>
      </select>
      <div style={{width:"100%" , display:"flex" , justifyContent:"space-between"}}>
      <Link to='/forgot' style={{textDecoration:"none"}}>Forgot Password</Link><label>(Only for Faculty Members)</label>
      </div>
      <button value={"Login"} onClick={handleLogin} ref={buttonRef}>Login</button>
    </div>
  )
}

