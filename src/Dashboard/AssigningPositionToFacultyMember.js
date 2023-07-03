import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Alert, Button, CircularProgress } from "@mui/material";


export default function AssigningPositionToFacultyMember() {
  const [faculty, setFaculty] = useState([]);
  const [facultyPosition, setFacultyPosition] = useState("");
  const [viewPosition, setPosition] = useState([]);
  const [facId, setFacId] = useState("");
  const [view, setView] = useState(false);
  const [viewData, setViewData] = useState([]);
  const [responseCircular, setCircularResponse] = useState(false);
  const [emptyFieldAlert, setEmptyFieldAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [noDataToShow, setNodataToShow] = useState(false);
  const [createForm, setCreateFrom] = useState(true);
  const [input, setInput] = useState({
    facultyId: ""
  })
  const buttonRef = useRef();
  function handleInputs(e) {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput, [name]: value
    }));
  }

  function handlePositionAssigning() {
    if (facId !== "" && facultyPosition !== "" && input.facultyId !== "") {
      setCircularResponse(true);
      buttonRef.current.disabled = true;
      let userLocal = JSON.parse(localStorage.getItem("user"));
      const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/sauth/possition_assi";
      const data = {
        facultyId: facId,
        faculty_pos: facultyPosition,
        position_assi_id: input.facultyId,
        faculty_admin: userLocal.faculty
      };
      axios.post(url, data).then((res) => {
        getAssignedPosition();
        setCircularResponse(false);
        setSuccessAlert(true);
        buttonRef.current.disabled = false;
        setTimeout(() => {
          setSuccessAlert(false);
        }, 5000);
        document.getElementById("form").reset();
      }).catch((error) => {
        setCircularResponse(false);
        buttonRef.current.disabled = false;
        setErrorAlert(true);
        setTimeout(() => {
          setErrorAlert(false);
        }, 5000);
      });
    }
    else {
      setEmptyFieldAlert(true);
      setTimeout(() => {
        setEmptyFieldAlert(false);
      }, 5000);
    }
  }

  useEffect(() => {
    let userLocal = JSON.parse(localStorage.getItem("user"));
    const urlFaculty = `http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/admin/faculty_member_faculty/${userLocal.faculty}`;
    axios.get(urlFaculty).then((res) => {
      setFaculty(res.data.data);
    }).catch((error) => {
      
    });

    const positionUrl = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/sauth/send";
    axios.get(positionUrl).then((res) => {
      setPosition(res.data.position);
    }).catch((error) => {
     
    });

    getAssignedPosition();
    // eslint-disable-next-line
  }, []);

  function getAssignedPosition() {
    let userLocal = JSON.parse(localStorage.getItem("user"));
    const url = `http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/sauth/faculty_position/${userLocal.faculty}`;
    axios.get(url).then((res) => {
      setViewData(res.data.facultyPositions);
    }).catch((error) => {
      if(error.response.data.message === "No Record Exists!"){
        setNodataToShow(true);
      }
    })
  }


  function setFacultyMemberFun(e) {
    setFacId(e.target.options[e.target.selectedIndex].getAttribute("data"));
  }

  function viewForm() {
    setView(false);
    setCreateFrom(true);
  }
  function viewDataFun(){
    setView(true);
    setCreateFrom(false);
  }
  return (
    <>
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          {createForm && <Button onClick={viewDataFun} sx={{bgcolor:"#1b3058",color:"white"}} variant="contained">View</Button>}
          {view && <Button onClick={viewForm} sx={{bgcolor:"#1b3058",color:"white"}} variant="contained">Create</Button>}
        </div>
        {
        (view && !noDataToShow) &&  <div className='user-details-wrapper'>
          <table>
            <tr>
              <th>S.No</th>
              <th>Faculty Member</th>
              <th>Faculty Position</th>
              <th>Faculty ID</th>
            </tr>
            {
              viewData.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.first_name} {data.middle_name} {data.last_name}</td>
                    <td>{data.faculty_pos}</td>
                    <td>{data.faculty_id}</td>
                  </tr>
                )
              })
            }

          </table>
        </div>}
        {
         ( noDataToShow && view) &&
          <div style={{ width: "100%", textAlign: "center", fontSize: "30px", marginTop: "200px" }}>No data to show</div>
        }
        {createForm  && <div className='course-creation-wrapper'>

          <h3 style={{ margin: "20px auto" }}>Assigning Positions to Faculty Members</h3>
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
          )}
          {successAlert && <Alert severity='success'>Position Assigned Successfully</Alert>}
          {emptyFieldAlert && <Alert severity='error'>All Fields Required</Alert>}
          {errorAlert && <Alert severity='error'>Something went wrong</Alert>}
          <form id='form' style={{ display: "flex", flexDirection: 'column' }}>
            <select onChange={setFacultyMemberFun}>
              <option>Select Faculty Member</option>
              {
                faculty.map((data, index) => {
                  return <option key={index} value={data.firstname} data={data.facultyid}>{data.firstname}</option>
                })
              }
            </select>
            <select onChange={(e) => setFacultyPosition(e.target.value)}>
              <option>Select Faculty Position</option>
              {
                viewPosition.map((data, index) => {
                  return <option value={data.faculty_pos} key={index} >{data.faculty_pos}</option>
                })
              }
            </select>
            <input type={"text"} placeholder={facultyPosition === "Head of Faculty" ? "Enter Faculty seniority id between 1 to 10" : facultyPosition === "Instructor" ? "Enter Faculty seniority id between 10 to 99" : facultyPosition === "Faculty" ? "Enter Faculty seniority id between 100 to 999" : ""} onChange={handleInputs} name="facultyId" />
            <Button value={"Submit"} onClick={handlePositionAssigning} ref={buttonRef} sx={{bgcolor:"#1b3058",color:"white"}} variant="contained">Submit</Button>
          </form>
        </div>}
      </div>
    </>
  )
}
