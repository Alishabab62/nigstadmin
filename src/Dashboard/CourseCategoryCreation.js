import React, {  useState } from "react";
import Inputs from "../components/Inputs";
import Button from "../components/Button";
import axios from "axios";
import { Alert, CircularProgress } from "@mui/material";
import "../CSS/app.css"
export default function CourseCategoryCreation() {
 
  const [responseCircular, setCircularResponse] = useState(false);
  const [filter , setFilter] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [failAlert, setFailAlert] = useState(false);
  const [emptyFieldAlert, setEmptyFieldAlert] = useState(false);
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
    if(inputs.courseCategory !== "" && inputs.description !== ""){
      setCircularResponse(true);
    const data = {
      course_category_name: `${inputs.courseCategory}`,
      description: `${inputs.description}`,
    };
    console.log(
      inputs.courseCategory,
      inputs.description,
    );
    const url = "https://nigst.onrender.com/category/create";
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
        setTimeout(() => {
          setFailAlert(false)
        }, 5000);
        console.log(error);
      });
    }
    else{
      setEmptyFieldAlert(true);
      setTimeout(()=>{
      setEmptyFieldAlert(false);
      },5000)
    }
  }

  // function handleFilter(){
  //   setFilter(true)
  // }
  // function handleCreationForm(){
  //   setFilter(false)
  // }
  return (
    <div style={{display:"flex", justifyContent:"space-evenly"}}>
       <div className="department-creation-wrapper-category">
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
      <h3>Create new Course Category</h3>
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
    <div className='user-details-wrapper-category'>
        <table style={{marginTop:"80px"}}>
            <tr>
                <th>S.Id</th>
                <th>Organization Name</th>
                <th>Organization Type</th>
                <th>Category of Organization</th>
            </tr>
            <tr>
                <td>101</td>
                <td>Survey of India</td>
                <td>Departmental</td>
                <td>Department</td>
            </tr>
            <tr>
                <td>102</td>
                <td>Survey of India</td>
                <td>Departmental</td>
                <td>Department</td>
            </tr>
        </table>
        </div> 
    {/* <div style={{textAlign:"center" , marginTop:"50px"}} className="department-view-btn-wrapper">
      <Button value={"View"} fun={handleFilter}/>
      <Button value={"Create"} fun={handleCreationForm}/>
      </div> */}
   
    </div>
  );
}
