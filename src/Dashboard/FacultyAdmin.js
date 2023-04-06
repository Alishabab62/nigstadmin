import { TextField } from '@mui/material'
import React, { useState } from 'react'
import Logo from '../images/logo.png'
import '../CSS/app.css'
import Button from "../components/Button"
import CreationFacultyMember from './CreationFacultyMember';
import CourseCreation from './CourseCreation'
import AssigningPositionToFacultyMember from './AssigningPositionToFacultyMember'





export default function FacultyAdmin() {
    const [creationFacultyMember , setCreationFacultyMember] = useState(false)
    const [courseCreation , setCourseCreation] = useState(false);
    const [assigningPosition , setAssigningPosition] = useState(false);

    function creationFacultyFun(){
        setCreationFacultyMember(true);
        setCourseCreation(false);
        setAssigningPosition(false);
    }
    function assigningPositionFun(){
        setAssigningPosition(true);
        setCreationFacultyMember(false);
        setCourseCreation(false);
    }
    function courseCreationFun(){
        setCourseCreation(true);
        setCreationFacultyMember(false);
        setAssigningPosition(false);
    }
   
   
  return (
    <div className='flex justify-between main-page-header'>
        <div className='side-bar border-r-2 side-bar-wrapper'> 
        <div className=' text-center pt-14 pb-14  border-b-2 mb-8'>
        <h3 className='text-lg   text-white font-bold '>Welcome Faculty Admin</h3>
        </div>
        <div>
            <ul className=' text-white cursor-pointer '>
                {creationFacultyMember ? <li className='p-3 ' style={{background:"#ffcb00"}} onClick={creationFacultyFun}>Creation of Faculty Members</li> : <li className='p-3 ' onClick={creationFacultyFun}>Creation of Faculty Members</li>}
                <li className='p-3 ' onClick={assigningPositionFun}>Assigning Positions to Faculty Members</li>
                <li className='p-3 ' >Allowing and disallowing login access to Faculty </li>
                <li className='p-3 ' onClick={courseCreationFun}>Course Creation</li>
                <li className='p-3 '>Course Scheduling</li>
            </ul>
            
        </div>
        </div>
        <div className='content-wrapper-admin-panel w-full'>
            <header className='h-240  w-full flex justify-evenly items-center'>
                <div><TextField id="outlined-basic"  variant="outlined" placeholder='Search here' className='w-80' /></div>
                <div>
                    <img src={Logo} alt="logo" className='header-logo-admin-panel'></img>
                </div>
                <div><Button value={"Login"}  /> </div>
            </header>
            <div className='min-h-max flex justify-center border-t-2'>
                {creationFacultyMember ? <CreationFacultyMember/> : ""}
                {courseCreation ? <CourseCreation/> : ""}
                {assigningPosition ? <AssigningPositionToFacultyMember/> : ""}
            </div>
        </div>
    </div>
  )
}
