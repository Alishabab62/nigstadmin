import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
// import CurrencyList from 'currency-list'
import { getAllISOCodes } from 'iso-country-currency';

export default function CourseScheduling() {

  const completionDate = useRef();
  const commencementDate = useRef();
  const runningDate = useRef();
  const [input , setInput] = useState({
    fee:"",
    courseCapacity:""
  });
  const [courseName , setCourseName] = useState("");
  const [currency , setCurrency] = useState([]);
  const [inputCurrency , setInputCurrency] = useState("")

  function handleInputs(e){
    const {name,value} = e.target;
    setInput((prevInput)=>({
      ...prevInput , [name]:value
    }));
  }

  useEffect(()=>{
    setCurrency(getAllISOCodes());
  },[])
    function handleCourseScheduling(){
      // courseID
        const url ="https://nigst.onrender.com/course/scheduler";
        const data ={
          courseName:`${courseName}`,
          fees:`${input.fee}`,
          dateCommencement:`${commencementDate.current.value}`,
          dateCompletion:`${completionDate.current.value}`,
          courseCapacity:`${input.courseCapacity}`,
          runningDate:`${runningDate.current.value}`,
          currency:`${inputCurrency}`
        }
        axios.post(url,data).then((res)=>{
          console.log(res)
        }).catch((error)=>{
          console.log(error)
        }) 
    }

  return (
    <div className='course-creation-wrapper'>
        <h3>Course Scheduling</h3>
        <select onChange={(e)=>setCourseName(e.target.value)}>
          <option>Select Course</option>
          <option>Course 1</option>
          <option>Course 2</option>
          <option>Course 3</option>
        </select>
        <div>Course Id</div>
        <div>Course Description</div>
        <div>Course Duration</div>
        <div>Course Course Code</div>
        <div>Course Number</div>
        <div style={{display:"flex"}}>
          <select onChange={(e)=>setInputCurrency(e.target.value)}>
            <option>Select currency</option>
            <option value="INR">INR</option>
            {
              currency.map((data,index)=>{
                return <option key={index} value={data.currency}>{data.currency}</option>
              })
            }
          </select>
        <input type='text' placeholder='Enter Fee' name='fee' onChange={handleInputs}></input>
        </div>
        <input type='date' placeholder='Date Of Commencement' ref={commencementDate}></input>
        <input type='date' placeholder='Date of Completion' ref={completionDate}></input>
        <input type='date' placeholder='Running Date' ref={runningDate}></input>
        <input type='text' placeholder='Enter Course Capacity' name='courseCapacity' onChange={handleInputs}></input>
      <button  onClick={handleCourseScheduling}>Submit</button>
    </div>
  )
}
