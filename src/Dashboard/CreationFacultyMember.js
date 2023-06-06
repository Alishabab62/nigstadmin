import React, { useEffect, useRef, useState } from 'react'
import Inputs from "../components/Inputs";

import axios from 'axios';
import { Alert } from '@mui/material';
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

  // const [emptyFieldAlert, setEmptyFieldAlert] = useState(false);
  const [input, setInput] = useState({
    f_name: "",
    l_name: "",
    m_name: "",
    email: "",
    phone: "",
    education: "",
    designation: "",
  });
  const [gender, setGender] = useState("");
  const [login, setLogin] = useState("");
  const [user, setUser] = useState("");
  const dobRef = useRef(null);

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
      console.log(res.data.data)
      setFacultyView(res.data.data.reverse());
    }).catch((error) => {
      console.log(error);
    })
  }


  function handleCreationMembers() {

    const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/sauth/create";
    const data = {
      first_name: `${input.f_name}`,
      middle_name: `${input.m_name}`,
      last_name: `${input.l_name}`,
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
      facultyViewFun()
      setSuccessAlert(true)
      setTimeout(() => {
        setSuccessAlert(false)
      }, 5000);
    }).catch((error) => {
      setFailAlert(true)
      setTimeout(() => {
        setFailAlert(false)
      }, 5000);
      console.log(error);
    })
  }

  function viewData() {
    setViewFrame(!viewFrame);
  }


  function setFalseLoginAccess(e) {
    console.log("false")
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

  }

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
      <div style={{display:"flex" , flexDirection:"column"}}>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          {
            viewFrame ? <button className='toggle_btn' onClick={viewData}>Create Faculty</button> : <button className='toggle_btn' onClick={viewData}>View Created Faculty</button>
          }
        </div>

        {
          viewFrame ?
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
        {/* Render the table cells */}
        <td>{index + 1}</td>
        <td>{data.facultyid}</td>
        <td>{data.created_on_date_time}</td>
        <td>{data.firstname}</td>
        <td>{data.middlename}</td>
        <td>{data.lastname}</td>
        <td>{data.mobileno}</td>
        <td>{data.email}</td>
        <td>{data.faculty}</td>
        <td>{data.designation}</td>
        <td>{data.education}</td>
        <td>
          {/* Render a button based on the 'admin_verified' value */}
          {data.admin_verified ? (
            <button
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
            </button>
          ) : (
            <button
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
            </button>
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
          !viewFrame ? <div className="faculty-member-creation-wrapper">
            <h3 style={{ margin: "20px auto" }}>Creation Faculty Member</h3>
            {successAlert ? <Alert severity="success" style={{ marginBottom: "10px" }}>Faculty Created Successfully</Alert> : ""}
            {failAlert ? <Alert severity="error" style={{ marginBottom: "10px" }}>Something Went Wrong Please try again later</Alert> : ""}
            {/* {emptyFieldAlert ? <Alert severity="error" style={{marginBottom:"10px"}}>All fields required</Alert> : ""} */}
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
              <input disabled value={user.faculty} style={{backgroundColor:"white"}}></input>
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
              <input type="radio" value="false" name="admin verification" onChange={(e) => (setLogin(e.target.value))} /> <label>No</label>
            </div>
            <button style={{ width: '50%', margin: '20px auto 0' }} onClick={handleCreationMembers}>Submit</button>
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

