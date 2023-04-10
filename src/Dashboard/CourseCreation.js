import React, { useEffect, useState } from 'react'
import Inputs from '../components/Inputs'
import Button from '../components/Button';
// import axios from 'axios';

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
    

    useEffect(()=>{
        // const url = "https://nigst.onrender.com/category/view"
        // axios.get(url).then((res)=>{
        //   setCategory(res.data.categories)
        //   console.log(res);
        // }).catch((error)=>{
        //   console.log(error)
        // })

      courseCode.filter((data)=>{
      if(data.category === category){
      return  setCourseCode(data.codes)
      }
    })
    courseNumber.filter((data)=>{
      if(data.category === category){
      return  setCourseNumber(data.number)
      }
    })
    
      },[category])

    function handleCourseCreation(){
        console.log("Function Called")
    }
  return (
    <div className='course-creation-wrapper'>
        <h3>Course Creation</h3>
      <select onChange={(e)=>setCategory(e.target.value)}>
        <option value={"select"}>Select Course Category</option>
        <option value={"basic"}>Basic Course</option>
        <option value={"advance"}>Advance Course</option>
        <option value={"short"}>Short Term Course</option>
        <option value={"refresher"}>Refresher Course</option>
      </select>
      {
        category === "" ?  "" : <select>
        <option>Course Code</option>
        {
          courseCodeView.map((data)=>{
            return <option value={data} key={data}>{data}</option>
          })
        }
      </select> 
      }
     {
      category === "" ? "" : <select>
      <option>Course Number</option>
      {
        courseNumberView.map((data)=>{
          return <option key={data} value={data}>{data}</option>
        })
      }
    </select> 
     }
      
       <Inputs type={"text"} placeholder={"Enter course title"}/>
      <Inputs type={"text"} placeholder={"Course Description"}/>
      <div>
        <select>
            <option>Select Weeks</option>
            {
                weeks.map((data)=>{
                    return <option key={data}>{data}</option>
                })
            }
        </select>
        <select style={{marginLeft:"5px"}}>
            <option>Select Days</option>
            {
                days.map((data)=>{
                    return <option key={data}>{data}</option>
                })
            }
        </select>
      </div>
      <select>
        <option>Select Course Officer</option>
        <option>Officer 1</option>
        <option>Officer 2</option>
        <option>Officer 3</option>
      </select>
      <div style={{display:"flex" , alignItems:"center" , background:"white" , borderRadius:"5px"}}>
        <input type='radio' value={"free"} style={{marginRight:"5px"}}></input><span style={{marginRight:"10px"}}>Free</span>
        <input type='radio' value={"paid"}></input><span style={{marginRight:"10px" , marginLeft:"10px"}}>Paid</span>
      </div>
      <select>
        <option>Select Mode of Course</option>
        <option>Classroom</option>
        <option>Online</option>
        <option>Hybrid</option>
      </select>
      <Button value={"Submit"} fun={handleCourseCreation}/>
    </div>
  )
}
