import axios from 'axios';
import React, { useState } from 'react'

export default function CreationFacultysAdmin() {
    const [inputs, setInputs] = useState({
        faculty:""
      });
    function handleInputs(e) {
        const { name, value } = e.target;
        setInputs((prevInputs) => ({
          ...prevInputs,
          [name]: value,
        }));
      }
      function handleSubmit(e){
        e.preventDefault()
        const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/admin/faculty_create";
        const data = {
            name:`${inputs.faculty}`
        }
        axios.post(url,data).then((res)=>{
            console.log(res)
        }).catch((error)=>{
            console.log(error)
        })
      }
  return (
    <div className='department-creation-wrapper'>
        <h3>Creation Faculty Admin</h3>
      <input type='text' onChange={handleInputs} name='faculty' placeholder='Enter Name'></input>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}
