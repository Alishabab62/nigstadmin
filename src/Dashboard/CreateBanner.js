import { Alert, Button, CircularProgress} from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'

export default function CreateBanner() {
    const [responseCircular, setCircularResponse] = useState(false);
    const [errorAlert,setErrorAlert] = useState(false);
    const [successAlert,setSuccessAlert] = useState(false);
    const [url,setURL] = useState("");
    const [alt,setAlt] = useState("");
    const [image,setImage] = useState("");

    function handleSubmit(e){
        e.preventDefault();
        setCircularResponse(true);
        const url1 = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/create_banner";
        const formData = new FormData();
        formData.append("url",url);
        formData.append("alt",alt);
        formData.append("image",image);
        axios.post(url1,formData).then((res)=>{
            document.getElementById('form').reset();
           setCircularResponse(false);
           setSuccessAlert(true);
           setTimeout(() => {
            setSuccessAlert(false)
           }, 5000);
        }).catch((error)=>{
            setCircularResponse(false)
            setErrorAlert(true);
            setTimeout(() => {
             setErrorAlert(false)
            }, 5000);
        })
    }
  return (
    <>
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
        <h3>Create Banner</h3>
        {successAlert && <Alert severity='success' style={{marginBottom:"20px"}}>Created Successfully</Alert> }
        {errorAlert && <Alert severity='error' style={{marginBottom:"20px"}}>Error Not Defined</Alert> }
        <form id='form' style={{display:"flex",flexDirection:"column"}}>
        <input placeholder='Enter URL' type='text' onChange={(e)=>setURL(e.target.value)}/>
        <input placeholder='Enter alt text' type='text' onChange={(e)=>setAlt(e.target.value)}/>
        <input type='file' onChange={(e)=>setImage(e.target.files[0])}/>
        <Button sx={{bgcolor:"#1b3058",color:"white"}} variant="contained" onClick={handleSubmit}>Submit</Button>
        </form>
    </div>
    </>
  )
}
