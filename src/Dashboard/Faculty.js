import React, { useState } from 'react'
import Logo from '../images/NIGST LOGO Small.svg'
import '../CSS/app.css';
import ResetPassword from './ResetPassword';
import FacultyReportSubmission from './FacultyReportSubmission';


export default function Faculty() {
 const [courseReport , setCourseReport] = useState(true);
 const [forgotPassword , setForgotPassword] = useState(false);

 function courseReportFun(){
    setCourseReport(true);
    setForgotPassword(false)
 }
 function forgotPasswordFun(){
    setForgotPassword(true);
    setCourseReport(false)
 }
 function logout(){
    window.location.hash = '/';
    localStorage.clear("user")
 }
  return (
    <div className='flex justify-between main-page-header'>
        <div className='side-bar border-r-2 side-bar-wrapper'> 
        <div className=' text-center   border-b-2 mb-8'>
        <h3 className='text-lg   text-white font-bold ' style={{textAlign:"center"}}>Welcome Faculty</h3>
        </div>
        <div>
            <ul className=' text-white cursor-pointer '>
                {courseReport ? <li className='p-3 ' style={{background:"#ffcb00"}} onClick={courseReportFun}>Course Report Submission</li> : <li className='p-3 ' onClick={courseReportFun}>Course Report Submission</li>}
                {forgotPassword ? <li className='p-3 ' style={{background:"#ffcb00"}} onClick={forgotPasswordFun}>Reset Password</li> : <li className='p-3 ' onClick={forgotPasswordFun}>Reset Password</li> }
            </ul>
        </div>
        </div>
        <div className='content-wrapper-admin-panel w-full'>
            <header className='h-240  w-full flex justify-evenly items-center'>
                <div>
                    <img src={Logo} alt="logo" className='header-logo-admin-panel'></img>
                </div>
                <div><button value={"Logout"}  onClick={logout}>Logout</button> </div>
            </header>
            <div className='min-h-max flex justify-center border-t-2'>
                {forgotPassword ? <ResetPassword/> : ""}
                {courseReport ? <FacultyReportSubmission/> : ""}
            </div>
        </div>
    </div>
  )
}
