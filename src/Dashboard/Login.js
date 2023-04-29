import React, { useState } from 'react'
import Inputs from '../components/Inputs';
import Button from '../components/Button';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

// import { json } from 'react-router-dom';



export default function Login() {
  const [inputs, setInputs] = useState({email:"" , password:""})
  const [loginType , setLoginType] = useState("");
  function handleInputs(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({  
      ...prevInputs,
      [name]: value,
    }));
  }

  function handleLoginAdmin() {
    console.log("hello admin")
    const url = "https://nigst.onrender.com/sadmin/login";
    const data = {
      username: `${inputs.email}`,
      password: `${inputs.password}`
    }
    axios.post(url, data).then((res) => {
      console.log(res.data)
      localStorage.setItem("user" , JSON.stringify(res.data))
      if(res.data.type === "NIGST Admin"){
        window.location.hash = "/admin";
      }
      else if(res.data.type === "Faculty Admin"){
        window.location.hash = "/facultyadmin";
      }
    }).catch((error) => {
      console.log(error)
    }) 
  }


  function handleLoginFaculty() {
    console.log("hello faculty")
    const url = "https://nigst.onrender.com/sauth/login";
    const data = {
      email: `${inputs.email}`,
      password: `${inputs.password}`
    }
    axios.post(url, data).then((res) => {
      console.log(res.data)
      localStorage.setItem("user" , JSON.stringify(res.data))
    window.location.hash = "/faculty";
    }).catch((error) => {
      console.log(error)
    }) 
  }

  function handleLogin(){
    if(loginType === "admin"){
      handleLoginAdmin()
    }
    else{
      handleLoginFaculty()
    }
  }

  return (
    <div className="login-wrapper ">
      <h3>Login</h3>
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
      <Button value={"Login"} fun={handleLogin} />
    </div>
  )
}

