import { Alert, Button, CircularProgress, Input, Switch } from '@mui/material'
import axios from 'axios';
import React, { useEffect,  useState } from 'react';
import {BsImageFill} from 'react-icons/bs';


export default function SOIProject() {
  const [responseCircular, setCircularResponse] = useState(false);
  const [emptyFieldAlert,setEmptyFieldAlert] = useState(false);
  const [errorAlert,setErrorAlert] = useState(false);
  const [successAlert,setSuccessAlert] = useState(false);
  const [deleteError,setDeleteAlert] = useState(false);
  const [updateAlert,setUpdateAlert] = useState(false);
  const [editFormButton,setEditFormButton] = useState(false);
  const [pName,setPName] = useState("");
  const [pDescription,setPDescription] = useState("");
  const [pUrl,setPUrl] = useState("");
  const [image,setImage] = useState(null);
  const [viewData,setViewData] = useState([]);
  const [viewForm,setViewForm] = useState(false);
  const [id,setId] = useState("");

 
  useEffect(()=>{
    viewProject();
  },[])

  function handleSubmit(){
    setCircularResponse(true);
    if(!pName || !image){
        setCircularResponse(false);
        setEmptyFieldAlert(true);
        setTimeout(() => {
            setEmptyFieldAlert(false);
        }, 5000);
        return;
    }
    const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/create_project";
    const formData= new FormData();
    formData.append("Pname",pName);
    formData.append("Pdescription",pDescription);
    formData.append("image",image);
    formData.append("Purl",pUrl)
    axios.post(url,formData).then((res)=>{
        if(res.data.message === "Project created successfully!"){
        document.getElementById('form').reset()
          viewProject();
          setPName("");
          setPDescription("");
          setPUrl("")
        setCircularResponse(false);
        setSuccessAlert(true);
        setTimeout(() => {
          setSuccessAlert(false);
        }, 5000);
        return;
        }
        
    }).catch((error)=>{
      setCircularResponse(false);
        if(error.response.data.message === "Data Already Exist!"){
        setErrorAlert(true);
        setTimeout(() => {
            setErrorAlert(false);
        }, 5000);
        return;
        }
      
    })
  }


  function viewProject(){
    const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/view_project";
    axios.get(url).then((res)=>{
        setViewData(res.data.data);
    }).catch((error)=>{
        console.log(error)
    })
  } 


  function handleViewForm(){
    setViewForm(!viewForm);
    setEditFormButton(false);
    setPName("");
    setPDescription("");
  }

  function viewImage(url){
    console.log(url)
    const newWindow = window.open();
    if (!newWindow) {
      alert('Pop-up blocked. Please allow pop-ups for this website.');
    } else {
      newWindow.document.body.innerHTML = "<embed width='100%' height='100%' src='" + url + "' ></embed>";
    }
  }

  function handleEdit(){
    const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/update_project";
    const data = {
    Pname:`${pName}`,
    Pdescription:`${pDescription}`,
    Pid:`${id}`,
    Purl:`${pUrl}`

   }
    axios.patch(url,data).then((res)=>{
      viewProject();
      setUpdateAlert(true);
      setTimeout(() => {
        setUpdateAlert(false)
      }, 5000);
      console.log(res)
    }).catch((error)=>{
      console.log(error)
      // setErrorAlert(true);
      //   setTimeout(() => {
      //       setErrorAlert(false);
      //   }, 5000);
      //   return;
    })
  }

  function handleDelete(id){
    const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/delete_project";
    axios.delete(url,{data:{Pid:id}}).then((res)=>{
      if(res.data.message === "Successfully Deleted!"){
        viewProject()
        setDeleteAlert(true);
        setTimeout(() => {
          setDeleteAlert(false);
        }, 5000);
      }
    }).catch((error)=>{
      console.log(error)
    })
  }

  function handleEditForm(data){
    setViewForm(!viewForm);
    setEditFormButton(true);
    setPName(data.name);
    setPDescription(data.p_description);
    setId(data.pid);
    setPUrl(data.url)
  }
  function handleStatusTrue(id){
    const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/update_project";
    const data = {
      Pid:id,
      visibility:true
   }
    axios.patch(url,data).then((res)=>{
      viewProject();
      setUpdateAlert(true);
      setTimeout(() => {
        setUpdateAlert(false)
      }, 5000);
      console.log(res)
    }).catch((error)=>{
      console.log(error)
      // setErrorAlert(true);
      //   setTimeout(() => {
      //       setErrorAlert(false);
      //   }, 5000);
      //   return;
    })
  }
  function handleStatusFalse(id){
    const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/viewweb/update_project";
    const data = {
      Pid:id,
      visibility:false
   }
    axios.patch(url,data).then((res)=>{
      viewProject();
      setUpdateAlert(true);
      setTimeout(() => {
        setUpdateAlert(false)
      }, 5000);
      console.log(res)
    }).catch((error)=>{
      console.log(error)
      // setErrorAlert(true);
      //   setTimeout(() => {
      //       setErrorAlert(false);
      //   }, 5000);
      //   return;
    })
  }
  return (
    <>
      {updateAlert && <div style={{textAlign:"center",width:"20%",margin:"auto"}}><Alert severity='success' style={{marginTop:"20px"}}>Update Successfully</Alert></div>}
      {deleteError && <div style={{textAlign:"center",width:"20%",margin:"auto"}}><Alert severity='success' style={{marginTop:"20px"}}>Successfully Deleted!</Alert></div>}
      {errorAlert && <div style={{textAlign:"center",width:"20%",margin:"auto"}}><Alert severity='error' style={{marginTop:"20px"}}>Something went wrong</Alert></div>}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          {!viewForm && <Button  sx={{bgcolor:"#1b3058",color:"white"}} variant="contained" onClick={handleViewForm}>View</Button>}
          {viewForm &&  <Button  sx={{bgcolor:"#1b3058",color:"white"}} variant="contained" onClick={handleViewForm}>Create</Button>}
        </div>
      <div>
        {
        (viewForm && viewData.length > 0 ) &&  <div className='user-details-wrapper'>
          <table>
            <tr>
              <th style={{ backgroundColor: "#ffcb00" }}>S.No</th>
              <th style={{ backgroundColor: "#ffcb00" }}>Project Name</th>
              <th style={{ backgroundColor: "#ffcb00" }}>Project Description</th>
              <th style={{ backgroundColor: "#ffcb00" }}>Project Image</th>
              <th style={{ backgroundColor: "#ffcb00" }}>Status</th>
              <th style={{ backgroundColor: "#ffcb00" }}>Edit</th>
              <th style={{ backgroundColor: "#ffcb00" }}>Delete</th>
            </tr>
            {
              viewData.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.name}</td>
                    <td>{data.p_description}</td>
                    <td style={{cursor:"pointer"}} onClick={()=>viewImage(data.Purl)}><BsImageFill/></td>
                    <td>
                      <Switch
                        checked={data.visibility}
                        onChange={data.visibility ? ()=>handleStatusFalse(data.pid) : ()=>handleStatusTrue(data.pid) }
                        data={true}
                        sx={{
                          '& .MuiSwitch-thumb': {
                            color: data.visibility ? 'green' : 'red',
                          },
                        }}
                      />
                    </td>
                    <td onClick={()=>handleEditForm(data)}><i class="fa-solid fa-pen-to-square"></i></td>
                    <td onClick={()=>handleDelete(data.pid)}><i class="fa-sharp fa-solid fa-trash"></i></td>
                  </tr>
                )
              })
            }

          </table>
        </div>}
        {
        (viewData.length <= 0 && viewForm) &&
        <div style={{ width: "100%", textAlign: "center", fontSize: "30px", marginTop: "200px" }}>No data to show</div>
      }
        </div>
    {!viewForm && <div className="login-wrapper ">
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
        }}
      >
        <CircularProgress style={{ height: "50px", width: "50px" }} />
      </div>
    ) }
        <h3>Creation SOI Project</h3>
        {emptyFieldAlert && <Alert severity='error' style={{marginBottom:"20px"}}>All fields required</Alert> }
        {successAlert && <Alert severity='success' style={{marginBottom:"20px"}}>Created Successfully</Alert> }
        {errorAlert && <Alert severity='error' style={{marginBottom:"20px"}}>Data Already Exist!</Alert> }
        <form id='form' style={{display:"flex",flexDirection:"column"}}>
        <input placeholder='Project Name' type='text' onChange={(e)=>setPName(e.target.value)} value={pName}  />
        <input placeholder='Project Description' type='text' onChange={(e)=>setPDescription(e.target.value)} value={pDescription}/>
        <input placeholder='Enter URL' type='text' onChange={(e)=>setPUrl(e.target.value)} value={pUrl}/>
        <div style={{display:"flex",justifyContent:"space-between" , alignItems:"center"}}><Input placeholder='Choose Image' type='file' onChange={(e)=>setImage(e.target.files[0])}/> <span>Only JPEG and PNG allowed</span></div>
        {editFormButton ? <Button  sx={{bgcolor:"#1b3058",color:"white"}} variant="contained" onClick={handleEdit}>Edit</Button> : <Button  sx={{bgcolor:"#1b3058",color:"white"}} variant="contained" onClick={handleSubmit}>Submit</Button>}
        </form>
</div>}
      
</>

  )
}
