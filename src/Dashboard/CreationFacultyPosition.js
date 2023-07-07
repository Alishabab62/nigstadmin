import React, {  useEffect, useState } from "react";
import Inputs from "../components/Inputs";
import axios from "axios";
import { Alert, Button, CircularProgress } from "@mui/material";

export default function CreationFacultyPosition() {
 
  const [responseCircular, setCircularResponse] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [failAlert, setFailAlert] = useState(false);
  const [emptyFieldAlert, setEmptyFieldAlert] = useState(false);
  const [viewPosition , setViewPosition] = useState([]);
  const [inputs, setInputs] = useState({
    facultyPosition: "",
    description: "",
  });


  function handleInputs(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }

  function handleFacultyCreation() {
    if(inputs.facultyPosition === "" || inputs.description === ""){
      setEmptyFieldAlert(true);
      setTimeout(() => {
        setEmptyFieldAlert(false)
      }, 5000);
      return;
    }
   else{
    setCircularResponse(true);
    const data = {
      faculty_pos: `${inputs.facultyPosition}`,
      description: `${inputs.description}`,
    };
    const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/sauth/position"
    axios.post(url, data).then((res) => {
        setCircularResponse(false);
        setSuccessAlert(true);
        facultyPositionViewFun()
        setTimeout(() => {
          setSuccessAlert(false)
        }, 5000);
      }).catch((error) => {
        setCircularResponse(false);
        if(error.response.data.message == "Faculty position already exists."){
          setFailAlert(true);
        }
        setInterval(() => {
          setFailAlert(false);
        }, 5000);
      });
   }
  }
  useEffect(()=>{
   facultyPositionViewFun()
  },[]);
  function facultyPositionViewFun(){
    const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/sauth/view";
    axios.get(url).then((res)=>{
      setViewPosition(res.data.data.reverse());
    }).catch((error)=>{
      console.log(error);
    })
  }
  return (
    <div style={{display:"flex" , justifyContent:"space-evenly"}}>
    <div className="department-creation-wrapper-position">
        {successAlert ? <Alert severity="success">Faculty Position Create successfully</Alert> : ""}
        {failAlert ? <Alert severity="error">Faculty Position Already Exists</Alert> : ""}
        {emptyFieldAlert ? <Alert severity="error">All fields required</Alert> : ""}
      {responseCircular ? (
        <div
          style={{
            width: "32%",
            height: "35%",
            left: "32%",
            backgroundColor: "rgb(211,211,211)",
            borderRadius: "10px",
            top: "70px",
            position: "absolute",
            padding: "10px 20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress style={{ height: "50px", width: "50px" }} />
        </div>
      ) : (
        ""
      )}
      <h3>Create New Faculty Position</h3>
      <Inputs
        type={"text"}
        placeholder={"Faculty Position"}
        name={"facultyPosition"}
        fun={handleInputs}
      />
      <Inputs
        type={"text"}
        placeholder={"Description"}
        name={"description"}
        fun={handleInputs}
      />
      <Button value={"Submit"} onClick={handleFacultyCreation}  sx={{bgcolor:"#1b3058",color:"white"}} variant="contained" >Submit</Button>
    </div>
    <div style={{width:"600px",maxWidth:"600" , overflowY:"scroll" , marginTop:"80px"}}>
    <table className="faculty-position-table">
    <tr>
                    <th colSpan="13" style={{ textAlign: "center", backgroundColor: "#ffcb00" }}>FACULTIES POSITIONS</th>
                  </tr>
      <tr style={{ backgroundColor: "#ffcb00" }}>
        <th>S.No</th>
        <th>Position Id.</th>
        <th>Position</th>
        <th>Description</th>
      </tr>
      {
        viewPosition.map((data,index)=>{
          return(
            <tr key={index}>
            <td>{index+1}</td>
            <td>{data.position_id}</td>
            <td>{data.faculty_pos}</td>
            <td>{data.description}</td>
          </tr>
          )
        })
      }
    </table>
    </div>
    </div>
  );
}
