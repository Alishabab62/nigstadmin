import { Alert } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { AiFillFilePdf } from 'react-icons/ai';

export default function AnnouncementCreation() {
    const [view, setView] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [failAlert, setFailAlert] = useState(false);
    const [viewAnn, setViewAnn] = useState([]);
    const [input, setInput] = useState({
        title: "",
        des: "",
        url: ""
    })
    const pdf = useRef();

    useEffect(() => {
        viewAnnouncement();
    }, []);

    function viewFun() {
        setView(!view)
    }

    function handleInput(e) {
        const { name, value } = e.target;
        setInput((prevInput) => ({
            ...prevInput, [name]: value
        }))
    }

    function createAnnouncement(e) {
        e.preventDefault();
        const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/announcement/create";
        const data = {
            title: `${input.title}`,
            description: `${input.des}`,
            url: `${input.url}`,
            pdf: pdf.current.files[0]
        }
        axios.post(url, data).then((res) => {
            setSuccessAlert(true);
            setInput({
                title: "",
                des: "",
                url: ""
            });
            pdf.current.value = null;
            setTimeout(() => {
                setSuccessAlert(false);
            }, 5000);
        }).catch((error) => {
            setFailAlert(true);
            setTimeout(() => {
                setFailAlert(false);
            }, 5000);
            console.log(error)
        })
    }

    function viewAnnouncement() {
        const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/announcement/view";
        axios.get(url).then((res) => {
            console.log(res);
            setViewAnn(res.data.data);
        }).catch((error) => {
            console.log(error)
        })
    }

    function changeAnnouncementStatus(e){
        const url = `http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/announcement/edit`;
        const data = {
            id:`${e.target.getAttribute("data")}`
        }
        axios.patch(url,data).then((res)=>{
            console.log(res)
        }).catch((error)=>{
            console.log(error)
        })
    }
    return (
        <>
            <div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    {!view && <button onClick={viewFun}>View Announcement</button>}
                    {view && <button onClick={viewFun}>Create Announcement</button>}
                </div>
                {
                    view && <div className='user-details-wrapper'>
                        <table>
                            <tr>
                                <th>S.No</th>
                                <th>Created At</th>
                                <th>Title</th>
                                <th style={{maxWidth:"50px"}}>Description</th>
                                <th>URL</th>
                                <th>Status</th>
                                <th>PDF</th>
                                <th>Edit</th>
                            </tr>
                            {
                                viewAnn.map((data, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{data.created_at}</td>
                                            <td>{data.title}</td>
                                            <td style={{minWidth:"50px",textAlign:"revert"}}>{data.description}</td>
                                            <td>{data.url}</td>
                                            <td>{data.status ? <button style={{backgroundColor:"green" , borderRadius:"50%" , height:"40px" , width:"40px"}}></button> : <button style={{backgroundColor:"red" , borderRadius:"50%" , height:"40px" , width:"40px"}}></button>}</td>
                                            <td><AiFillFilePdf style={{fontSize:"30px",color:"red"}}/></td>
                                            <td><button data={data.a_id} onClick={changeAnnouncementStatus}>Edit</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    </div>
                }
                {
                    !view && <div className='course-creation-wrapper'>
                        {successAlert && <Alert severity="success">Announcement Created Successfully</Alert>}
                        {failAlert && <Alert severity="error">Something went wrong</Alert>}
                        <h3 style={{ margin: "20px auto" }}>Announcement Creation Form</h3>
                        <form style={{ display: "flex", flexDirection: "column" }}>
                            <input name='title' type='text' placeholder='Title' onChange={(e) => handleInput(e)} value={input.title}></input>
                            <input name='des' type='text' placeholder='Description' onChange={(e) => handleInput(e)} value={input.des}></input>
                            <input name='url' type='text' placeholder='URL' onChange={(e) => handleInput(e)} value={input.url}></input>
                            <div>
                                <input type='file' ref={pdf}></input><span>Only PDF Allowed</span>
                            </div>
                            <button onClick={createAnnouncement}>Submit</button>
                        </form>
                    </div>
                }
            </div>
        </>
    )
}
