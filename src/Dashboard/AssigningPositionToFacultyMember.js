import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AssigningPositionToFacultyMember() {
  const [faculty, setFaculty] = useState([]);
  const [facultyPosition, setFacultyPosition] = useState("");
  const [user, setUser] = useState({});
  const [viewPosition, setPosition] = useState([]);
  const [facId, setFacId] = useState("");
  // const [positionId, setPositionId] = useState("");
  const [view, setView] = useState(false);
  const [viewData,setViewData] = useState([])
  const [input, setInput] = useState({
    facultyId: ""
  })

  function handleInputs(e) {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput, [name]: value
    }));
  }
  function handlePositionAssigning(e) {
    let userLocal = JSON.parse(localStorage.getItem("user"));
    const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/sauth/possition_assi";
    const data = {
      facultyId: facId,
      faculty_pos: facultyPosition,
      position_assi_id: input.facultyId,
      faculty_admin: userLocal.faculty
    };
    axios.post(url, data).then((res) => {
      getAssignedPosition();
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    let userLocal = JSON.parse(localStorage.getItem("user"));
    const urlFaculty = `http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/admin/faculty_member_faculty/${userLocal.faculty}`;
    axios.get(urlFaculty).then((res) => {
      setFaculty(res.data.data);
    }).catch((error) => {
      console.log(error);
    });

    const positionUrl = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/sauth/send";
    axios.get(positionUrl).then((res) => {
      setPosition(res.data.position);
    }).catch((error) => {
      console.log(error);
    });

    
    getAssignedPosition();
    // eslint-disable-next-line
  }, []);

function getAssignedPosition(){
  let userLocal = JSON.parse(localStorage.getItem("user"));
  const url =  `http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/sauth/faculty_position/${userLocal.faculty}`;
  axios.get(url).then((res)=>{
    setViewData(res.data.facultyPositions);
  }).catch((error)=>{
    console.log(error)
  })
}


  function setFacultyMemberFun(e) {
    setFacId(e.target.options[e.target.selectedIndex].getAttribute("data"));
  }

  function setPositionFun(e) {
    setFacultyPosition(e.target.value);
  }
function viewFun(){
setView(!view)
}
  return (
    <>
    <div>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
    {!view && <button onClick={viewFun}>View</button>}
    {view && <button onClick={viewFun}>Create</button>}
    </div>
    {view && <div className='user-details-wrapper'>
        <table>
            <tr>
                <th>S.No</th>
                <th>Faculty Member</th>
                <th>Faculty Position</th>
                <th>Faculty ID</th>
            </tr>
            {
              viewData.map((data,index)=>{
                return (
                  <tr key={index}>
                  <td>{index+1}</td>
                  <td>{data.first_name}{data.middle_name}{data.last_name}</td>
                  <td>{data.faculty_pos}</td>  
                  <td>{data.faculty_id}</td>
              </tr>
                )
              })
            }
           
        </table>
        </div>}
      {!view && <div className='course-creation-wrapper'>

        <h3 style={{ margin: "20px auto" }}>Assigning Positions to Faculty Members</h3>
        <select onChange={setFacultyMemberFun}>
          <option>Select Faculty Member</option>
          {
            faculty.map((data, index) => {
              return <option key={index} value={data.firstname} data={data.facultyid}>{data.firstname}</option> 
            })
          }
        </select>
        <select onChange={(e) => setPositionFun(e)}>
          <option>Select Faculty Position</option>
          {
            viewPosition.map((data, index) => {
              return <option value={data.faculty_pos} key={index} >{data.faculty_pos}</option>
            })
          }
        </select>
        <input type={"text"} placeholder={"Faculty Senirioty Id"} onChange={handleInputs} name="facultyId" />
        <button value={"Submit"} onClick={handlePositionAssigning}>Submit</button>
      </div>}
    </div>
    </>
  )
}
