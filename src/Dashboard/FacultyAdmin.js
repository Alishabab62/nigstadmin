import React, { useEffect, useState } from 'react'
import Logo from '../images/logo1.png'
import '../CSS/app.css'
import Button from "../components/Button"

import CourseCreation from './CourseCreation'
import AssigningPositionToFacultyMember from './AssigningPositionToFacultyMember'
import CourseScheduling from './CourseScheduling'
import CreationFacultyMember from './CreationFacultyMember'
import CourseReportToFaculty from './CourseReportToFaculty'

export default function FacultyAdmin() {
    const [creationFacultyMember, setCreationFacultyMember] = useState(true)
    const [courseCreation, setCourseCreation] = useState(false);
    const [assigningPosition, setAssigningPosition] = useState(false);
    const [courseScheduling, setCourseScheduling] = useState(false);
    const [courseReport,setCourseReport] = useState("");
    const [user,setUser] = useState("");

    function creationFacultyFun() {
        setCreationFacultyMember(true);
        setCourseCreation(false);
        setAssigningPosition(false);
        setCourseReport(false);
        setCourseScheduling(false);
        setCourseReport(false);
    }
    function assigningPositionFun() {
        setAssigningPosition(true);
        setCreationFacultyMember(false);
        setCourseCreation(false);
        setCourseReport(false);
        setCourseScheduling(false);
        setCourseReport(false);
    }
    function courseCreationFun() {
        setCourseCreation(true);
        setCreationFacultyMember(false);
        setAssigningPosition(false);
        setCourseReport(false);
        setCourseScheduling(false);
        setCourseReport(false);
    }
    function courseSchedulingFun() {
        setCourseScheduling(true);
        setCourseCreation(false);
        setCreationFacultyMember(false);
        setAssigningPosition(false);
        setCourseReport(false);
    }
    function courseReportFun(){
        setCourseReport(true);
        setCourseScheduling(false);
        setCourseCreation(false);
        setCreationFacultyMember(false);
        setAssigningPosition(false);
    }
    function logout(){
        window.location.hash = "/";
        localStorage.clear("user")
      }
      useEffect(()=>{
        let data = JSON.parse(localStorage.getItem("user"));
        setUser(data)
      },[])
    return (
        <div className='flex justify-between main-page-header'>
            <div className='side-bar border-r-2 side-bar-wrapper'>
                <div className=' text-center mb-0'>
                    <h3 className='text-lg text-white font-bold '>Welcome Faculty {user.faculty}</h3>
                </div> 
                <div>
                    <ul className=' text-white cursor-pointer '>
                        {creationFacultyMember ? <li className='p-3 ' style={{ background: "#1b3058",color:"#ffcb00" }} onClick={creationFacultyFun}>Faculty Members</li> : <li className='p-3 ' onClick={creationFacultyFun}>Faculty Members</li>}
                        {assigningPosition ? <li className='p-3 ' style={{ background: "#1b3058",color:"#ffcb00" }} onClick={assigningPositionFun}>Assigning Positions to Faculty Members</li> : <li className='p-3 ' onClick={assigningPositionFun}>Assigning Positions to Faculty Members</li>}
                        {courseCreation ? <li className='p-3 ' style={{ background: "#1b3058",color:"#ffcb00" }} onClick={courseCreationFun}>Course Creation</li> : <li className='p-3 ' onClick={courseCreationFun}>Course Creation</li>}
                        {courseScheduling ? <li className='p-3 ' style={{ background: "#1b3058",color:"#ffcb00" }} onClick={courseSchedulingFun}>Course Scheduling</li> : <li className='p-3 ' onClick={courseSchedulingFun}>Course Scheduling</li>}
                        {courseReport ? <li className='p-3 ' style={{ background: "#1b3058",color:"#ffcb00" }} onClick={courseReportFun}>View Course Report</li> : <li className='p-3 ' onClick={courseReportFun}>View Course Report</li>}
                    </ul>

                </div>
            </div>
            <div className='content-wrapper-admin-panel w-full'>
                <header className='h-240  w-full flex justify-evenly items-center'>
                    
                    <div>
                        <img src={Logo} alt="logo" className='header-logo-admin-panel'></img>
                    </div>
                    <div style={{position:'absolute',right:'20px'}}><Button value={"Logout"} fun={logout} /> </div>
                </header>
                <div className='min-h-max flex justify-center border-t-2'>
                    
                    {creationFacultyMember && <CreationFacultyMember/>}
                    {courseCreation ? <CourseCreation /> : ""}
                    {assigningPosition ? <AssigningPositionToFacultyMember /> : ""}
                    {courseScheduling ? <CourseScheduling /> : ""}
                    {courseReport ? <CourseReportToFaculty/> : ""}
                </div>
            </div>
        </div>
    )
}
