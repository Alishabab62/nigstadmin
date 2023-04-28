import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { getAllISOCodes } from 'iso-country-currency';

export default function CourseScheduling() {

  const completionDate = useRef();
  const commencementDate = useRef();
  const runningDate = useRef();
  const courseId = useRef();
  const feeRef = useRef();
  const [input , setInput] = useState({
    fee:"",
    courseCapacity:""
  });
  const [courseName , setCourseName] = useState("");
  const [currency , setCurrency] = useState([]);
  const [inputCurrency , setInputCurrency] = useState("");
  const [viewData,setViewData] = useState([]);
  const [tempArray,setTempArray] = useState([]);
  const [viewFrame , setViewFrame] = useState(false);
  const [viewScheduledCourse , setScheduledCourse] = useState([]);


  function handleInputs(e){
    const {name,value} = e.target;
    setInput((prevInput)=>({
      ...prevInput , [name]:value
    }));
  }

  useEffect(()=>{
    setCurrency(getAllISOCodes());
  let data = JSON.parse(localStorage.getItem("user"));
  const url = `https://nigst.onrender.com/admin/course_faculty/${data.faculty}`;
    axios.get(url).then((res)=>{
      setViewData(res.data.course)
    }).catch((error)=>{
      console.log(error)
    })
    
    const viewDataUrl = "https://nigst.onrender.com/course/view_scheduled";
    axios.get(viewDataUrl).then((res)=>{
      setScheduledCourse(res.data.data);
    }).catch((error)=>{
      console.log(error);
    })
  },[])

    function handleCourseScheduling(){
        const url ="https://nigst.onrender.com/course/scheduler";
        const data ={
          courseName:`${courseName}`,
          fees:`${input.fee}`,
          dateCommencement:`${commencementDate.current.value}`,
          dateCompletion:`${completionDate.current.value}`,
          courseCapacity:`${input.courseCapacity}`,
          runningDate:`${runningDate.current.value}`,
          currency:`${inputCurrency}`,
          courseID:`${courseId.current.innerText}`
        }
        console.log(data)
        axios.post(url,data).then((res)=>{
          console.log(res)
        }).catch((error)=>{
          console.log(error)
        }) 

    }

    useEffect(()=>{
     viewData.filter((data)=>{
       if(data.title === courseName){
        setTempArray(data);
      }
      return 1;
        });
    },[courseName]);

    function changeView(){
      setViewFrame(!viewFrame);
    }
    // status,batch,courseID,newStatus,newRunningDate,newComencementDate,newCompletionDate
function handleCourseEdit(){
  setViewFrame(false);
  // feeRef.current.value = "232"
  console.log(feeRef)
  const url = "https://nigst.onrender.com/admin/updateSchedule";
  const data={
    status:`${""}`,
    batch:`${""}`,
    courseID:`${""}`,
    newStatus:`${""}`,
    newRunningDate:`${""}`,
    newComencementDate:`${""}`,
    newCompletionDate:`${""}`
  }
  axios.patch(url,data).then((res)=>{
    console.log(res)
  }).catch((error)=>{
    console.log(error)
  })
}

  return (
    <>
     <div style={{position:"absolute" , top:"120px" , right:"20px"}}>
      {
        viewFrame ? <button onClick={changeView}>Schedule Course</button> : <button onClick={changeView}>View Scheduled Course</button>
      }
    </div>
    {
    viewFrame ?   <div className='user-details-wrapper'>
    <table>
      <tbody>
        <tr>
            <th>S.No</th>
            <th>Course Title</th>
            <th>Date Commencement</th>
            <th>Date Completion</th>
            <th>Course Capacity</th>
            <th>Course Fee</th>
            <th>Batch No.</th>
            <th>Course Status</th>
            <th>Running Date</th>
            <th>Scheduling Date</th>
            <th>Edit</th>
        </tr>
        {
          viewScheduledCourse.map((data,index)=>{
            return (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{data.title}</td>
                <td>{data.datecomencement}</td>
                <td>{data.datecompletion}</td>
                <td>{data.coursecapacity}</td>
                <td>{data.fee}</td>
                <td>{data.batch}</td>
                <td>{data.status}</td>
                <td>{data.runningdate}</td>
                <td>{data.schedulingdate}</td>
                <td onClick={handleCourseEdit} style={{cursor:"pointer"}}>Edit</td>
              </tr>
            )
          })
        }
          </tbody>
    </table>
    </div>  : ""
  }
   {
    !viewFrame ? 
   
    <div className='course-creation-wrapper'>
        <h3>Course Scheduling</h3>
        <select onChange={(e)=>setCourseName(e.target.value)}>
          <option>Select Course</option>
          {
            viewData.map((data,index)=>{
              return <option value={data.title} key={index}>{data.title}</option>
            })
          }
        </select>
          {
          tempArray.length  !== 0 ? <div ref={courseId}>{tempArray.course_id}</div> : ""
          }
        {
          tempArray.length !== 0 ? <div>{tempArray.description}</div> : ""
        }
         {
          tempArray.length !== 0 ? <div>{tempArray.duration}</div> : ""
        }
        {
          tempArray.length !== 0 ? <div>{tempArray.course_code}</div> : ""
        }
         {
          tempArray.length !== 0 ? <div>{tempArray.course_no}</div> : ""
        }
        <div style={{display:"flex"}}>
          <select onChange={(e)=>setInputCurrency(e.target.value)}>
            <option>Select currency</option>
            <option value="INR">INR</option>
            {
              currency.map((data,index)=>{
                return <option key={index} value={data.currency}>{data.currency}</option>
              })
            }
          </select>
        <input type='text' placeholder='Enter Fee' name='fee' onChange={handleInputs} ref={feeRef} value="635563"></input>
        </div>
        <input type='date' placeholder='Date Of Commencement' ref={commencementDate}></input>
        <input type='date' placeholder='Date of Completion' ref={completionDate}></input>
        <input type='date' placeholder='Running Date' ref={runningDate}></input>
        <input type='text' placeholder='Enter Course Capacity' name='courseCapacity' onChange={handleInputs}></input>
      <button  onClick={handleCourseScheduling}>Submit</button>
    </div> : ""
      }
    </>
  )
}
