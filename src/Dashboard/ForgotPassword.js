import { Alert, Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'

export default function ForgotPassword() {
    const [successAlert, setSuccessAlert] = useState(false);
    const [failAlert, setFailAlert] = useState(false);
    const [emptyFieldAlert, setEmptyFieldAlert] = useState(false);
    const [userNotFound , setUserNotFound] = useState(false)
    const [input , setInput] = useState({
        email:""
    })
    function handleInputs(e){
        const { name , value} = e.target;
        setInput((prevInput)=>({
            ...prevInput , [name]:value
        }))
    }
    function handleForgotPassword(){
        if(input.email !== ""){
            const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/sauth/forget";
            const data = {
                email:`${input.email}`
            }
            axios.post(url,data).then((res)=>{
                console.log(res)
                if(res.data.message === "User not found!."){
                    setUserNotFound(true)
                    setTimeout(() => {
                        setUserNotFound(false)
                    }, 5000);
                }
                setSuccessAlert(true)
                setInput({
                    email:""
                })
                setTimeout(() => {
                    setSuccessAlert(false)
                }, 5000);
            }).catch((error)=>{
              console.log(error)
                setFailAlert(true)
                setTimeout(() => {
                    setFailAlert(false)
                }, 5000);
            })
        }
        else{
            setEmptyFieldAlert(true)
            setTimeout(() => {
                setEmptyFieldAlert(false)
            }, 5000);
        }
        
    }
  return (
    <div className='department-creation-wrapper'>
        <h3>Forgot Password</h3>
        {successAlert ? <Alert severity="success" style={{marginBottom:"10px"}}>Mail Sent Successfully</Alert> : ""}
        {failAlert ? <Alert severity="error" style={{marginBottom:"10px"}}>Something Went Wrong Please try again later</Alert> : ""}
        {emptyFieldAlert ? <Alert severity="error" style={{marginBottom:"10px"}}>All fields required</Alert> : ""}
        {userNotFound ? <Alert severity="error" style={{marginBottom:"10px"}}>User Not Found</Alert> : ""}
      <input type='email' placeholder='Enter Email' name='email' onChange={handleInputs}></input>
      <Button onClick={handleForgotPassword}  sx={{bgcolor:"#1b3058",color:"white"}} variant="contained">Submit</Button>
    </div>
  )
}
