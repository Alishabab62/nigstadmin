import { TextField } from '@mui/material'
import React, { useState } from 'react'
import Logo from "../assests/Website Logo NIGST Small.png";
import '../CSS/app.css'
import Button from "../components/Button"
import CreationFacultyMember from './CreationFacultyMember';





export default function FacultyAdmin() {
    const [creationFacultyMember , setCreationFacultyMember] = useState(false)
    const [facultyPositionCreation , setFacultyPositionCreation] = useState(false)
    const [courseCategory , setCourseCategory] = useState(false);

    function creationFacultyFun(){
        setCreationFacultyMember(true)
        setFacultyPositionCreation(false)
        setCourseCategory(false)
    }
    function facultyPositionFun(){
        setFacultyPositionCreation(true)
        setCreationFacultyMember(false)
        setCourseCategory(false)
    }
    function courseCategoryFun(){
        setCourseCategory(true)
        setCreationFacultyMember(false)
        setFacultyPositionCreation(false)
    }
    function facultyAdminFun(){
        setCreationFacultyMember(false)
        setFacultyPositionCreation(false)
        setCourseCategory(false)
    }
  return (
    <div className='flex justify-between'>
        <div className='side-bar border-r-2 side-bar-wrapper'> 
        <div className=' text-center pt-14 pb-14  border-b-2 mb-8'>
        <h3 className='text-lg   text-white font-bold '>Welcome Faculty Admin</h3>
        </div>
        <div>
            <ul className=' text-white cursor-pointer '>
                <li className='p-3 ' onClick={creationFacultyFun}>Creation of Faculty Members</li>
                <li className='p-3 ' onClick={facultyPositionFun}>Assigning Positions to Faculty Members</li>
                <li className='p-3 ' onClick={courseCategoryFun}>Allowing and disallowing login access to Faculty </li>
                <li className='p-3 ' onClick={facultyAdminFun}>Course Creation</li>
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
                
            </div>
        </div>
    </div>
  )
}
