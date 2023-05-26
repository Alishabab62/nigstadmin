import axios from 'axios';
import React, { useEffect } from 'react'

export default function CourseReportToFaculty() {
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"));
        const url = `http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/sauth/view_by_faculty/${user.faculty}`;
        axios.get(url).then((res)=>{
            console.log(res)
        }).catch((error)=>{
            console.log(error)
        })
    },[])
  return (
    <div>CourseReportToFaculty</div>
  )
}
