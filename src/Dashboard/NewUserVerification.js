import React, { useEffect, useRef, useState } from 'react'
import Inputs from "../components/Inputs";
import Button from "../components/Button";
import axios from 'axios';


export default function NewUserVerification() {
    let [verificationFilterValue , setVerificationFilterValue] = useState();
    const startDateRef = useRef();
    const endDateRef = useRef();
    const [data,setData] = useState([]);
    const [inputs ,setInputs] = useState({
      name:"",
      orgName:""
    })

    function handleFilter(){
      // filter()
    }

    function handleInputs(e) {
      const { name, value } = e.target;
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    }

function filter(){
  console.log(startDateRef.current)
  console.log(verificationFilterValue)
  const url = "https://nigst.onrender.com/secure/viewu";
  const data = {
    name:`${inputs.name}`,
    org_name:`${inputs.orgName}`,
    adminVef:`${verificationFilterValue}`,
    start_date:`${startDateRef.current.value}`,
    end_date:`${endDateRef.current.value}`
  }
  axios.get(url,data).then((res)=>{
    console.log(res.data)
    setData(res.data);
  }).catch((error)=>{
    console.log(error)
  })
}

useEffect(()=>{
  const url = "https://nigst.onrender.com/secure/viewu";
  axios.get(url).then((res)=>{
    setData(res.data);
  }).catch((error)=>{
    console.log(error)
  })
},[])

  return (
    <div className='user-verification w-full'>
      <div className='filter-wrapper'>
        <div>
       <span>By Email</span> <Inputs type={"text"} placeholder={"Search by Email"} fun={handleInputs} name={"name"}/>
        </div>
        <div>
       <span>By Organization</span> <Inputs type={"text"} placeholder={"Search by Organization"} fun={handleInputs} name={"orgName"}/>
        </div>
       <select onChange={(e)=>setVerificationFilterValue(e.target.value)}>
        <option>Select by Verification Status</option>
        <option >All Student</option>
        <option value={true}>All verified Student</option>
        <option value={false}>All non-verified Student</option>
       </select>
       <div>
       <span>From Date</span> <Inputs type={"date"} ref1={startDateRef}/>
       </div>
       <div>
       <span>To Date</span> <Inputs type={"date"} ref1={endDateRef}/>
       </div>
       <Button value={"Apply"} fun={handleFilter}/>
      </div>   
      <div className='user-details-wrapper'>
        <table>
            <tr>
                <th>S.Id</th>
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
                  <tr>
                  <td>{index+1}</td>
                  <td>{user.created_at}</td>
                  <td>{user.first_name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.organization}</td>
                  <td>{user.gender}</td>
                  <td>{user.mobile_verified}</td>
                  <td>{user.email_verified}</td>
                  <td>{user.admin_verified}</td>
                 </tr>
                )
              })}
        </table>
        </div>   
    </div>
  )
}
