import React from 'react'

export default function Button(props) {
  return (
    <>
     <button onClick={props.fun} className='pt-3 pb-3 pl-10 pr-10 bg-[rgb(27,48,88)] text-white rounded-md'>{props.value}</button> 
    </>
  )
}
