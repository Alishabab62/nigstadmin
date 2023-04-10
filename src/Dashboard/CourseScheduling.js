import React from 'react'
import Button from '../components/Button';
// import axios from 'axios';

export default function CourseScheduling() {
   

    function handleCourseScheduling(){
        console.log("Function Called")
    }
  return (
    <div className='course-creation-wrapper'>
        <h3>Course Scheduling</h3>
        <select>
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
        <input type='text' placeholder='Enter Fee'></input>
        <input type='date' placeholder='Date Of Commencement'></input>
        <input type='date' placeholder='Date of Completion'></input>
        <input type='text' placeholder='Enter Course Capacity'></input>
      <Button value={"Submit"} fun={handleCourseScheduling}/>
    </div>
  )
}
