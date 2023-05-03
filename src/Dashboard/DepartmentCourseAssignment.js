import React, { useEffect, useState } from 'react'
import Inputs from "../components/Inputs";
import Button from "../components/Button";
// import { Alert, CircularProgress } from '@mui/material';
import axios from 'axios';

export default function DepartmentCourseAssignment() {
  // const [responseCircular, setCircularResponse] = useState(false);
  const [filter, setFilter] = useState(false);
  const [orgView , setOrgView] = useState([]);
  const [orgName , setOrgName] = useState();
  // const [courseId , setCourseId] = useState();
  // const [successAlert, setSuccessAlert] = useState(false);
  // const [failAlert, setFailAlert] = useState(false);
  // const [emptyFieldAlert, setEmptyFieldAlert] = useState(false);
  const [viewCourse , setViewCourse] = useState([]);
  const [category , setCategory] = useState("");
  const [courseCodeView , setCourseCode] = useState([])
  const [courseNumberView , setCourseNumber] = useState([]);
  const [code, setCode] = useState("");
  const [number,setNumber] = useState("");
  const [firstStep , setFirstStep] = useState(true);
  const [secondStep,setSecondStep] = useState(false);;
  const [thirdStep , setThirdStep] = useState(false)
  const [firstStepData, setFirstStepData] = useState([]);
  const [secondStepData , setSecondStepData] = useState([]);
  const [inputs, setInputs] = useState({
    description: "",
  });

  let courseCode = [
      {
        category:"basic",
        codes:["CT-B" ,"ST-B" ,"SS-B" , "SE-B"]
      },
      {
        category:"advance",
        codes:["C-AG","P-AL" , "G-AG-A" , "P-APR-A" , "SS-B"]
      },
      {
        category:"short",
        codes:["P-BP-S","DS-S1","DS-S2","LID-S2" , "DM-FE-S","DM-DIGI-S" , "GIS-ANA-S","T-CSTS-S","G-GPSTSL-S","T-FOS-495","G-HPL-S","T-RM-S","T-SM-S","OFFICE-S"]
      },
      {
        category:"refresher",
        codes:["OFFICE-R" , "DM-TY-R" , "DM-FE-R","DM-EPM-R" , "GIS-ADC-R","GIS-ANA-R","GIS-DM-INT-R","DS-R","LID-R","P-MSRS-R","P-BP-R","T-FDC-R","T-360c-R","G-DT-R","G-GG-R","G-AS-R","G-SG-R","G-GG-R","G-GGM-R","G-MATH-R","G-GNSS-R","G-PG-R","G-PG-R","G-HPL-R","G-GPSTS","G-DMP-R"]

      }
    ]
    let courseNumber = [
      {
        category:"basic",
        number:[140,150,400,500]
      },
      {
        category:"advance",
        number:[700,710,740,750]
      },
      {
        category:"short",
        number:[480,462,464,468,364,340,440,415,690,495,558,113,112,110]
      },
      {
        category:"refresher",
        number:[125,350,352,354,356,358,452,454,472,482,552,556,640,642,650,654,658,664,666,668,672,790,800]
      }
    ]

    useEffect(()=>{
      courseCode.filter((data)=>{
       if(data.category === category){
       setCourseCode(data.codes)
       }
       return 0
     })
     
     courseNumber.filter((data)=>{
       if(data.category === category){
       return  setCourseNumber(data.number)
       }
       return 0;
     })
   },[category]);

  function handleFilter() {
    setFilter(true)
  }



  function handleInputs(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
    console.log(inputs)
  }

  useEffect(()=>{
    const url = "https://nigst.onrender.com/dep/v";
    axios.get(url).then((res)=>{
      setOrgView(res.data)
    }).catch((error)=>{
      console.log(error)
    })
  departmentView()
  },[])

  function departmentView(){
    const viewUrl = "https://nigst.onrender.com/dep/viewda";
    axios.get(viewUrl).then((res)=>{
      setViewCourse(res.data.reverse());
    }).catch((error)=>{
      console.log(error);
    })
  }

  function handleCourseCodeAndNo(event){
    event.preventDefault();
    const url = `https://nigst.onrender.com/course/send_course/${code}/${number}/${category}`
    axios.get(url).then((res)=>{
      console.log(res)
      setFirstStep(false)
      setSecondStep(true)
      setFirstStepData(res.data.course);
    }).catch((error)=>{
      console.log(error)
    })
  }
  function handleSecondStepCourseId(event){
    event.preventDefault();
    const url =`https://nigst.onrender.com/course/send_batch_info/${firstStepData[0].courseid}`;
    axios.get(url).then((res)=>{
      console.log(res)
      setSecondStep(false);
      setThirdStep(true)
      setSecondStepData(res.data.course);
    }).catch((error)=>{
      console.log(error)
    })
  }
 
  function handleFinalSubmit(event){
    event.preventDefault();
    const url = "https://nigst.onrender.com/dep/organization_assign";
    const data={
      organization: `${orgName}`,
      courseid:`${firstStepData[0].courseid}`,
      code:`${code}`,
      courseNo:`${number}`,
      batch:`${secondStepData[0].batch}`,
      schedulingID:`${secondStepData[0].schedulingid}`,
      commencement:`${secondStepData[0].commencementdate}`,
      completition:`${secondStepData[0].completiondate}`
    }
    axios.post(url,data).then((res)=>{
      console.log(res)
    }).catch((error)=>{
      console.log(error)
    })
  }
  return (
    <>
    {filter ? <div className='filter-wrapper-department'>
       <Inputs placeholder={"Search Organization"}/>
       <Inputs placeholder={"Search Course Schedule Id"}/>
        <Button value={"Apply"} />
      </div> : ""} 
      <div className="filter-btn">{!filter ? <Button value={"View Assigned Courses"} fun={handleFilter} /> : ""}</div>
      {filter ? <div className='user-details-wrapper'>
        <table>
          <tr >
            <th>S.No</th>
            <th>Organization Name</th>
            <th>Course Assigning Id</th>
            <th>Description</th>
          </tr>
          {
            viewCourse.map((data,index)=>{
              return(
            <tr key={index}>
            <td>{index+1}</td>
            <td>{data.organization_name}</td>
            <td>{data.course_id}</td>
            <td>{data.des}</td>
          </tr>
              )
            })
          }
        </table>
      </div> : ""}
    {!filter ? <div className='department-creation-wrapper'>
          {/* {successAlert ? <Alert severity="success" style={{marginBottom:"10px"}}>Department Course Assignment Create successfully</Alert> : ""}
          {failAlert ? <Alert severity="error" style={{marginBottom:"10px"}}>Something Went Wrong Please try again later</Alert> : ""}
          {emptyFieldAlert ? <Alert severity="error" style={{marginBottom:"10px"}}>All fields required</Alert> : ""} */}
         {/* {responseCircular ? (
        <div
          style={{
            width: "29%",
            height: "30%",
            left: "33%",
            backgroundColor: "rgb(211,211,211)",
            borderRadius: "10px",
            top: "100px",
            position: "absolute",
            padding: "10px 20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress style={{ height: "50px", width: "50px" }} />
        </div>
      ) : (
        ""
      )} */}
        <h3>Department Course Assignment</h3>
     
      
     {
      firstStep && <form>
      <select onChange={(e)=>setCategory(e.target.value)}>
     <option value={"select"}>Select Course Category</option>
     <option value={"basic"}>Basic Course</option>
     <option value={"advance"}>Advance Course</option>
     <option value={"short"}>Short Term Course</option>
     <option value={"refresher"}>Refresher Course</option>
   </select>
       {
     category === "" ?  "" : <select onChange={(e)=>setCode(e.target.value)}>
     <option>Course Code</option>
     {
       courseCodeView.map((data)=>{
         return <option value={data} key={data}>{data}</option>
       })
     }
   </select> 
   }
  {
   category === "" ? "" : <select onChange={(e)=>setNumber(e.target.value)}>
   <option>Course Number</option>
   {
     courseNumberView.map((data)=>{
       return <option key={data} value={data}>{data}</option>
     })
   }
 </select> 
  }
  <button onClick={handleCourseCodeAndNo}>Submit</button>
      </form>
     }   
{
  secondStep && <form>
    <input type='text' value={firstStepData[0].courseid}></input>
    <input type='text' value={firstStepData[0].coursename}></input>
    <input type='text' value={firstStepData[0].description}></input>
    <button onClick={handleSecondStepCourseId}>Confirm</button>
  </form>
}
{
  thirdStep && <form>
     <select onChange={(e)=> setOrgName(e.target.value)}>
        <option>Select Organization </option>
        {orgView.map((data , index)=>{
          return <option value={data.organization} key={index}>{data.organization}</option>
        })}
      </select>
      <input type='text' value={secondStepData[0].schedulingid} disabled></input>
      <input type='text' value={secondStepData[0].batch} disabled></input>
      <input type='text' value={secondStepData[0].commencementdate} disabled></input>
      <input type='text' value={secondStepData[0].completiondate} disabled></input>
      <Inputs type={"text"} placeholder={"Description"} name={"description"} fun={handleInputs}/> 
      <Button value={"Submit"} fun={handleFinalSubmit}/>
  </form>
}
    </div> : ""}
    </>
  )
}
