import React from 'react'

export default function Inputs(props) {
  return (
    <>
      <input type={props.type} placeholder={props.placeholder}  onChange={props.fun} name={props.name} ref={props.ref1} value={props.value}></input>
    </>
  )
}
