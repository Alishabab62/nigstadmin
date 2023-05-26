import React, { useState } from 'react'
import Logo from '../images/logo.png'
import '../CSS/app.css'
import ViewCourses from './ViewCourses';
// import VerificationPage from './VerificationPage';



export default function Student() {
 const [viewCourse , setViewCourse] = useState(false);

function viewCourseFun(){
    setViewCourse(!viewCourse);
}
function logout(){
    window.location.hash = "/";
    localStorage.clear("user")
  }
  return (
    <div className='flex justify-between main-page-header'>
        <div className='side-bar border-r-2 side-bar-wrapper'> 
        <div className=' text-center pt-14 pb-14  border-b-2 mb-8'>
        <h3 className='text-lg   text-white font-bold ' style={{textAlign:"center"}}>Welcome Student</h3>
        </div>
        <div>
            <ul className=' text-white cursor-pointer '>
                {viewCourse ? <li className='p-3 ' style={{background:"#ffcb00"}} onClick={viewCourseFun}>Courses</li> : <li className='p-3 ' onClick={viewCourseFun}>Courses</li>}
            </ul>
        </div>
        </div>
        <div className='content-wrapper-admin-panel w-full'>
            <header className='h-240  w-full flex justify-evenly items-center'>
                <div>
                    <img src={Logo} alt="logo" className='header-logo-admin-panel'></img>
                </div>
                <button onClick={logout}>Logout</button>
            </header>
            <div className='min-h-max flex justify-center border-t-2'>
                { viewCourse ? <ViewCourses/> : ""}
                {/* <VerificationPage/> */}
            </div>
        </div>
    </div>
  )
}
