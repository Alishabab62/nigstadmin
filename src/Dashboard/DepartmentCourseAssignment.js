import React, { useEffect, useState } from 'react'
import Inputs from "../components/Inputs";
import BouncyButton from "../components/Button";
import { Alert, Button, Switch} from '@mui/material';
import axios from 'axios';

export default function DepartmentCourseAssignment() {
  // const [responseCircular, setCircularResponse] = useState(false);
  const [filter, setFilter] = useState(false);
  const [orgView, setOrgView] = useState([]);
  const [orgName, setOrgName] = useState();
  // const [courseId , setCourseId] = useState();
  // const [successAlert, setSuccessAlert] = useState(false);
  const [failAlert, setFailAlert] = useState(false);
  const [failAlert1, setFailAlert1] = useState(false);
  // const [emptyFieldAlert, setEmptyFieldAlert] = useState(false);
  const [viewCourse, setViewCourse] = useState([]);
  const [category, setCategory] = useState("");
  const [courseCodeView, setCourseCode] = useState([])
  const [courseNumberView, setCourseNumber] = useState([]);
  const [code, setCode] = useState("");
  const [number, setNumber] = useState("");
  const [firstStep, setFirstStep] = useState(true);
  const [secondStep, setSecondStep] = useState(false);;
  const [thirdStep, setThirdStep] = useState(false)
  const [firstStepData, setFirstStepData] = useState([]);
  const [secondStepData, setSecondStepData] = useState([]);
  const [inputs, setInputs] = useState({
    description: "",
  });
const [error1,setError1] = useState(false);
  let courseCode = [
    {
      category: "basic",
      codes: ["CT-B", "ST-B", "SS-B", "SE-B"]
    },
    {
      category: "advance",
      codes: ["C-AG", "P-AL", "G-AG-A", "P-APR-A", "SS-B"]
    },
    {
      category: "short",
      codes: ["P-BP-S", "DS-S1", "DS-S2", "LID-S2", "DM-FE-S", "DM-DIGI-S", "GIS-ANA-S", "T-CSTS-S", "G-GPSTSL-S", "T-FOS-495", "G-HPL-S", "T-RM-S", "T-SM-S", "OFFICE-S"]
    },
    {
      category: "refresher",
      codes: ["OFFICE-R", "DM-TY-R", "DM-FE-R", "DM-EPM-R", "GIS-ADC-R", "GIS-ANA-R", "GIS-DM-INT-R", "DS-R", "LID-R", "P-MSRS-R", "P-BP-R", "T-FDC-R", "T-360c-R", "G-DT-R", "G-GG-R", "G-AS-R", "G-SG-R", "G-GG-R", "G-GGM-R", "G-MATH-R", "G-GNSS-R", "G-PG-R", "G-PG-R", "G-HPL-R", "G-GPSTS", "G-DMP-R"]

    }
  ]
  let courseNumber = [
    {
      category: "basic",
      number: [140, 150, 400, 500]
    },
    {
      category: "advance",
      number: [700, 710, 740, 750]
    },
    {
      category: "short",
      number: [480, 462, 464, 468, 364, 340, 440, 415, 690, 495, 558, 113, 112, 110]
    },
    {
      category: "refresher",
      number: [125, 350, 352, 354, 356, 358, 452, 454, 472, 482, 552, 556, 640, 642, 650, 654, 658, 664, 666, 668, 672, 790, 800]
    }
  ]

  useEffect(() => {
    courseCode.filter((data) => {
      if (data.category === category) {
        setCourseCode(data.codes)
      }
      return 0
    })

    courseNumber.filter((data) => {
      if (data.category === category) {
        return setCourseNumber(data.number)
      }
      return 0;
    })
  }, [category]);

  function handleFilter() {
    setFilter(!filter)
  }



  function handleInputs(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }

  useEffect(() => {
    orgViewFun();
    departmentView()
  }, [])


  function orgViewFun(){
    const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/dep/v";
    axios.get(url).then((res) => {
      setOrgView(res.data)
    }).catch((error) => {
      console.log(error)
    })
  }

  function departmentView() {
    const viewUrl = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/dep/viewda";
    axios.get(viewUrl).then((res) => {
      setViewCourse(res.data.reverse());
    }).catch((error) => {
      console.log(error);
    })
  }

  function handleCourseCodeAndNo(event) {
    event.preventDefault();
    const url = `http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/course/send_course/${code}/${number}/${category}`
    axios.get(url).then((res) => {
      setSecondStep(true);
      setFirstStep(false)
      setFirstStepData(res.data.course);
    }).catch((error) => {

      console.log(error.response.data.message)
      if(error.response.data.message === "No Course Found!"){
        setFailAlert1(true)
      }
      setTimeout(() => {
        setFailAlert1(false)
      }, 5000);
    })
  }
  function handleSecondStepCourseId(event) {
    event.preventDefault();
    const url = `http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/course/send_batch_info/${firstStepData[0].courseid}`;
    axios.get(url).then((res) => {
      setSecondStep(false);
      setThirdStep(true)
      setSecondStepData(res.data.course);
    }).catch((error) => {
      setError1(true);
      setTimeout(() => {
        setError1(false);
      }, 5000);
      console.log(error)
    })
  }

  function handleFinalSubmit(event) {
    event.preventDefault();
    const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/dep/organization_assign";
    const data = {
      organization: `${orgName}`,
      courseid: `${firstStepData[0].courseid}`,
      code: `${code}`,
      courseNo: `${number}`,
      batch: `${secondStepData[0].batch}`,
      schedulingID: `${secondStepData[0].schedulingid}`,
      commencement: `${secondStepData[0].commencementdate}`,
      completition: `${secondStepData[0].completiondate}`
    }
    axios.post(url, data).then((res) => {
      document.getElementById('form').reset();
      orgViewFun();
    }).catch((error) => {
      document.getElementById('form').reset();
      if(error.response.data.message === "This course already assigned to KSPL"){
        setFailAlert(true)
      }
      setTimeout(() => {
        setFailAlert(false)
      }, 5000);
    })
  }

  function handleDeAssignCourse(data1){
    const data={
      organization:`${data1.organization_name}`,
      schedulingID:`${data1.scheduling_id}`
    }
    const url ="http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/dep/deassign";
    axios.delete(url,{data}).then((res)=>{
      departmentView();
    }).catch((error)=>{
      console.log(error)
    })
  }

  return (
    <>
      {filter ? <div className='filter-wrapper-department'>
        <Inputs placeholder={"Search Organization"} />
        <Inputs placeholder={"Search Course Schedule Id"} />
        <BouncyButton value={"Apply"} />
      </div> : ""}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }} className="filter-btn">{!filter ? <BouncyButton value={"View Assigned Courses"} fun={handleFilter} /> : <BouncyButton value={"View Form"} fun={handleFilter} />}</div>
      {(filter && viewCourse.length>0) ? <div className='user-details-wrapper'>
        <table>
          <tr >
            <th>S.No</th>
            <th>Organization Name</th>
            <th>Course Assigning Id</th>
            <th>Course DeAssigning</th>
          </tr>
          {
            viewCourse.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.organization_name}</td>
                  <td>{data.course_id}</td>
                  <td onClick={()=>handleDeAssignCourse(data)} style={{cursor:"pointer"}}><Switch  defaultChecked /></td>
                </tr>
              )
            })
          }
        </table>
      </div> : ""}
      {
       (( viewCourse.length === 0 && filter)) && 
        <div style={{ width: "100%", textAlign: "center", fontSize: "30px", marginTop: "200px" }}>No data to show</div>
      }
      {!filter && <div className='department-creation-wrapper'>
       {failAlert ? <Alert severity='error'>This course id already assigned</Alert> : ""}
       {failAlert1 ? <Alert severity='error'>No course found</Alert> : ""}
       {error1 ? <Alert severity='error'>No Course Found or Course Not Scheduled for Assigning!</Alert> : ""}
        <h3>Department Course Assignment</h3>
      <form id='form'>
            <select style={{width:"100%",marginBottom:"9px"}} onChange={(e) => setOrgName(e.target.value)}>
              <option>Select Organization </option>
              {orgView.map((data, index) => {
                return <option value={data.organization} key={index}>{data.organization}</option>
              })}
            </select>
            <select style={{width:"100%"}}  onChange={(e) => {setCategory(e.target.value)
               setFirstStepData([]) 
               setSecondStep(false);
               setFirstStep(true);
               }}>
              <option value={"select"}>Select Course Category</option>
              <option value={"basic"}>Basic Course</option>
              <option value={"advance"}>Advance Course</option>
              <option value={"short"}>Short Term Course</option>
              <option value={"refresher"}>Refresher Course</option>
            </select>
            {
              category === "" ? "" : <select onChange={(e) => setCode(e.target.value)}>
                <option>Course Code</option>
                {
                  courseCodeView.map((data) => {
                    return <option value={data} key={data}>{data}</option>
                  })
                }
              </select>
            }
            {
              category === "" ? "" : <select onChange={(e) => setNumber(e.target.value)}>
                <option>Course Number</option>
                {
                  courseNumberView.map((data) => {
                    return <option key={data} value={data}>{data}</option>
                  })
                }
              </select>
            }
            {
            firstStepData.length !== 0 ? <div> <input type='text' value={firstStepData[0].courseid} disabled></input>
              <input type='text' value={firstStepData[0].coursename} disabled></input>
              <input type='text' value={firstStepData[0].description} disabled></input>
              </div> : ""
            } 
            {
              secondStepData.length !== 0 ? <div>
                <input type='text' value={secondStepData[0].schedulingid} disabled></input>
                <input type='text' value={secondStepData[0].batch} disabled></input>
                <input type='text' value={secondStepData[0].commencementdate} disabled></input>
                <input type='text' value={secondStepData[0].completiondate} disabled></input>
              </div> : ""
            }
            <input type="text" placeholder="Description" name="description" onChange={handleInputs} />
            {firstStep &&   <Button style={{width:"100%"}}  sx={{bgcolor:"#1b3058",color:"white"}} variant="contained" onClick={handleCourseCodeAndNo} value={"Submit"}>Submit</Button>}

            {secondStep && <Button style={{width:"100%"}}  sx={{bgcolor:"#1b3058",color:"white"}} variant="contained" onClick={handleSecondStepCourseId} value={"Confirm"}>Confirm</Button>}
            {thirdStep  && <Button style={{width:"100%"}}  sx={{bgcolor:"#1b3058",color:"white"}} variant="contained" onClick={handleFinalSubmit} value={"Submit"}>Submit</Button>}

          </form>
      </div>
      }
    </>
  )
}
