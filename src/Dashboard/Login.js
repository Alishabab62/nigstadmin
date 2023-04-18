import React, { useState } from 'react'
import Inputs from '../components/Inputs';
import Button from '../components/Button';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';



export default function Login() {
  const [inputs, setInputs] = useState({email:"" , password:""})
  function handleInputs(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({  
      ...prevInputs,
      [name]: value,
    }));
  }
  function handleLogin() {
    const url = "https://nigst.onrender.com/sadmin/login";
    const data = {
      username: `${inputs.email}`,
      password: `${inputs.password}`
    }
    console.log(data)
    axios.post(url, data).then((res) => {
      console.log(res.data.type)
      // if(res.data.type === "NIGST Admin"){
      //   window.location.href = "/admin";
      // }
      // else if(res.data.type === "Faculty Admin"){
      //   window.location.href = "/facultyadmin";
      // }
    }).catch((error) => {
      console.log(error)
    })
    
  }
  return (
    <div className="login-wrapper ">
      <h3>Login</h3>
      <Inputs type={"email"} placeholder={"Enter email"} name={"email"} fun={handleInputs} />
      <Inputs type={"password"} placeholder={"Enter Password"} name={"password"} fun={handleInputs} />
      <select>
        <option>Select</option>
        <option>NIGST Admin</option>
        <option>Faculty Admin</option>
        <option>Faculty Member</option>
      </select>
      <Button value={"Login"} fun={handleLogin} />
    </div>
  )
}

