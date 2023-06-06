import React, { useState } from "react";
// import "../CSS/app.css";
import DepartmentCreation from "./DepartmentCreation";
import CreationFacultyPosition from "./CreationFacultyPosition";
import Button from "../components/Button";
// import CourseCategoryCreation from "./CourseCategoryCreation";
import NewUserVerification from "./NewUserVerification";
import DepartmentCourseAssignment from "./DepartmentCourseAssignment";
import Tender from "./Tender";
import Logo from '../images/logo.png'
// import CreationFacultysAdmin from "./CreationFacultysAdmin";
import AnnouncementCreation from "./AnnouncementCreation";


export default function NIGSTAdmin() {
  const [departmentCreation, setDepartmentCreation] = useState(false);
  const [facultyPositionCreation, setFacultyPositionCreation] = useState(false);
  // const [courseCategory, setCourseCategory] = useState(false);
  const [users, setUsers] = useState(false);
  const [courseAssignment, setCourseAssignment] = useState(false);
  
  const [tender, setTender] = useState(false);
  const [announcement , setAnnouncement] = useState(false);
  // const [facultyAdmin , setFacultyAdmin] = useState(false);

  function departmentFun() {
    setDepartmentCreation(true);
    setFacultyPositionCreation(false);
    // setCourseCategory(false);
    setUsers(false);
    setCourseAssignment(false);
    setTender(false);
    setAnnouncement(false);
    // setFacultyAdmin(false)
  }
  function facultyPositionFun() {
    setFacultyPositionCreation(true);
    setDepartmentCreation(false);
    // setCourseCategory(false);
    setUsers(false);
    setCourseAssignment(false);
    setTender(false);
    setAnnouncement(false);
    // setFacultyAdmin(false);
  }
  // function courseCategoryFun() {
  //   setCourseCategory(true);
  //   setDepartmentCreation(false);
  //   setFacultyPositionCreation(false);
  //   setUsers(false);
  //   setCourseAssignment(false);
  //   setTender(false);
  //   setFacultyAdmin(false);
  // setAnnouncement(false);
  // }
  // function facultyAdminCreationFun() {
  //   // setFacultyAdmin(true)
  //   setDepartmentCreation(false);
  //   setFacultyPositionCreation(false);
  //   // setCourseCategory(false);
  //   setUsers(false);
  //   setCourseAssignment(false);
    // setAnnouncement(false);
    //   setTender(false);
  // }
  function usersFun() {
    setUsers(true);
    // setCourseCategory(false);
    setDepartmentCreation(false);
    setFacultyPositionCreation(false);
    setCourseAssignment(false);
    setTender(false);
    setAnnouncement(false);
    // setFacultyAdmin(false)
  }
  function courseAssignmentFun() {
    setCourseAssignment(true);
    setUsers(false);
    // setCourseCategory(false);
    setDepartmentCreation(false);
    setFacultyPositionCreation(false);
    setTender(false);
    setAnnouncement(false);
    // setFacultyAdmin(false)
  }
  function handleTenderFun() {
    setTender(true);
    setCourseAssignment(false);
    setUsers(false);
    // setCourseCategory(false);
    setDepartmentCreation(false);
    setFacultyPositionCreation(false);
    // setFacultyAdmin(false)
    setAnnouncement(false);
  }
  function announcementFun(){
    setAnnouncement(true);
    setTender(false);
    setCourseAssignment(false);
    setUsers(false);
    // setCourseCategory(false);
    setDepartmentCreation(false);
    setFacultyPositionCreation(false);
    // setFacultyAdmin(false)
  }


  function logout(){

    window.location.hash = "/";
    localStorage.clear("user");
  }
  return (
    <div className="flex justify-between main-page-header">
      <div className="side-bar border-r-2 side-bar-wrapper">
        <div className=" text-center mb-8">
          <h3 className="text-lg   text-white font-bold ">
            Welcome NIGST Admin
          </h3>
        </div>
        <div>
          <ul className=" text-white cursor-pointer ">
            {departmentCreation ? <li style={{ background: "#1b3058", color: "#ffcb00" }} onClick={departmentFun}>
              Organization Creation
            </li> : <li onClick={departmentFun}>
              Organization Creation
            </li>}
            {facultyPositionCreation ? <li style={{ background: "#1b3058", color: "#ffcb00" }} onClick={facultyPositionFun}>
              Creation of Faculty Positions{" "}
            </li> : <li className="p-3 " onClick={facultyPositionFun}>
              Creation of Faculty Positions{" "}
            </li>}
            {/* {courseCategory ? <li style={{background:"#ffcb00"}} onClick={courseCategoryFun}>
              Course Category Creation
            </li> :  <li className="p-3 " onClick={courseCategoryFun}>
              Course Category Creation
            </li>} */}
            {courseAssignment ? <li style={{ background: "#1b3058", color: "#ffcb00" }} onClick={courseAssignmentFun}>
              Organization-Course Assignment
            </li> : <li className="p-3 " onClick={courseAssignmentFun}>
              Organization-Course Assignment
            </li>}
            {users ? <li style={{ background: "#1b3058", color: "#ffcb00" }} onClick={usersFun}>
              New User verifications
            </li> : <li className="p-3 " onClick={usersFun}>
              New User verifications
            </li>}
            {tender ? <li style={{ background: "#1b3058", color: "#ffcb00" }} onClick={handleTenderFun}>
              Tender
            </li> : <li className="p-3 " onClick={handleTenderFun}>
              Tender
            </li>}
            {
              announcement ? <li style={{background:"#ffcb00"}} onClick={announcementFun}>
              Announcement
            </li> : <li className="p-3 " onClick={announcementFun}>
              Announcement
            </li>
            }
            {/* {
              facultyAdmin ? <li style={{background:"#ffcb00"}} onClick={facultyAdminCreationFun}>
              Faculty Admin </li> : <li className="p-3 " onClick={facultyAdminCreationFun}>
              Faculty Admin
              </li>
            }
            <li className="p-3 ">Content Updation </li> */}
          </ul>
        </div>
      </div>
      <div className="content-wrapper-admin-panel w-full">
        <header className='h-240  w-full flex justify-evenly items-center'>

          <div>
            <img src={Logo} alt="logo" className='header-logo-admin-panel'></img>
          </div>
          <div style={{ position: 'absolute', right: '20px' }}><Button value={"Logout"} fun={logout} /> </div>
        </header>
        <div className="min-h-max flex justify-center border-t-2 min-h-[80%] flex-col">
          {departmentCreation ? <DepartmentCreation /> : ""}
          {facultyPositionCreation ? <CreationFacultyPosition /> : ""}
          {/* {courseCategory ? <CourseCategoryCreation /> : ""} */}
          {users ? <NewUserVerification /> : ""}
          {courseAssignment ? <DepartmentCourseAssignment /> : ""}
          {tender ? <Tender /> : ""}
          {announcement && <AnnouncementCreation/>}
          {/* {facultyAdmin ? <CreationFacultysAdmin/> : ""} */}
        </div>
      </div>
    </div>
  );
}
