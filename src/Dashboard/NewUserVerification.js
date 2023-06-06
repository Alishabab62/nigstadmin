import React, { useEffect, useRef, useState } from 'react'
import Inputs from "../components/Inputs";
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';


export default function NewUserVerification() {
    let [verificationFilterValue , setVerificationFilterValue] = useState("");
    const [open, setOpen] = React.useState(false);
    const startDateRef = useRef();
    const endDateRef = useRef();
    const [data,setData] = useState([]);
    const [userEmail , setUserEmail] = useState("");
    const [inputs ,setInputs] = useState({
      email:"",
      orgName:""
    })


  const handleClickOpen = (e) => {
    setOpen(true);
    setUserEmail(e.target.getAttribute("data"));
    e.target.style.backgroundColor = "#FFCCCB"
  };

  const handleClose = () => {
    setOpen(false);
  };
  
    function handleInputs(e) {
      const { name, value } = e.target;
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    }

function filter(){
  const url = `http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/admin/filter?status=${verificationFilterValue}&email=${inputs.email}&organization=${inputs.orgName}&startDate=${startDateRef.current.value}&endDate=${endDateRef.current.value}`;
  axios.get(url).then((res)=>{
    setData(res.data.reverse());
  }).catch((error)=>{
    if(error.response.data.message === "No matching records found."){
      setData([])
    }
  })
}

useEffect(()=>{
  filter()
},[])

function handleAdminVer(){
  setOpen(false);
  const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/secure/verify";
  const data={
    email: `${userEmail}`
  }
  axios.patch(url,data).then((res)=>{
    console.log(res)
    filter()
  }).catch((error)=>{
    console.log(error)
  }) 
}


  return (
    <div className='user-verification w-full'>
      <div className='filter-wrapper'>
        <div>
       <span>By Email</span> <Inputs type={"text"} placeholder={"Search by Email"}  name={"email"} fun={handleInputs}/>
        </div>
        <div>
       <span>By Organization</span> <Inputs type={"text"} placeholder={"Search by Organization"} name={"orgName"} fun={handleInputs}/>
        </div>
       <select onChange={(e)=>setVerificationFilterValue(e.target.value)}> 
        <option>Select by Verification Status</option> 
        <option value={""}>All Student</option>
        <option value={"true"}>All verified Student</option>
        <option value={"false"}>All non-verified Student</option>
       </select>
       <div>
       <span>From Date</span> <Inputs type={"date"} ref1={startDateRef}/>
       </div>
       <div>
       <span>To Date</span> <Inputs type={"date"} ref1={endDateRef}/>
       </div>
       <button onClick={filter}>Apply</button>
      </div>   
      <div className='user-details-wrapper'>
        <table>
          <tbody>
            <tr>
                <th>S.No</th>
                <th>Created At</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Organization</th>
                <th>Gender</th>
                <th>Mobile Verification</th>
                <th>Email Verification</th>
                <th>NIGST Verification</th>
            </tr>
              {data.map((user,index)=>{
                return(
                  <tr key={index}>
                  <td>{index+1}</td>
                  <td>{user.created_at}</td>
                  <td>{user.first_name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.organization}</td>
                  <td>{user.gender}</td>
                  {user.mobile_verified ? <td>True</td> : <td>False</td> }
                  {user.email_verified ? <td><button style={{backgroundColor:"green" , color:"green" , borderRadius:"50%" , height:"40px" , width:"40px"}} ></button></td> : <td><button style={{ height:"40px" , width:"40px" , backgroundColor:"red" , color:"red" , borderRadius:"50%"}}></button></td>}
                  {user.admin_verified ? <td><button data={user.email} style={{backgroundColor:"green" , color:"green" , borderRadius:"50%" , height:"40px" , width:"40px"}} onClick={handleClickOpen}></button></td> : <td><button data={user.email} style={{ height:"40px" , width:"40px" , backgroundColor:"red" , color:"red" , borderRadius:"50%"}}onClick={handleClickOpen}></button></td>}
                 </tr>
                )
              })}
              </tbody>
        </table>
        </div>  
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do You want to change the status of user
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleAdminVer} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog> 
    </div>
  )
}
