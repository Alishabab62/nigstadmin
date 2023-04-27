import React from 'react'

export default function FacultyReportSubmission() {
  return (
    <div className='department-creation-wrapper'>
       <h3>Course Scheduling</h3>
       <select>
            <option>Select Course Title</option>
       </select>
        <input placeholder='Enter Remark' type='text' name='remark'></input>
        <input type='file' ></input>
        <button>Submit</button>
    </div>
  )
}
