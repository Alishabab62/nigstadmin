import React, { useEffect, useState } from 'react'
import Button from '../components/Button';
// import axios from 'axios';

export default function CourseScheduling() {
   

    function handleCourseScheduling(){
        console.log("Function Called")
    }
  return (
    <div className='course-creation-wrapper'>
        <h3>Course Creation</h3>
        <input type='text' placeholder='Enter Title'></input>
        <input type='text' placeholder='Enter Course Id'></input>
        <input type='text' placeholder='Enter Course No'></input>
        <input type='text' placeholder='Enter Course Code'></input>
        <input type='text' placeholder='Enter Description'></input>
        <input type='text' placeholder='Enter Course Capacity'></input>
        <input type='date' placeholder='Date Of Commencement'></input>
        <input type='date' placeholder='Date of Completion'></input>
      <Button value={"Submit"} fun={handleCourseScheduling}/>
    </div>
  )
}
