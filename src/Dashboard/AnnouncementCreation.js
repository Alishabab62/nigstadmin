import { Alert, Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { AiFillFilePdf } from 'react-icons/ai';
import { BsFillArchiveFill } from 'react-icons/bs';

export default function AnnouncementCreation() {
    const [viewForm, setViewForm] = useState(true);
    const [viewAnnUI, setViewAnnUI] = useState(false);
    const [viewArchive,setViewArchive] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [failAlert, setFailAlert] = useState(false);
    const [viewAnn, setViewAnn] = useState([]);
    const [deleteError,setDeleteAlert] = useState(false);
    const [viewArchiveAnnouncementUI,setViewArchiveAnnouncementUI] = useState([]);
    const [input, setInput] = useState({
        title: "",
        des: "",
        url: ""
    })
    const pdf = useRef(null);

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
            if(error.response.data.message === "No Announcement To Display!."){
                setViewAnn([]);
            }
        })
    }

    function changeAnnouncementStatus(id){
        const url = `http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/announcement/edit`;
        const data = {
            id:`${id}`
        }
        axios.patch(url,data).then((res)=>{
            viewAnnouncement();
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
        setViewArchiveAnnouncementUI(res.data);
        viewAnnouncement();
    }).catch((error)=>{
        if(error.response.data.message === "Nothing to show"){
        setViewArchiveAnnouncementUI([]);
        }   
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

function viewArchiveAnnouncementPDF(data){
    const url = `http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/view_archive/${data}`;
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

  function handleDelete(id){
    const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/announcement/delete";
    axios.delete(url,{data:{aid:id}}).then((res)=>{
      if(res.data.message === "Successfully Deleted."){
        viewArchiveAnnouncement()
        setDeleteAlert(true);
        setTimeout(() => {
          setDeleteAlert(false);
        }, 5000);
      }
    }).catch((error)=>{
      console.log(error.response.data.message)
    })
  }

    return (
        <>
            {deleteError && <div style={{textAlign:"center",width:"20%",margin:"auto"}}><Alert severity='success' style={{marginTop:"20px"}}>Successfully Deleted!</Alert></div>}
            <div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                     <Button onClick={viewUIFun} style={{height:"60px"}} sx={{bgcolor:"#1b3058",color:"white"}} variant="contained">View Announcement</Button>
                     <Button onClick={viewFormFun} style={{margin:"0px 15px",height:"60px"}} sx={{bgcolor:"#1b3058",color:"white"}} variant="contained">Create Announcement</Button>
                    <Button onClick={viewArchiveAnn} style={{height:"60px"}} sx={{bgcolor:"#1b3058",color:"white"}} variant="contained">View Archive Announcement</Button>
                </div>
                {
                    ( viewAnn.length !== 0 && viewAnnUI) && <div className='user-details-wrapper'>
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
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{data.createdat}</td>
                                            {data.url === "" ? <td>{data.title}</td> : <td><a href={url} target='_blank' style={{textDecoration:"underline"}}>{data.title}</a></td>}
                                            {data.url === "" ? <td style={{minWidth:"50px",textAlign:"revert"}}>{data.description}</td> : <td style={{minWidth:"50px",textAlign:"revert"}}><a href={url} target='_blank' style={{textDecoration:"underline"}}>{data.description}</a></td>}
                                            <td>{data.url}</td>
                                            <td>{data.status ? "": <Button onClick={()=>changeAnnouncementStatus(data.aid)} sx={{bgcolor:"#1b3058",color:"white"}} variant="contained">Unhide</Button>}</td>
                                            <td>{data.pdf_path !==null ?  <AiFillFilePdf onClick={()=>viewAnnouncementPDF(data.aid)} style={{fontSize:"30px",color:"red"}}/> : ""}</td>
                                            <td><BsFillArchiveFill onClick={()=>archiveAnnouncement(data.aid)} style={{fontSize:"30px"}}/></td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    </div>
                }

                {
                    ( viewArchiveAnnouncementUI.length !== 0 && viewArchive) && <div className='user-details-wrapper'>
                        <table>
                            <tr>
                                <th>S.No</th>
                                <th>Created At</th>
                                <th>Title</th>
                                <th style={{maxWidth:"50px"}}>Description</th>
                                <th>URL</th>
                                <th>Delete</th>
                                {/* <th>Status</th> */}
                                <th>PDF</th>
                            </tr>
                            {
                                viewArchiveAnnouncementUI.map((data, index) => {
                                    const url =`http://${data.url}`; 
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{data.createdat}</td>
                                            {data.url === "" ? <td>{data.title}</td> : <td><a href={url} target='_blank' style={{textDecoration:"underline"}}>{data.title}</a></td>}
                                            {data.url === "" ? <td style={{minWidth:"50px",textAlign:"revert"}}>{data.description}</td> : <td style={{minWidth:"50px",textAlign:"revert"}}><a href={url} target='_blank' style={{textDecoration:"underline"}}>{data.description}</a></td>}
                                            <td>{data.url}</td>
                                            {/* <td>{data.status ? <Button style={{backgroundColor:"green" , borderRadius:"50%" , height:"40px" , width:"40px"}} sx={{bgcolor:"#1b3058",color:"white"}} variant="contained"></Button> : <Button style={{backgroundColor:"red" , borderRadius:"50%" , height:"40px" , width:"40px"}}></Button>}</td> */}
                                            <td onClick={()=>handleDelete(data.aid)}><i class="fa-sharp fa-solid fa-trash"></i></td>
                                            <td>{data.pdf_path !== null ? <AiFillFilePdf style={{fontSize:"30px",color:"red"}} onClick={()=>viewArchiveAnnouncementPDF(data.aid)}/> : ""}</td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    </div>
                }
                {
            ( viewArchiveAnnouncementUI.length === 0 && viewArchive) && 
        <div style={{ width: "100%", textAlign: "center", fontSize: "30px", marginTop: "200px" }}>No data to show</div>
      }
              {
            ( viewAnn.length === 0 && viewAnnUI) && 
        <div style={{ width: "100%", textAlign: "center", fontSize: "30px", marginTop: "200px" }}>No data to show</div>
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
                            <Button onClick={createAnnouncement} sx={{bgcolor:"#1b3058",color:"white"}} variant="contained">Submit</Button>
                        </form>
                    </div>
                }
            </div>
        </>
    )
}
