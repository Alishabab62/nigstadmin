import { Alert, Button, CircularProgress, Input, Switch } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { IoColorPalette } from 'react-icons/io5';
import { RgbStringColorPicker } from 'react-colorful';
import { useEffect } from 'react';


export default function Marquee() {
    const [responseCircular, setCircularResponse] = useState(false);
    const [details, setDetails] = useState("");
    const [url, setURL] = useState("");
    //   const [editFormButton,setEditFormButton] = useState(false);
    const [emptyFieldAlert, setEmptyFieldAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [deleteError, setDeleteAlert] = useState(false);
    const [updateAlert, setUpdateAlert] = useState(false);
    const [viewData, setViewData] = useState([]);
    const [showColorPicker1, setShowColorPicker1] = useState(false);
    const [showColorPicker2, setShowColorPicker2] = useState(false);
    const [color, setColor] = useState('#ffffff');
    const [textColor, setTextColor] = useState('#ffffff');

    function handleSubmit() {
        setCircularResponse(true);
        if (!details) {
            setCircularResponse(false);
            setEmptyFieldAlert(true);
            setTimeout(() => {
                setEmptyFieldAlert(false);
            }, 5000);
            return;
        }
        const mUrl = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/create_marquee";
        const data = {
            detail: `${details}`,
            url: `${url}`,
            color: `${color}`,
            textColor: `${textColor}`
        };
        axios.post(mUrl, data).then((res) => {
            document.getElementById('form').reset();
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
    //   function handleEdit(){

    //   }

    function handleEditForm() {

    }

    function handleDelete() {

    }
    function handleStatus() {

    }
    function viewMarquee() {
        const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/view_amarquee";
        axios.get(url).then((res) => {
            console.log(res)
            setViewData(res.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {
        viewMarquee();
    }, [])

    return (
        <>
            {updateAlert && <div style={{ textAlign: "center", width: "20%", margin: "auto" }}><Alert severity='success' style={{ marginTop: "20px" }}>Update Successfully</Alert></div>}
            {deleteError && <div style={{ textAlign: "center", width: "20%", margin: "auto" }}><Alert severity='success' style={{ marginTop: "20px" }}>Successfully Deleted!</Alert></div>}
            {errorAlert && <div style={{ textAlign: "center", width: "20%", margin: "auto" }}><Alert severity='error' style={{ marginTop: "20px" }}>Something went wrong</Alert></div>}
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
                <h3 style={{ textAlign: "left", fontSize: "20px", fontWeight: "bold" }}>Create New Marquee</h3>
                {emptyFieldAlert && <Alert severity='error' style={{ marginBottom: "20px" }}>All fields required</Alert>}
                {successAlert && <Alert severity='success' style={{ marginBottom: "20px" }}>Marquee created successfully</Alert>}
                {errorAlert && <Alert severity='error' style={{ marginBottom: "20px" }}>Data Already Exist!</Alert>}
                <form id="form" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: "15px" }}>
                        <Input
                            placeholder="Marquee Detail"
                            type="text"
                            onChange={(e) => setDetails(e.target.value)}
                            value={details}
                            style={{
                                flex: 1,
                                backgroundColor: 'white',
                                borderRadius: '10px',
                                marginRight: '10px',
                            }}
                            variant="outlined"
                        />
                        {showColorPicker1 ? (
                            <div style={{ position: 'absolute', zIndex: "1", right: "5px", top: "10px" }}>
                                <RgbStringColorPicker color={color} onChange={(e) => setColor(color)} onMouseLeave={() => setShowColorPicker1(false)} />
                            </div>
                        ) : (
                            <IoColorPalette
                                style={{ fontSize: '30px', color: 'red', cursor: 'pointer' }}
                                onClick={() => setShowColorPicker1(true)}
                            />
                        )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Input
                            placeholder="Marquee URL"
                            type="text"
                            onChange={(e) => setURL(e.target.value)}
                            value={url}
                            style={{
                                flex: 1,
                                backgroundColor: 'white',
                                borderRadius: '10px',
                                marginRight: '10px',
                            }}
                            variant="outlined"
                        />
                        {showColorPicker2 ? (
                            <div style={{ position: 'absolute', zIndex: "1", right: "5px", top: "10px" }}>
                                <RgbStringColorPicker color={textColor} onChange={(e) => setTextColor(color)} onMouseLeave={() => setShowColorPicker2(false)} />
                            </div>
                        ) : (
                            <IoColorPalette
                                style={{ fontSize: '30px', color: 'red', cursor: 'pointer' }}
                                onClick={() => setShowColorPicker1(true)}
                            />
                        )}
                        <Button
                            sx={{ bgcolor: '#1b3058', color: 'white' }}
                            variant="contained"
                            onClick={handleSubmit}
                            style={{ width: '20%' }}
                        >
                            Create
                        </Button>
                    </div>
                    <div style={{ fontStyle: "italic", color: "lightgreen", marginTop: "7px" }}>Note:Maximum up to 10 Marquee text can be created</div>
                </form>
            </div>
            <div>
                <div className="user-details-wrapper" style={{ maxHeight: "180px", overflowY: "scroll" }}>
                    <table >
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: "#ffcb00" }}>S.No</th>
                                <th style={{ backgroundColor: "#ffcb00" }}>Marquee Text</th>
                                <th style={{ backgroundColor: "#ffcb00" }}>Marquee URL</th>
                                <th style={{ backgroundColor: "#ffcb00" }}>Edit</th>
                                <th style={{ backgroundColor: "#ffcb00" }}>Home</th>
                                <th style={{ backgroundColor: "#ffcb00" }}>Others</th>
                                <th style={{ backgroundColor: "#ffcb00" }}>Delete</th>
                            </tr>
                        </thead>
                        <tbody >
                            {viewData.map((data, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{data.text}</td>
                                    <td>{data.url}</td>
                                    <td>
                                        <Switch
                                            checked={data.status}
                                            onChange={() => handleStatus(data.marqueeid)}
                                            data={true}
                                            sx={{
                                                "& .MuiSwitch-thumb": {
                                                    color: data.status ? "green" : "red",
                                                },
                                            }}
                                        />
                                    </td>
                                    <td onClick={() => handleEditForm(data)}>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </td>
                                    <td>
                                        <Switch
                                            checked={data.status}
                                            onChange={() => handleStatus(data.marqueeid)}
                                            data={true}
                                            sx={{
                                                "& .MuiSwitch-thumb": {
                                                    color: data.status ? "green" : "red",
                                                },
                                            }}
                                        />
                                    </td>
                                    <td onClick={() => handleDelete(data.pid)}>
                                        <i className="fa-sharp fa-solid fa-trash"></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div style={{margin:"15px 0px 0px 28px"}}>
               <h3 style={{fontStyle: "italic", color: "lightgreen",}}>Note : Only one marquee text can be selected at once.</h3>
               <h3 style={{fontStyle: "italic", color: "lightgreen",}}>Note : Visibility button for others will appear only against the text selected for home visibility</h3>
               <h3 style={{fontStyle: "italic", color: "lightgreen",}}>Note : Editing will open the selected in the Create Marquee form only</h3>
            </div>
        </>
    )
}
