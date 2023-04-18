import React from 'react'
import Logo from '../images/logo.png'
import '../CSS/app.css'
import Button from "../components/Button"


export default function Faculty() {
 
  return (
    <div className='flex justify-between main-page-header'>
        <div className='side-bar border-r-2 side-bar-wrapper'> 
        <div className=' text-center pt-14 pb-14  border-b-2 mb-8'>
        <h3 className='text-lg   text-white font-bold ' style={{textAlign:"center"}}>Welcome Faculty</h3>
        </div>
        <div>
            <ul className=' text-white cursor-pointer '>
                {false ? <li className='p-3 ' style={{background:"#ffcb00"}} >Creation of Faculty Members</li> : <li className='p-3 '>Course Report Submission</li>}
            </ul>
            
        </div>
        </div>
        <div className='content-wrapper-admin-panel w-full'>
            <header className='h-240  w-full flex justify-evenly items-center'>
                <div>
                    <img src={Logo} alt="logo" className='header-logo-admin-panel'></img>
                </div>
                <div><Button value={"Login"}  /> </div>
            </header>
            <div className='min-h-max flex justify-center border-t-2'>
            </div>
        </div>
    </div>
  )
}
