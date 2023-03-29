import React, { useState } from 'react'
import Inputs from "../components/Inputs";
import Button from "../components/Button";
// import "../CSS/app.css"

export default function NewUserVerification() {
    let [verificationFilterValue , setVerificationFilterValue] = useState();
    function handleFilter(){
        console.log(verificationFilterValue)
    }
  return (
    <div className='user-verification w-full'>
      <div className='filter-wrapper'>
        <div>
       <span>By Name</span> <Inputs type={"text"} placeholder={"Search by Name"}/>
        </div>
        <div>
       <span>By Name</span> <Inputs type={"text"} placeholder={"Search by Organization"}/>
        </div>
       <select onChange={(e)=>setVerificationFilterValue(e.target.value)}>
        <option>Select by Verification Status</option>
        <option value={"all"}>All Student</option>
        <option value={"verified"}>All verified Student</option>
        <option value={"non-verified"}>All non-verified Student</option>
       </select>
       <div>
       <span>From Date</span> <Inputs type={"date"}/>
       </div>
       <div>
       <span>To Date</span> <Inputs type={"date"}/>
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
            <tr>
                <td>101</td>
                <td>10 March 2023</td>
                <td>Shabab</td>
                <td>alishabab62@gmail.com</td>
                <td>6396042652</td>
                <td>Survey Of India</td>
                <td>Male</td>
                <td>Yes</td>
                <td>Yes</td>
                <td>No</td>
            </tr>
            <tr>
                <td>102</td>
                <td>10 March 2023</td>
                <td>Keshav</td>
                <td>keshav861@gmail.com</td>
                <td>6396042652</td>
                <td>Survey Of India</td>
                <td>Male</td>
                <td>Yes</td>
                <td>Yes</td>
                <td>No</td>
            </tr>
        </table>
        </div>   
    </div>
  )
}
