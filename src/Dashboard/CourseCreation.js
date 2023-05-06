import React, { useEffect, useState } from 'react'
import Inputs from '../components/Inputs'
import Button from '../components/Button';
import axios from 'axios';


export default function CourseCreation() {
    let weeks = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52];
    let days = [0,1,2,3,4,5,6];
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
    const [category , setCategory] = useState("");
    const [courseCodeView , setCourseCode] = useState([])
    const [courseNumberView , setCourseNumber] = useState([])
    const [faculty , setFaculty] = useState([]);
    const [code, setCode] = useState("");
    const [number,setNumber] = useState("");
    const [userData,setUserData] = useState("");
    const [facultyId,setFacultyId] = useState("");
    const [courseDurDays , setCourseDurDays] = useState(""); 
    const [courseDurWeeks , setCourseDurWeeks] = useState(""); 
    const [courseFee , setCourseFee] = useState("");
    const [courseMode , setCourseMode] = useState("");
    const [viewData , setViewData] = useState([]);
    const [viewFrame , setViewFrame] = useState(false);
    
    const [input,setInput] = useState({
      title:"",
      des:""
    })

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

  function handleInputs(e){
    const {name , value} = e.target;
    setInput((prevInput)=>({
      ...prevInput , [name]:value
    }));
  }

useEffect(()=>{
  let data = JSON.parse(localStorage.getItem("user"));
  setUserData(data)
  const urlFaculty = `http://ec2-65-2-161-9.ap-south-1.compute.amazonaws.com/admin/faculty_member_faculty/${data.faculty}`;
    axios.get(urlFaculty).then((res)=>{
      setFaculty(res.data.data)
    }).catch((error)=>{
      console.log(error)
    })
    
const url = `http://ec2-65-2-161-9.ap-south-1.compute.amazonaws.com/admin/course_faculty/${data.faculty}`;
axios.get(url).then((res)=>{
  setViewData(res.data.course);
}).catch((error)=>{
  console.log(error)
})

},[])

    function handleCourseCreation(){
        const url = "http://ec2-65-2-161-9.ap-south-1.compute.amazonaws.com/course/creation";
        const data={
          courseCategory:`${category}`,
          title:`${input.title}`,
          courseCode:`${code}`,
          courseNo:`${number}`,
          eligibility:"",
          courseDirector:`${userData.faculty}`,
          courseOfficer:`${facultyId}`,
          courseDurationInDays:`${courseDurDays}`,
          courseDurationInWeeks:`${courseDurWeeks}`,
          faculty:`${userData.faculty}`,
          type:`${courseFee}`,
          mode:`${courseMode}`,
          description:`${input.des}`
        }
        axios.post(url,data).then((res)=>{
          console.log(res)
        }).catch((error)=>{
          console.log(error)
        })
    }

    function changeView(){
      setViewFrame(!viewFrame);
    }
    
    const [searchData, setSearchData] = useState("");

    const handleInputChange1 = (event) => {
      setSearchData(event.target.value);
      const input = event.target.value.toLowerCase();
      const rows = document.querySelectorAll("#Courses tr");
  
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
    <>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      {
        viewFrame ? <button className='toggle_btn' onClick={changeView}>Create Course</button> : <button className='toggle_btn' onClick={changeView}>View Created Course</button>
      }
    </div>
    {
    viewFrame ?
    <div>
       <input type="text" id="SearchInput" placeholder="Search Cousres" value={searchData} onChange={handleInputChange1} />
    
    <div className='user-details-wrapper'>
    <table>
      <thead>
        <tr>
        <th colSpan="13" style={{ textAlign: "center", backgroundColor: "#ffcb00" }}>COURSES</th>
        </tr>
        <tr>
            <th>S.No</th>
            <th>Created At</th>
            <th>Course Category</th>
            <th>Course Code</th>
            <th>Course No</th>
            <th>Course Title</th>
            <th>Course Description</th>
            <th>Course Mode</th>
            <th>Course Duration</th>
            <th>Course Type</th>
            <th>Course Director</th>
            <th>Faculty</th>
            <th>Course Officer</th>
        </tr>
        </thead>
        <tbody id='Courses'>
        {
          viewData.map((data,index)=>{
            return (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{data.createdat}</td>
                <td>{data.course_category}</td>
                <td>{data.course_code}</td>
                <td>{data.course_no}</td>
                <td>{data.title}</td>
                <td>{data.description}</td>
                <td>{data.course_mode}</td>
                <td>{data.duration}</td>
                <td>{data.course_type}</td>
                <td>{data.course_director}</td>
                <td>{data.course_director}</td>
                <td>{data.course_officer}</td>
              </tr>
            )
          })
        }
          </tbody>
    </table>
    </div>
    </div>  : ""
  }
  {
    !viewFrame ?  <div className='course-creation-wrapper'>
    <h3>Course Creation</h3>
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
  
   <Inputs type={"text"} placeholder={"Enter course title"} name={"title"} fun={handleInputs}/>
    <Inputs type={"text"} placeholder={"Course Description"} name={"des"} fun={handleInputs}/>
  <div className='grid2-container'>
    <select onChange={(e)=>setCourseDurWeeks(e.target.value)}>
        <option>Select Weeks</option>
        {
            weeks.map((data)=>{
                return <option key={data}>{data}</option>
            })
        }
    </select>
    <select onChange={(e)=>setCourseDurDays(e.target.value)}>
        <option>Select Days</option>
        {
            days.map((data)=>{
                return <option key={data}>{data}</option>
            })
        }
    </select>
  </div>
  <select onChange={(e)=>setFacultyId(e.target.value)}>
    <option>Select Course Officer</option>
    {
      faculty.map((data,index)=>{
        return <option key={index} value={data.facultyid}>{data.firstname}{data.middlename}{data.lastname}</option>
      })
    }
  </select>
  <div style={{display:"flex", alignItems:"center" , background:"none" , borderRadius:"5px",margin:"0px auto", width:"auto"}}>
    <input type='radio' value={"free"} style={{marginRight:"5px"}} onChange={(e)=>setCourseFee(e.target.value)}></input><span style={{marginRight:"10px"}}>Free</span>
    <input type='radio' value={"paid"}></input><span style={{marginRight:"50px" , marginLeft:"5px"}} onChange={(e)=>setCourseFee(e.target.value)}>Paid</span>
  </div>
  <select onChange={(e)=>setCourseMode(e.target.value)}>
    <option>Select Mode of Course</option>
    <option>Classroom</option>
    <option>Online</option>
    <option>Hybrid</option>
  </select>
  <Button value={"Submit"} fun={handleCourseCreation}/>
</div> : ""
  }
   
    </>
  )
}
