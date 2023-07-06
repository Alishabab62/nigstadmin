import React, { useEffect, useRef, useState } from 'react'
import Inputs from "../components/Inputs";

import axios from 'axios';
import { Alert,CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function CreationFacultyMember() {
  const [viewFrame, setViewFrame] = useState(false);
  const [facultyView, setFacultyView] = useState([]);
  const [successAlert, setSuccessAlert] = useState(false);
  const [failAlert, setFailAlert] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const [responseCircular, setCircularResponse] = useState(false);
  const [emptyFieldAlert, setEmptyFieldAlert] = useState(false);
  const [invalidEmailPhone , setInvalidEmailPhone] = useState(false);
  const [input, setInput] = useState({
    f_name: "",
    l_name: "",
    m_name: "",
    email: "",
    phone: "",
    education: "",
    designation: "",
  });
  const [gender, setGender] = useState(null);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState("");
  const [emptyDataUI,setDataEmptyUI] = useState(true);
  const dobRef = useRef(null);
  const buttonRef = useRef();

  function handleInputs(e) {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput, [name]: value
    }));
  }

  useEffect(() => {
    facultyViewFun();
    let user = JSON.parse(localStorage.getItem("user"));
    setUser(user)
  }, [])

  function facultyViewFun() {
    let user = JSON.parse(localStorage.getItem("user"));
    const urlView = `http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/admin/faculty_member_faculty/${user.faculty}`
    axios.get(urlView).then((res) => {
      setFacultyView(res.data.data.reverse());
    }).catch((error) => {
      if(error.response.data.message === "Nothing to Show."){
        setDataEmptyUI(false);
      }
    })
  }


  function handleCreationMembers(e) {
    e.preventDefault();
    if((input.email && input.phone) && !input.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) && !input.phone.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)){
      setInvalidEmailPhone(true);
      setTimeout(() => {
        setInvalidEmailPhone(false);
      }, 5000);
      return;
    }
   else if(input.f_name !== "" && dobRef.current !== null && input.phone!== "" && input.email !== "" && gender !== null && input.education !== "" && input.designation !== "") {
      setCircularResponse(true);
      buttonRef.current.disabled = true;
      const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/sauth/create";
      const data = {
        first_name: `${input.f_name.charAt(0).toUpperCase() + input.f_name.slice(1)}`,
        middle_name: `${input.m_name.charAt(0).toUpperCase() + input.m_name.slice(1)}`,
        last_name: `${input.l_name.charAt(0).toUpperCase() + input.l_name.slice(1)}`,
        dob: `${dobRef.current.value}`,
        phone: `${input.phone}`,
        email: `${input.email}`,
        gender: `${gender}`,
        education: `${input.education}`,
        designation: `${input.designation}`,
        loginAccess: `${login}`,
        faculty: `${user.faculty}`,
      }
      axios.post(url, data).then((res) => {
        document.getElementById('form').reset();
        facultyViewFun();
        setSuccessAlert(true);
        setCircularResponse(false);
      buttonRef.current.disabled = false;
        setTimeout(() => {
          setSuccessAlert(false)
        }, 5000);
      }).catch((error) => {
        setCircularResponse(false);
        if(error.response.data.error === "Faculty already exists"){
          setFailAlert(true);
          setTimeout(() => {
            setFailAlert(false)
          }, 5000);
        }
        buttonRef.current.disabled = false;
      })
    }
    else{
      setEmptyFieldAlert(true);
      setTimeout(() => {
        setEmptyFieldAlert(false)
      }, 5000);
    }
   
  }

  function viewData() {
    setViewFrame(!viewFrame);
    facultyViewFun();
  }


  function setFalseLoginAccess(e) {

    const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/admin/access";
    const data = {
      email: `${userEmail}`,
      access: "false"
    }
    axios.patch(url, data).then((res) => {
      facultyViewFun();
    }).catch((error) => {
      console.log(error)
    })
  };


  function setTrueLoginAccess(e) {
    console.log("true")
    const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/admin/access";
    const data = {
      email: `${userEmail}`,
      access: "true"
    }
    axios.patch(url, data).then((res) => {
      facultyViewFun();
    }).catch((error) => {
      console.log(error)
    })
  }

  function statusChange() {
    setOpen(false)
    userStatus === "green" ? setFalseLoginAccess() : setTrueLoginAccess()
  }

  const handleClickOpen = (e) => {
    setOpen(true);
    setUserEmail(e.target.getAttribute("data"));
    setUserStatus(e.target.style.color);
  };



  function closeModal() {
    setOpen(false)
  }

  const [searchData, setSearchData] = useState("");

  const handleInputChange1 = (event) => {
    setSearchData(event.target.value);
    const input = event.target.value.toLowerCase();
    const rows = document.querySelectorAll("#faculties tr");
    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      let shouldHide = true;
      cells.forEach((cell) => {
        if (cell.textContent.toLowerCase().includes(input)) {
          shouldHide = false;
        }
      });
      if (shouldHide) {
        row.classList.add("hidden");
      } else {
        row.classList.remove("hidden");
      }
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {
          viewFrame ? <Button className='toggle_btn' onClick={viewData}  sx={{bgcolor:"#1b3058",color:"white"}} variant="contained">Create Faculty</Button> : <Button className='toggle_btn' onClick={viewData}  sx={{bgcolor:"#1b3058",color:"white"}} variant="contained">View Created Faculty</Button>
        }
      </div>

      {
        viewFrame && emptyDataUI ?
          <div>
            <input type="text" id="SearchInput" placeholder="Search Faculties" value={searchData} onChange={handleInputChange1} />
            <div className='user-details-wrapper'>
              <table>
                <thead>
                  <tr>
                    <th colSpan="13" style={{ textAlign: "center", backgroundColor: "#ffcb00" }}>FACULTIES</th>
                  </tr>
                  <tr>
                    <th>S.No</th>
                    <th>Faculty Id.</th>
                    <th>Created At</th>
                    <th>First Name</th>
                    <th>Middle Name</th>
                    <th>Last Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Faculty</th>
                    <th>Designation</th>
                    <th>Edu.</th>
                    <th>Admin Verification</th>
                  </tr>
                </thead>
                <tbody id='faculties'>
                  {
                    facultyView.map((data, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{data.facultyid}</td>
                          <td>{data.created_at}</td>
                          <td>{data.firstname}</td>
                          <td>{data.middlename}</td>
                          <td>{data.lastname}</td>
                          <td>{data.mobileno}</td>
                          <td>{data.email}</td>
                          <td>{data.faculty}</td>
                          <td>{data.designation}</td>
                          <td>{data.education}</td>
                          <td>
                            {data.admin_verified ? (
                              <Button
                                data={data.email}
                                onClick={handleClickOpen}
                                style={{
                                  backgroundColor: "green",
                                  borderRadius: "50%",
                                  height: "30px",
                                  width: "30px",
                                  color: "green",
                                  border: "none",
                                  cursor: "pointer",
                                }}
                              >
                                <i
                                  className="fas fa-check"
                                  style={{ margin: 0, padding: 0, fontSize: "18px", lineHeight: "30px" }}
                                ></i>
                              </Button>
                            ) : (
                              <Button
                                data={data.email}
                                onClick={handleClickOpen}
                                style={{
                                  backgroundColor: "red",
                                  borderRadius: "50%",
                                  height: "30px",
                                  width: "30px",
                                  color: "red",
                                  border: "none",
                                  cursor: "pointer",
                                }}
                              >
                                <i
                                  className="fas fa-times"
                                  style={{ margin: 0, padding: 0, fontSize: "18px", lineHeight: "30px" }}
                                ></i>
                              </Button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
          </div> : ""
      }
      {
       (viewFrame && !emptyDataUI ) && 
        <div style={{width:"100%",textAlign:"center" , fontSize:"30px",marginTop:"200px"}}>No data to show</div>
      
      }
      {
        !viewFrame ? <div className="faculty-member-creation-wrapper">
           {responseCircular && (
          <div
            style={{
              width: "29%",
              height: "30%",
              left: "33%",
              backgroundColor: "rgb(211,211,211)",
              borderRadius: "10px",
              top: "125px",
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
          <h3 style={{ margin: "20px auto" }}>Creation Faculty Member</h3>
          {successAlert ? <Alert severity="success" style={{ marginBottom: "10px" }}>Faculty Created Successfully</Alert> : ""}
          {failAlert ? <Alert severity="error" style={{ marginBottom: "10px" }}>Faculty already exists</Alert> : ""}
          {emptyFieldAlert ? <Alert severity="error" style={{marginBottom:"10px"}}>All fields required</Alert> : ""}
          {invalidEmailPhone ? <Alert severity="error" style={{marginBottom:"10px"}}>Invalid Email and Phone</Alert> : ""}
          <form id='form'>
          <div className="grid-container">
            <input type="text" placeholder="First Name" name="f_name" onChange={handleInputs} />
            <input type="text" placeholder="Middle Name" name="m_name" onChange={handleInputs} />
            <input type="text" placeholder="Last Name" name="l_name" onChange={handleInputs} />
          </div>
          <div className="grid-container">
            <input type='text' onFocus={() => { dobRef.current.type = 'date' }} onBlur={() => { dobRef.current.type = 'text' }} placeholder="Date of Birth" ref={dobRef} />
            <select onChange={(e) => (setGender(e.target.value))}>
              <option>Select Gender</option>
              <option value={"male"}>Male</option>
              <option value={"female"}>Female</option>
              <option value={"other"}>Other</option>
            </select>
            <input disabled value={user.faculty} style={{ backgroundColor: "white" ,color:"grey"}}></input>
          </div>
          <div className="grid2-container">
            <Inputs type={"email"} placeholder={"Enter email"} name={"email"} fun={handleInputs} />
            <Inputs type={"tel"} placeholder={"Enter Phone"} name={"phone"} fun={handleInputs} />
          </div>
          <div className="grid2-container">
            <input type='text' placeholder='Enter Highest Qualification' name={"education"} onChange={handleInputs}></input>
            <input type='text' placeholder='Enter Designation' name={"designation"} onChange={handleInputs}></input>
          </div><br />
          <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ marginRight: "1rem" }}>Login Access</p>
            <input type="radio" value="true" name="admin verification" onChange={(e) => (setLogin(e.target.value))} /> <label style={{ marginRight: "1rem" }}>Yes</label>
            <input type="radio" value="false" name="admin verification" defaultChecked onChange={(e) => (setLogin(e.target.value))} /> <label>No</label>
          </div>
          <Button  sx={{bgcolor:"#1b3058",color:"white"}} variant="contained" onClick={handleCreationMembers} ref={buttonRef}>Submit</Button>
          </form>
        </div> : ""
      }
      <Dialog
        open={open}
        onClose={closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do You want to change the login status of faculty
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Disagree</Button>
          <Button onClick={statusChange} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

