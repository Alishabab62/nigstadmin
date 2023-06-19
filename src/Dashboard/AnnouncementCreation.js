import { Alert } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { AiFillFilePdf } from 'react-icons/ai';

export default function AnnouncementCreation() {
    const [viewForm, setViewForm] = useState(true);
    const [viewAnnUI, setViewAnnUI] = useState(false);
    const [viewArchive,setViewArchive] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [failAlert, setFailAlert] = useState(false);
    const [viewAnn, setViewAnn] = useState([]);
    const [viewArchiveAnnouncementUI,setViewArchiveAnnouncementUI] = useState([]);
    const [input, setInput] = useState({
        title: "",
        des: "",
        url: ""
    })
    const pdf = useRef();

    useEffect(() => {
        viewAnnouncement();
        viewArchiveAnnouncement();
    }, []);

    function viewUIFun() {
        setViewAnnUI(true);
        setViewForm(false);
        setViewArchive(false);
    }
    function viewFormFun() {
        setViewForm(true);
        setViewAnnUI(false);
        setViewArchive(false);
    }
    function viewArchiveAnn() {
        setViewArchive(true);
        setViewAnnUI(false);
        setViewForm(false);
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
        const formData = new FormData();
        formData.append("title",input.title);
        formData.append("description",input.des);
        formData.append("url",input.url);
        formData.append("pdf", pdf.current.files[0]);

        axios.post(url, formData).then((res) => {
            viewAnnouncement();
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
            setViewAnn(res.data.data);
        }).catch((error) => {
            console.log(error)
        })
    }

    function changeAnnouncementStatus(id){
        const url = `http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/announcement/edit`;
        const data = {
            id:`${id}`
        }
        axios.patch(url,data).then((res)=>{
            console.log(res)
        }).catch((error)=>{
            console.log(error)
        })
    }

    function archiveAnnouncement(id){
        const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/admin/archive_ann";
        const data={
            aid:`${id}`
        }
        axios.patch(url,data).then((res)=>{
            viewAnnouncement();
            viewArchiveAnnouncement();
        }).catch((error)=>{
            console.log(error)
        })
    }

function viewArchiveAnnouncement(){
    const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/admin/show_archive_admin";
    axios.get(url).then((res)=>{
        setViewArchiveAnnouncementUI(res.data)
    }).catch((error)=>{
        console.log(error)
    })
}

function viewAnnouncementPDF(data){
  const url = `http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/view_ann/${data}`;
  axios.get(url, { responseType: "blob" }).then((res) => {
    const objectUrl = URL.createObjectURL(res.data);
    const newWindow = window.open();
    if (!newWindow) {
      alert('Pop-up blocked. Please allow pop-ups for this website.');
    } else {
      newWindow.document.body.innerHTML = "<embed width='100%' height='100%' src='" + objectUrl + "' type='application/pdf'></embed>";
    }
  }).catch((error) => {
    console.log(error);
  });
}

    return (
        <>
            <div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                     <button onClick={viewUIFun}>View Announcement</button>
                     <button onClick={viewFormFun}>Create Announcement</button>
                    <button onClick={viewArchiveAnn}>View Archive Announcement</button>
                </div>
                {
                    viewAnnUI && <div className='user-details-wrapper'>
                        <table>
                            <tr>
                                <th>S.No</th>
                                <th>Created At</th>
                                <th>Title</th>
                                <th style={{maxWidth:"50px"}}>Description</th>
                                <th>URL</th>
                                <th>Status</th>
                                <th>PDF</th>
                                <th>Archive Ann.</th>
                            </tr>
                            {
                                viewAnn.map((data, index) => {
                                    const url =`http://${data.url}`; 
                                    console.log(url)
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{data.createdat}</td>
                                            <td>{data.title}</td>
                                            <td style={{minWidth:"50px",textAlign:"revert"}}>{data.description}</td>
                                            <td><a href={url} rel='external' target='_blank'>URL</a></td>
                                            <td>{data.status ? <button>Hide</button> : <button onClick={()=>changeAnnouncementStatus(data.aid)}>Unhide</button>}</td>
                                            <td>{data.pdf_path !==null ?  <AiFillFilePdf onClick={()=>viewAnnouncementPDF(data.aid)} style={{fontSize:"30px",color:"red"}}/> : ""}</td>
                                           
                                            <td><button  onClick={()=>archiveAnnouncement(data.aid)}>Archive Ann.</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    </div>
                }

                {
                    viewArchive && <div className='user-details-wrapper'>
                        <table>
                            <tr>
                                <th>S.No</th>
                                <th>Created At</th>
                                <th>Title</th>
                                <th style={{maxWidth:"50px"}}>Description</th>
                                <th>URL</th>
                                <th>Status</th>
                                <th>PDF</th>
                            </tr>
                            {
                                viewArchiveAnnouncementUI.map((data, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{data.createdat}</td>
                                            <td>{data.title}</td>
                                            <td style={{minWidth:"50px",textAlign:"revert"}}>{data.description}</td>
                                            <td>{data.url}</td>
                                            <td>{data.status ? <button style={{backgroundColor:"green" , borderRadius:"50%" , height:"40px" , width:"40px"}}></button> : <button style={{backgroundColor:"red" , borderRadius:"50%" , height:"40px" , width:"40px"}}></button>}</td>
                                            <td><AiFillFilePdf style={{fontSize:"30px",color:"red"}}/></td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    </div>
                }
                {
                    viewForm  && <div className='course-creation-wrapper'>
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
