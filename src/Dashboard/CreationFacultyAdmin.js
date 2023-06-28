import React, {useState } from "react";
import Inputs from "../components/Inputs";
import axios from "axios";
import { Button, CircularProgress } from "@mui/material";

export default function CreationFacultyAdmin() {
 
  const [responseCircular, setCircularResponse] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    role: "",
    faculty:"",
    email:"",
    phone:"",
    password:""
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
    setCircularResponse(true);
    const data = {
      name: `${inputs.name}`,
      role: `${inputs.role}`,
      faculty: `${inputs.faculty}`,
      email: `${inputs.email}`,
      phone: `${inputs.phone}`,
      password: `${inputs.password}`,
    };
    console.log(
      data
    );
    const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/dep/d";
    axios
      .post(url, data)
      .then((res) => {
        setCircularResponse(false);
        console.log(res);
      })
      .catch((error) => {
        setCircularResponse(false);
        console.log(error);
      });
  }
  return (
    <div className="department-creation-wrapper">
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
      <h3>Creation Faculty Admin</h3>
      <Inputs
        type={"text"}
        placeholder={"Name"}
        name={"name"}
        fun={handleInputs}
      />
      <Inputs
        type={"text"}
        placeholder={"Role"}
        name={"role"}
        fun={handleInputs}
      />
       <Inputs
        type={"text"}
        placeholder={"Faculty"}
        name={"faculty"}
        fun={handleInputs}
      />
      <Inputs
        type={"email"}
        placeholder={"Email"}
        name={"email"}
        fun={handleInputs}
      />
      <Inputs
        type={"tel"}
        placeholder={"Phone"}
        name={"phone"}
        fun={handleInputs}
      />
      <Inputs
        type={"password"}
        placeholder={"Password"}
        name={"password"}
        fun={handleInputs}
      />
      <Button value={"Submit"} onClick={handleFacultyCreation}  sx={{bgcolor:"#1b3058",color:"white"}} variant="contained">Submit</Button>
    </div>
  );
}
