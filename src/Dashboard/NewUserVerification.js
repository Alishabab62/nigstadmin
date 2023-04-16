import React, { useEffect, useRef, useState } from 'react'
import Inputs from "../components/Inputs";
import Button from "../components/Button";
import axios from 'axios';


export default function NewUserVerification() {
    let [verificationFilterValue , setVerificationFilterValue] = useState("");
    const startDateRef = useRef();
    const endDateRef = useRef();
    const [data,setData] = useState([]);
    const [inputs ,setInputs] = useState({
      email:"",
      orgName:""
    })

    function handleInputs(e) {
      const { name, value } = e.target;
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    }

function filter(){
  const url = `https://nigst.onrender.com/secure/filter?status=${verificationFilterValue}&email=${inputs.email}&organization=${inputs.orgName}&startDate=${startDateRef.current.value}&endDate=${endDateRef.current.value}`;
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
       <Button value={"Apply"} fun={filter}/>
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
                  {user.email_verified ? <td>True</td> : <td>False</td>}
                  {user.admin_verified ? <td>True</td> : <td>False</td>}
                 </tr>
                )
              })}
              </tbody>
        </table>
        </div>   
    </div>
  )
}
