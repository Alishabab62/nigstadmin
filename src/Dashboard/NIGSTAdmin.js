import { TextField } from "@mui/material";
import React, { useState } from "react";
import "../CSS/app.css";
import DepartmentCreation from "./DepartmentCreation";
import CreationFacultyPosition from "./CreationFacultyPosition";
import Button from "../components/Button";
import CourseCategoryCreation from "./CourseCategoryCreation";
import NewUserVerification from "./NewUserVerification";
import DepartmentCourseAssignment from "./DepartmentCourseAssignment";
import Tender from "./Tender";

export default function NIGSTAdmin() {
  const [departmentCreation, setDepartmentCreation] = useState(false);
  const [facultyPositionCreation, setFacultyPositionCreation] = useState(false);
  const [courseCategory, setCourseCategory] = useState(false);
  const [users, setUsers] = useState(false);
  const [courseAssignment, setCourseAssignment] = useState(false); 
  const [tender, setTender] = useState(false);

  function departmentFun() {
    setDepartmentCreation(true);
    setFacultyPositionCreation(false);
    setCourseCategory(false);
    setUsers(false);
    setCourseAssignment(false);
    setTender(false);
  }
  function facultyPositionFun() {
    setFacultyPositionCreation(true);
    setDepartmentCreation(false);
    setCourseCategory(false);
    setUsers(false);
    setCourseAssignment(false);
    setTender(false);
  }
  function courseCategoryFun() {
    setCourseCategory(true);
    setDepartmentCreation(false);
    setFacultyPositionCreation(false);
    setUsers(false);
    setCourseAssignment(false);
    setTender(false);
  }
  function facultyAdminFun() {
    setDepartmentCreation(false);
    setFacultyPositionCreation(false);
    setCourseCategory(false);
    setUsers(false);
    setCourseAssignment(false);
    setTender(false);
  }
  function usersFun() {
    setUsers(true);
    setCourseCategory(false);
    setDepartmentCreation(false);
    setFacultyPositionCreation(false);
    setCourseAssignment(false);
    setTender(false);
  }
  function courseAssignmentFun() {
    setCourseAssignment(true);
    setUsers(false);
    setCourseCategory(false);
    setDepartmentCreation(false);
    setFacultyPositionCreation(false);
    setTender(false);
  }
  function handleTenderFun() {
    setTender(true);
    setCourseAssignment(false);
    setUsers(false);
    setCourseCategory(false);
    setDepartmentCreation(false);
    setFacultyPositionCreation(false);
  }
  return (
    <div className="flex justify-between">
      <div className="side-bar border-r-2 side-bar-wrapper">
        <div className=" text-center pt-14 pb-14  border-b-2 mb-8">
          <h3 className="text-lg   text-white font-bold ">
            Welcome NIGST Admin
          </h3>
        </div>
        <div>
          <ul className=" text-white cursor-pointer ">
            <li className="p-3 " onClick={departmentFun}>
              Department/Organization Creation
            </li>
            <li className="p-3 " onClick={facultyPositionFun}>
              Creation of Faculty Positions{" "}
            </li>
            <li className="p-3 " onClick={courseCategoryFun}>
              Course Category Creation
            </li>
            <li className="p-3 " onClick={courseAssignmentFun}>
              Department/Organization-Course Assignment
            </li>
            <li className="p-3 " onClick={usersFun}>
              New User verifications
            </li>
            <li className="p-3 " onClick={handleTenderFun}>
              Tender{" "}
            </li>
            <li className="p-3 ">Content Updation </li>
          </ul>
        </div>
      </div>
      <div className="content-wrapper-admin-panel w-full">
        <header className="h-240  w-full flex justify-evenly items-center">
          <div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              placeholder="Search here"
              className="w-80"
            />
          </div>
          <div>
            {/* <img src={Logo} alt="logo" className='header-logo-admin-panel'></img> */}
          </div>
          <div>
            <Button value={"Login"} />{" "}
          </div>
        </header>
        <div className="min-h-max flex justify-center border-t-2">
          {departmentCreation ? <DepartmentCreation /> : ""}
          {facultyPositionCreation ? <CreationFacultyPosition /> : ""}
          {courseCategory ? <CourseCategoryCreation /> : ""}
          {users ? <NewUserVerification /> : ""}
          {courseAssignment ? <DepartmentCourseAssignment /> : ""}
          {tender ? <Tender /> : ""}
        </div>
      </div>
    </div>
  );
}
