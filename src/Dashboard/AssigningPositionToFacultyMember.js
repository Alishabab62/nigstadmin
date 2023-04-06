import React from 'react'
import Inputs from '../components/Inputs';
import Button from '../components/Button';

export default function AssigningPositionToFacultyMember() {
    function handlePositionAssigning(){
        console.log("function Called");
    }
  return (
    <div className='course-creation-wrapper'>
    <h3>Assigning Positions to Faculty Members</h3>
  <select>
    <option>Select Faculty Member</option>
    <option>Faculty 1</option>
    <option>Faculty 2</option>
  </select>
  <select>
    <option>Select Faculty Position</option>
    <option>Head</option>
    <option>Principal</option>
  </select>
  <Inputs type={"text"} placeholder={"Position Id"}/>
  <Inputs type={"text"} placeholder={"Position Id"}/>
  <Button value={"Submit"} fun={handlePositionAssigning}/>
</div>
  )
}
