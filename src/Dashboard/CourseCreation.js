import React, { useEffect, useState } from 'react'
import Inputs from '../components/Inputs'
import Button from '../components/Button';
import axios from 'axios';

export default function CourseCreation() {
    let weeks = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52];
    let days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
    const [category , setCategory] = useState([])

    useEffect(()=>{
        const url = "https://nigst.onrender.com/category/view"
        axios.get(url).then((res)=>{
          setCategory(res.data.categories)
          console.log(res);
        }).catch((error)=>{
          console.log(error)
        })
      },[])

    function handleCourseCreation(){
        console.log("Function Called")
    }
  return (
    <div className='course-creation-wrapper'>
        <h3>Course Creation</h3>
      <select>
        <option>Select Course Category</option>
       {
        category.map((data)=>{
            return <option>{data.course_category_name}</option>
        })
       }
      </select>
      <select>
        <option>Course Code</option>
        <option>Course Code 101</option>
        <option>Course Code 102</option>
      </select>
      <select>
        <option>Course Number</option>
        <option>Course Number 101</option>
        <option>Course Number 102</option>
      </select>
      <select>
        <option>Course Title</option>
        <option>Basic Course</option>
        <option>Advance Course</option>
      </select>
      <Inputs type={"text"} placeholder={"Course Description"}/>
      <div>
        <select>
            <option>Select Weeks</option>
            {
                weeks.map((data)=>{
                    return <option>{data}</option>
                })
            }
        </select>
        <select style={{marginLeft:"5px"}}>
            <option>Select Days</option>
            {
                days.map((data)=>{
                    return <option>{data}</option>
                })
            }
        </select>
      </div>
      <Inputs type={"text"} placeholder={"Course Officer"}/>
      <select>
        <option>Select Mode of Course</option>
        <option>Classroom</option>
        <option>Online</option>
        <option>Hybrid</option>
      </select>
      <Button value={"Submit"} fun={handleCourseCreation}/>
    </div>
  )
}
