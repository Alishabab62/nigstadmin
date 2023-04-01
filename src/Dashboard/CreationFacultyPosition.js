import React, {  useState } from "react";
import Inputs from "../components/Inputs";
import Button from "../components/Button";
import axios from "axios";
import { Alert, CircularProgress } from "@mui/material";

export default function CreationFacultyPosition() {
 
  const [responseCircular, setCircularResponse] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [failAlert, setFailAlert] = useState(false);
  const [emptyFieldAlert, setEmptyFieldAlert] = useState(false);
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
    console.log(inputs)
  }

  function handleFacultyCreation() {
    if(inputs.facultyPosition === "" && inputs.description === ""){
      setEmptyFieldAlert(true);
      setTimeout(() => {
        
      }, 5000);
      return;
    }
    setCircularResponse(true);
    const data = {
      faculty_pos: `${inputs.facultyPosition}`,
      description: `${inputs.description}`,
    };
    console.log(
     data
    );
    const url = "https://nigst.onrender.com/sauth/position";
    axios
      .post(url, data)
      .then((res) => {
        setCircularResponse(false);
        setSuccessAlert(true);
        setTimeout(() => {
          setSuccessAlert(false)
        }, 5000);
        console.log(res);
      })
      .catch((error) => {
        setCircularResponse(false);
        setFailAlert(true);
        setInterval(() => {
          setFailAlert(false);
        }, 5000);
        console.log(error);
      });
  }
  return (
    <>
    <div className="department-creation-wrapper">
    {successAlert ? <Alert severity="success">Department Create successfully</Alert> : ""}
        {failAlert ? <Alert severity="error">Something Went Wrong Please try again later</Alert> : ""}
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
      <Button value={"Submit"} fun={handleFacultyCreation} />
    </div>
    <h3 style={{textAlign:"center" , width:"100%" , marginTop:"30px"}}>View</h3>
    <table className="faculty-position-table">
      <tr>
        <th>Faculty Id.</th>
        <th>Position</th>
        <th>Description</th>
      </tr>
      <tr>
        <td>101</td>
        <td>HOD</td>
        <td>Head Of Department</td>
      </tr>
      <tr>
        <td>101</td>
        <td>HOD</td>
        <td>Head Of Department</td>
      </tr>
    </table>
    </>
  );
}
