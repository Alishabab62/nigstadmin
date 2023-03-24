import React from 'react'

export default function Inputs(props) {
  return (
    <>
      <input type={props.type} placeholder={props.placeholder}  onChange={props.fun} name={props.name}></input>
    </>
  )
}
