import { Alert, Button, CircularProgress,  Switch } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';


export default function Contact() {
    const [responseCircular, setCircularResponse] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [editFormButton,setEditFormButton] = useState(false);
    const [emptyFieldAlert, setEmptyFieldAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [deleteError, setDeleteAlert] = useState(false);
    const [updateAlert, setUpdateAlert] = useState(false);
    const [viewData, setViewData] = useState([]);
    const [id,setID] = useState("");
    const [deleteErrorAlert,setDeleteErrorAlert] = useState(false);

    function handleSubmit() {
        setCircularResponse(true);
        if (!name || !email) {
            setCircularResponse(false);
            setEmptyFieldAlert(true);
            setTimeout(() => {
                setEmptyFieldAlert(false);
            }, 5000);
            return;
        }
        const mUrl = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/contact/create_office";
        const data = {
            name: `${name}`,
            email: `${email}`,
        };
        axios.post(mUrl, data).then((res) => {
            document.getElementById('form').reset();
            setEmail("");
            setName("");
            viewMarquee();
            setCircularResponse(false);
            setSuccessAlert(true);
            setTimeout(() => {
                setSuccessAlert(false)
            }, 5000);
        }).catch((error) => {
            setCircularResponse(false);
            setErrorAlert(true);
            setTimeout(() => {
                setErrorAlert(false);
            }, 5000);
            console.log(error);
        })
    }

    function handleEditForm(data) {
        setEditFormButton(true);
        setID(data.oid);
        setName(data.office);
        setEmail(data.email)
    }

    function handleEdit(){
        setCircularResponse(true);
        const mUrl = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/contact/edit_office";
        const data = {
            email: `${email}`,
            subject:`${name}`,
            oid:`${id}`
        };
        axios.patch(mUrl, data).then((res) => {
            document.getElementById('form').reset();
            setName("");
            setEmail("");
            setEditFormButton(false);
            handleStatusFalse(id);
            viewMarquee();
            setCircularResponse(false);
            setUpdateAlert(true);
            setTimeout(() => {
                setUpdateAlert(false)
            }, 5000);
        }).catch((error) => {
            setCircularResponse(false);
            setErrorAlert(true);
            setTimeout(() => {
                setErrorAlert(false);
            }, 5000);
            console.log(error);
        })
    }

    function handleDelete(id) {
        const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/contact/delete_office";
        axios.delete(url,{data:{oid:id}}).then((res)=>{
            viewMarquee();
            setDeleteAlert(true);
            setTimeout(() => {
                setDeleteAlert(false)
            }, 5000);
        }).catch((error)=>{
           
            setDeleteErrorAlert(true);
            setTimeout(() => {
                setDeleteErrorAlert(false)
            }, 5000);
        })
    }
    function handleStatusTrue(id) {
        const mUrl = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/contact/edit_visi";
        const data={
            oid:`${id}`,
            visibility:true
        };
        axios.patch(mUrl,data).then((res)=>{
            viewMarquee();
            setUpdateAlert(true);
            setTimeout(() => {
                setUpdateAlert(false)
            }, 5000);
        }).catch((error)=>{
            console.log(error)
        })
    }
    function handleStatusFalse(id){
        const mUrl = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/contact/edit_visi";
        const data={
            oid:`${id}`,
            visibility:false
        };
        axios.patch(mUrl,data).then((res)=>{
            viewMarquee();
            setUpdateAlert(true);
            setTimeout(() => {
                setUpdateAlert(false)
            }, 5000);
        }).catch((error)=>{
            console.log(error)
        })
    }
    function viewMarquee() {
        const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/contact/office_aview";
        axios.get(url).then((res) => {
            setViewData(res.data.office)
        }).catch((error) => {
            if(error.response.data.message === ""){
                setViewData([]);
            }
        })
    }
    useEffect(() => {
        viewMarquee();
    }, [])

    return (
        <>
            {updateAlert && <div style={{ textAlign: "center", width: "20%", margin: "auto" }}><Alert severity='success' style={{ marginTop: "20px" }}>Update Successfully</Alert></div>}
            {deleteError && <div style={{ textAlign: "center", width: "20%", margin: "auto" }}><Alert severity='success' style={{ marginTop: "20px" }}>Successfully Deleted!</Alert></div>}
            {deleteErrorAlert && <div style={{ textAlign: "center", width: "20%", margin: "auto" }}><Alert severity='error' style={{ marginTop: "20px" }}>Something went wrong</Alert></div>}
            <div className="login-wrapper ">
                {responseCircular && (
                    <div
                        style={{
                            width: "29%",
                            height: "30%",
                            left: "33%",
                            backgroundColor: "rgb(211,211,211)",
                            borderRadius: "10px",
                            top: "100px",
                            position: "absolute",
                            padding: "10px 20px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: "2"
                        }}
                    >
                        <CircularProgress style={{ height: "50px", width: "50px" }} />
                    </div>
                )}
                <h3 style={{ textAlign: "left", fontSize: "20px", fontWeight: "bold" }}>Contact Us-Subject</h3>
                {emptyFieldAlert && <Alert severity='error' style={{ marginBottom: "20px" }}>All fields required</Alert>}
                {successAlert && <Alert severity='success' style={{ marginBottom: "20px" }}>Subject created successfully</Alert>}
                {errorAlert && <Alert severity='error' style={{ marginBottom: "20px" }}>Data Already Exist!</Alert>}
                <form id="form" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>
                        <input
                            placeholder="Subject"
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            style={{
                                flex: 1,
                                backgroundColor: 'white',
                                borderRadius: '10px',
                                marginRight: '10px',
                                width:"100%"
                            }}
                            variant="outlined"
                        />
                        <div style={{ fontStyle: "italic", color: "lightgreen", marginTop: "2px" ,textAlign:"left"}}>Subject not to exceed 50 character</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            placeholder="Email Address"
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            style={{
                                flex: 1,
                                backgroundColor: 'white',
                                borderRadius: '10px',
                                marginRight: '10px',
                            }}
                            variant="outlined"
                        />
                        
                        {
                            editFormButton ? <Button
                            sx={{ bgcolor: '#1b3058', color: 'white' }}
                            variant="contained"
                            onClick={handleEdit}
                            style={{ width: '20%' }}
                        >
                            Edit
                        </Button> : 
                        <Button
                        sx={{ bgcolor: '#1b3058', color: 'white',height:"30px",marginBottom:"10px"}}
                            variant="contained"
                            onClick={handleSubmit}
                            style={{ width: '20%'}}
                        >
                            Create
                        </Button>
                    }
                    </div>
                    <div style={{ fontStyle: "italic", color: "lightgreen", marginTop: "2px",textAlign:"right" }}>Note:Maximum up to 10 Subject can be created</div>
                </form>
            </div>
           { viewData.length >0 && <div>
                <div className="user-details-wrapper" style={{ maxHeight: "180px", overflowY: "scroll" }}>
                    <table >
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: "#ffcb00" }}>S.No</th>
                                <th style={{ backgroundColor: "#ffcb00" }}>Subject</th>
                                <th style={{ backgroundColor: "#ffcb00" }}>Email Address</th>
                                <th style={{ backgroundColor: "#ffcb00" }}>Edit</th>
                                <th style={{ backgroundColor: "#ffcb00" }}>Status</th>
                                <th style={{ backgroundColor: "#ffcb00" }}>Delete</th>
                            </tr>
                        </thead>
                        <tbody >
                            {viewData.map((data, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{data.office}</td>
                                    <td>{data.email}</td>
                                    <td onClick={() => handleEditForm(data)}>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </td>
                                    <td>
                                        <Switch
                                            checked={data.visibility}
                                            onChange={data.visibility ? () => handleStatusFalse(data.oid) : () => handleStatusTrue(data.oid)}
                                            data={true}
                                            sx={{
                                                "& .MuiSwitch-thumb": {
                                                    color: data.visibility ? "green" : "red",
                                                },
                                            }}
                                        />
                                    </td>                                   
                                    <td onClick={() => handleDelete(data.oid)}>
                                        <i className="fa-sharp fa-solid fa-trash"></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>}
            {
        viewData.length <=0  && 
        <div style={{width:"100%",textAlign:"center" , fontSize:"30px",marginTop:"200px"}}>No data to show</div>
      
      }
            {viewData.length >0 && <div style={{margin:"15px 0px 0px 28px"}}>
               <h3 style={{fontStyle: "italic", color: "lightgreen",}}>Note : Only one marquee text can be selected at once.</h3>
            </div>}
        </>
    )
}
