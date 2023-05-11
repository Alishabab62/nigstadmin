import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function ViewCourses() {
    const [viewData , setViewData] = useState([]);

    useEffect(()=>{
    let data = JSON.parse(localStorage.getItem("user"));
    console.log(data.faculty);
    const url = `http://ec2-65-2-161-9.ap-south-1.compute.amazonaws.com/admin/course_faculty/P_&_RS`;
    axios.get(url).then((res)=>{
      setViewData(res.data.course);
    }).catch((error)=>{
      console.log(error)
    })
    },[])
  return (
    <div>
      <div className='user-details-wrapper'>
    <table>
      <tbody>
        <tr>
            <th>S.No</th>
            <th>Course No</th>
            <th>Course Code</th>
            <th>Batch No</th>
            <th>Course Name</th>
            <th>Commencement Date</th>
            <th>Course Duration</th>
            <th>Course Capacity</th>
            <th>Eligibilty</th>
            <th>Course Category</th>
            <th>Course Mode</th>
            <th>Course Type</th>
            <th>Course Officer</th>
            <th>Faculty</th>
            <th>Course Description</th>
            <th>Enroll/Cancel</th>
        </tr>
        {
          viewData.map((data,index)=>{
            return (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{data.course_no}</td>
                <td>{data.course_code}</td>
                <td>NA</td>
                <td>{data.title}</td>
                <td>NA</td>
                <td>{data.duration}</td>
                <td>NA</td>
                <td>NA</td>
                <td>{data.course_category}</td>
                <td>{data.course_mode}</td>
                <td>{data.course_type}</td>
                <td>{data.course_officer}</td>
                <td>{data.course_director.split(" ")[3]}</td>
                <td>{data.description}</td>
              </tr>
            )
          })
        }
          </tbody>
    </table>
    </div>
    </div>
  )
}
