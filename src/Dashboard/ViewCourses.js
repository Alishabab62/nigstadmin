import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function ViewCourses() {
    const [viewData , setViewData] = useState([]);

    useEffect(()=>{
    let data = JSON.parse(localStorage.getItem("user"));
    console.log(data.faculty);
    const url = `https://nigst.onrender.com/admin/course_faculty/${data.faculty}`;
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
            <th>Course Category</th>
            <th>Course Title</th>
            <th>Course Description</th>
            <th>Course Mode</th>
            <th>Course Duration</th>
            <th>Course Type</th>
            <th>Faculty</th>
        </tr>
        {
          viewData.map((data,index)=>{
            return (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{data.course_category}</td>
                <td>{data.title}</td>
                <td>{data.description}</td>
                <td>{data.course_mode}</td>
                <td>{data.duration}</td>
                <td>{data.course_type}</td>
                <td>{data.course_director}</td>
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
