import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { getAllISOCodes } from 'iso-country-currency';

export default function CourseScheduling() {

  const completionDate = useRef();
  const commencementDate = useRef();
  const runningDate = useRef();
  const courseId = useRef();
  const feeRef = useRef();
  const [input, setInput] = useState({
    fee: "",
    courseCapacity: ""
  });
  const [courseName, setCourseName] = useState("");
  const [currency, setCurrency] = useState([]);
  const [inputCurrency, setInputCurrency] = useState("");
  const [viewData, setViewData] = useState([]);
  const [tempArray, setTempArray] = useState([]);
  const [viewForm, setViewForm] = useState(true);
  // const [viewDataUI,setViewDataUI] = useState(false);
  const [viewScheduledCourse, setScheduledCourse] = useState([]);
  const [editForm, setEditForm] = useState(false);
  const [newCommencementDate, setNewCommencementDate] = useState("");
  const [newRunningDate, setNewRunningDate] = useState("");
  const [newCompletionDate, setNewCompletionDate] = useState("");
  const [newStatus, setNewStatus] = useState("")
  const [editData, setEditData] = useState({
    courseStatus: "",
    courseBatch: "",
    courseId: ""
  });
  const [viewFrame, setFrame] = useState(false);
  function handleInputs(e) {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput, [name]: value
    }));
  }

  useEffect(() => {
    setCurrency(getAllISOCodes());
    let data = JSON.parse(localStorage.getItem("user"));
    const url = `http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/admin/course_faculty/${data.faculty}`;
    axios.get(url).then((res) => {
      setViewData(res.data.course)
    }).catch((error) => {
      console.log(error)
    })

    const viewDataUrl = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/course/view_scheduled";
    axios.get(viewDataUrl).then((res) => {
      setScheduledCourse(res.data.data);
    }).catch((error) => {
      console.log(error);
    })
  }, [])

  function handleCourseScheduling() {
    const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/course/scheduler";
    const data = {
      courseName: `${courseName}`,
      fees: `${input.fee}`,
      dateCommencement: `${commencementDate.current.value}`,
      dateCompletion: `${completionDate.current.value}`,
      courseCapacity: `${input.courseCapacity}`,
      runningDate: `${runningDate.current.value}`,
      currency: `${inputCurrency}`,
      courseID: `${courseId.current.innerText}`
    }
    console.log(data)
    axios.post(url, data).then((res) => {
      console.log(res)

    }).catch((error) => {
      console.log(error)
    })

  }

  useEffect(() => {
    viewData.filter((data) => {
      if (data.title === courseName) {
        setTempArray(data);
      }
      return 1;
    });
  }, [courseName]);

  function changeView() {
    setViewForm(false);
    setFrame(true)
    // setViewDataUI(true);
    setEditForm(false)
  }

  function handleCourseEditForm(event) {
    event.preventDefault();
    console.log(editData)
    const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/admin/updateSchedule";
    const data = {
      status: editData.courseStatus,
      batch: editData.courseBatch,
      courseID: editData.courseId,
      newStatus: newStatus,
      newRunningDate: newRunningDate,
      newComencementDate: newCommencementDate,
      newCompletionDate: newCompletionDate,
    };
    console.log(data);
    axios
      .patch(url, data)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleEditForm(event) {
    setEditForm(true)
    setFrame(false)
    const courseStatus = event.target.parentElement.children[8].innerText;
    const courseBatch = event.target.parentElement.children[7].innerText;
    const courseId = event.target.parentElement.children[2].innerText;
    const dataEdit = { courseStatus, courseBatch, courseId };
    setEditData(dataEdit);
  }


  const [searchData, setSearchData] = useState("");

  const handleInputChange1 = (event) => {
    setSearchData(event.target.value);
    const input = event.target.value.toLowerCase();
    const rows = document.querySelectorAll("#scheduling tr");

    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      let shouldHide = true;

      cells.forEach((cell) => {
        if (cell.textContent.toLowerCase().includes(input)) {
          shouldHide = false;
        }
      });

      if (shouldHide) {
        row.classList.add("hidden");
      } else {
        row.classList.remove("hidden");
      }
    });
  };


  return (
    <div style={{display:"flex" , flexDirection:"column"}}> 
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {

          viewFrame ? <button className='toggle_btn' onClick={changeView}>Schedule Course</button> : <button className='toggle_btn' onClick={changeView}>View Scheduled Course</button>
        }
      </div>
      {
        viewFrame ?
          <div>
            <input type="text" id="SearchInput" placeholder="Search Scheduled Courses" value={searchData} onChange={handleInputChange1} />

            <div className='user-details-wrapper'>

              <table>
                <thead>
                  <tr>
                    <th colSpan="11" style={{ textAlign: "center", backgroundColor: "#ffcb00" }}>SCHEDULED COURSES</th>
                  </tr>

                  <tr>
                    <th>S.No</th>
                    <th>Course Title</th>
                    <th>Course Id</th>
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
                </thead>
                <tbody id='scheduling'>
                  {
                    viewScheduledCourse.map((data, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{data.title}</td>
                          <td>{data.courseid}</td>
                          <td>{data.datecomencement}</td>
                          <td>{data.datecompletion}</td>
                          <td>{data.coursecapacity}</td>
                          <td>{data.fee}</td>
                          <td>{data.batch}</td>
                          <td>{data.status}</td>
                          <td>{data.runningdate}</td>
                          <td>{data.schedulingdate}</td>
                          <td onClick={handleEditForm} style={{ cursor: "pointer" }}>Edit</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div> : ""
      }
      {
        viewForm ?
          <div className='course-creation-wrapper'>
            <h3>Course Scheduling</h3>
            <select onChange={(e) => setCourseName(e.target.value)}>
              <option>Select Course</option>
              {
                viewData.map((data, index) => {
                  return <option value={data.title} key={index}>{data.title}</option>
                })
              }
            </select>
            {
              tempArray.length !== 0 ? <div ref={courseId}>{tempArray.course_id}</div> : ""
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

            <div className='grid2-container' >

              <select onChange={(e) => setInputCurrency(e.target.value)}>
                <option>Select currency</option>
                <option value="INR">INR</option>
                {
                  currency.map((data, index) => {
                    return <option key={index} value={data.currency}>{data.currency}</option>
                  })
                }
              </select>

              <input type='text' placeholder='Enter Fee' name='fee' onChange={handleInputs} ref={feeRef} ></input>
            </div>
            <input type='text' onFocus={() => { commencementDate.current.type = 'date' }} onBlur={() => { commencementDate.current.type = 'text' }} placeholder='Date Of Commencement' ref={commencementDate}></input>
            <input type='text' onFocus={() => { completionDate.current.type = 'date' }} onBlur={() => { completionDate.current.type = 'text' }} placeholder='Date of Completion' ref={completionDate}></input>
            <input type='text' onFocus={() => { runningDate.current.type = 'date' }} onBlur={() => { runningDate.current.type = 'text' }} placeholder='Running Date' ref={runningDate}></input>
            <input type='text' placeholder='Enter Course Capacity' name='courseCapacity' onChange={handleInputs}></input>

            <button onClick={handleCourseScheduling}>Submit</button>
          </div> : ""
      }
      {
        editForm &&
        <div className='department-creation-wrapper'>
          <h3>Update Course Status</h3>
          <form>
            <select onChange={(e) => setNewStatus(e.target.value)}>
              <option>Select Status</option>
              {editData.courseStatus === "created" ? <option value='schedule'>Schedule</option> : ""}
              {editData.courseStatus === "created" ? <option value='running'>Running</option> : ""}
              {editData.courseStatus === "created" ? <option value='postponed'>Postponed</option> : ""}
              {editData.courseStatus === "created" ? <option value='canceled'>Cancelled</option> : ""}
              {editData.courseStatus === "scheduled" ? <option value='running'>Running</option> : ""}
              {editData.courseStatus === "scheduled" ? <option value='postponed'>Postponed</option> : ""}
              {editData.courseStatus === "scheduled" ? <option value='canceled'>Cancelled</option> : ""}
              {editData.courseStatus === "running" ? <option value='complete'>Complete</option> : ""}
              {editData.courseStatus === "postponed" ? <option value='canceled'>Cancelled</option> : ""}
            </select>
            <input type='text' value={editData.courseId} disabled></input>
            <input type='date' placeholder='newCommencementDate' onChange={(e) => setNewCommencementDate(e.target.value)}></input>
            <input type='date' placeholder='newCompletionDate' onChange={(e) => setNewCompletionDate(e.target.value)}></input>
            <input type='date' placeholder='newRunningDate' onChange={(e) => setNewRunningDate(e.target.value)}></input>
            <button onClick={handleCourseEditForm}>Submit</button>
          </form> </div>
      }
    </div>
  )
}
