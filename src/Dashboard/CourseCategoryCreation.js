import React, {  useState } from "react";
import Inputs from "../components/Inputs";
import Button from "../components/Button";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import "../CSS/app.css"
export default function CourseCategoryCreation() {
 
  const [responseCircular, setCircularResponse] = useState(false);
  const [filter , setFilter] = useState(false);
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
  function handleFilter(){
    setFilter(true)
  }
  function handleCreationForm(){
    setFilter(false)
  }
  return (
    <>
    {filter ? <div className='user-details-wrapper'>
        <table>
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
        </div> : "" }
    <div style={{textAlign:"center" , marginTop:"50px"}} className="department-view-btn-wrapper">
      <Button value={"View"} fun={handleFilter}/>
      <Button value={"Create"} fun={handleCreationForm}/>
      </div>
    {!filter ? <div className="department-creation-wrapper">
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
    </div> : ""}
    </>
  );
}
