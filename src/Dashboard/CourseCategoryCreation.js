import React, {  useState } from "react";
import Inputs from "../components/Inputs";
import Button from "../components/Button";
import axios from "axios";
import { CircularProgress } from "@mui/material";

export default function CourseCategoryCreation() {
 
  const [responseCircular, setCircularResponse] = useState(false);
  const [inputs, setInputs] = useState({
    courseCategory: "",
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
    setCircularResponse(true);
    const data = {
      courseCategory: `${inputs.courseCategory}`,
      description: `${inputs.description}`,
    };
    console.log(
      inputs.courseCategory,
      inputs.description,
    );
    const url = "https://nigst.onrender.com/dep/d";
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
      <h3>Course Category Creation</h3>
      <Inputs
        type={"text"}
        placeholder={"Course Category"}
        name={"courseCategory"}
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
  );
}
