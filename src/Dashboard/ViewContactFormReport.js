import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

export default function ViewContactFormReport() {

const [viewEnquiry,setViewEnquiry] = useState([]);

useEffect(()=>{
    viewEnquiryFun();
},[])

    function viewEnquiryFun(){
        const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/contact/contact_view";
        axios.get(url).then((res)=>{
            console.log(res.data);
            setViewEnquiry(res.data.details);
        }).catch((error)=>{
            console.log(error)
        })
    }

  return (
    <>
    <div className="user-details-wrapper" style={{ maxHeight: "900px", overflowY: "scroll" }}>
                    <table >
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: "#ffcb00" }}>S.No</th>
                                <th style={{ backgroundColor: "#ffcb00" }}>Date</th>
                                <th style={{ backgroundColor: "#ffcb00" }}>Name</th>
                                <th style={{ backgroundColor: "#ffcb00" }}>Subject</th>
                                <th style={{ backgroundColor: "#ffcb00" }}>Email Address</th>
                                <th style={{ backgroundColor: "#ffcb00" }}>Phone</th>
                                <th style={{ backgroundColor: "#ffcb00" }}>Description</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                viewEnquiry.map((data,index)=>{
                                    return (
                                        <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{data.received_at}</td>
                                    <td>{data.name}</td>
                                    <td>{data.subject}</td>
                                    <td>{data.email}</td>
                                    <td>{data.phone}</td>
                                    <td>{data.description}</td>                                   
                                </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
    </>
  )
}
