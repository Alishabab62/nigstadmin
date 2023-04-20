import axios from 'axios';
import React, { useState , useRef, useEffect} from 'react';
import { AiFillFilePdf } from 'react-icons/ai';
import "../CSS/Tender.css"
import { Alert } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

function Tender() {
  const [showTenders, setShowTenders] = useState(false);
  const [showCorrigendum, setShowCorrigendum] = useState(false);
  const [tenderValue , setTenderValue ] = useState();
  const [formSelect , setFormSelect] = useState(true);
  const startDate = useRef();
  const endDate = useRef();
  const file = useRef();
  const corrigendumPdf = useRef();
  const [filter , setFilter] = useState(true);
  const [successAlert, setSuccessAlert] = useState(false);
  const [failAlert, setFailAlert] = useState(false);
  const [emptyFieldAlert, setEmptyFieldAlert] = useState(false);
  const [viewTender , setViewTender] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [tenderNo , setTenderNo] = useState("")
  const [input , setInput] = useState({
    title:"",
    ref:"",
    description:"",
    corrigendum:""
  });

  const toggleTenders = () => {
    setShowTenders(!showTenders)
    setFormSelect(!formSelect)
    setFilter(!filter)
  };
  const toggleCorrigendum = () => {
    setShowCorrigendum(!showCorrigendum);
    setFormSelect(!formSelect)
    setFilter(!filter)
  };

 
function viewPDF(e) {
  const tenderId = e.target.getAttribute("data");
  const url = `https://nigst.onrender.com/tender/vpdf/${tenderId}`;
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

useEffect(()=>{
  tenderViewFun()
},[])

function tenderViewFun(){
  const url = "https://nigst.onrender.com/tender/view";
  axios.get(url).then((res)=>{
    setViewTender(res.data.tender.reverse());
  }).catch((error)=>{
    console.log(error)
  })
}
function handleInputs(e){
  const name = e.target.name;
  const value = e.target.value;
 setInput((prevInput)=>({
  ...prevInput , [name]:value
 }))
}

function handleSubmit(e) {
  if(file.current.files[0] !== undefined){
    e.preventDefault();
    const url = "https://nigst.onrender.com/tender/create";
    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("tenderRefNo", input.ref);
    formData.append("description", input.description);
    formData.append("startDate", startDate.current.value);
    formData.append("endDate", endDate.current.value);
    formData.append("pdf", file.current.files[0]);
    axios.post(url, formData).then((res) => {
     tenderViewFun()
      setSuccessAlert(true);
      setTimeout(() => {
        setSuccessAlert(false)
      }, 5000);
    }).catch((error) => {
      console.log(error);
    });
  }
  else{
    setEmptyFieldAlert(true);
    setTimeout(() => {
      setEmptyFieldAlert(false)
    }, 5000);
  }
}

function handleCorrigendum(e){
  e.preventDefault()
  console.log(tenderValue)
  const formData = new FormData();
  formData.append("corrigendum", input.corrigendum);
  formData.append("tender_number", tenderValue);
  formData.append("pdf", corrigendumPdf.current.files[0]);
  const url = "https://nigst.onrender.com/tender/corrigendum"
  axios.post(url,formData).then((res)=>{
    setSuccessAlert(true);
    setTimeout(() => {
      setSuccessAlert(false)
    }, 5000);
  }).catch((error)=>{
    setFailAlert(true)
    setTimeout(() => {
      setFailAlert(false)
    }, 5000);
  })
}

function handleArchive(e){
  setOpen(false);
  const url = "https://nigst.onrender.com/tender/archive";
  const data = {
    tender_number:`${tenderNo}`
  }
  axios.patch(url,data).then((res)=>{
    console.log(res)
  }).catch((error)=>{
    console.log(error)
  })
}


const handleClickOpen = (e) => {
  setOpen(true);
  setTenderNo(e.target.getAttribute("data"))
};

const handleClose = () => {
  setOpen(false);
};
  return (
    <>
      {
      formSelect ?   <div className='creation'>
        <button className='openform' onClick={toggleTenders}>Create New Tenders</button>
        <button className='openform' onClick={toggleCorrigendum}>Create New Corregendom</button>
        <button className='openform'>View Archive Tender</button>
      </div> : ""
      }
      {filter ? <div className='user-details-wrapper'>
        <table>
            <tr>
                <th>S.No</th>
                <th>Tender No</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Corregendom</th>
                <th>File</th>
                <th>Move to Archive</th>
            </tr>
            {
              viewTender.map((data,index)=>{
                return (
                  <tr key={index}>
                  <td>{index+1}</td>
                  <td>{data.tender_ref_no}</td>
                  <td>{data.description}</td>
                  <td>{data.start_date}</td>
                  <td>{data.end_date}</td>
                  <td>{data.corrigenda[0].corrigendum}</td>
                  <td data={data.tender_ref_no} onClick={viewPDF} style={{cursor:"pointer"}}><AiFillFilePdf style={{color:"red"}}/></td>
                  <td><button data={data.tender_ref_no} style={{backgroundColor:"green" , color:"green" , borderRadius:"50%" , height:"40px" , width:"40px"}} onClick={handleClickOpen}></button></td>
              </tr>
                )
              })
            }
           
        </table>
        </div> : "" }
    <div className='tenderCreation flex items-center'>
      
      
      {showTenders && (
        <div id='div1'>
          {successAlert ? <Alert severity="success" style={{marginBottom:"10px"}}>Tender Create successfully</Alert> : ""}
          {failAlert ? <Alert severity="error" style={{marginBottom:"10px"}}>Something Went Wrong Please try again later</Alert> : ""}
          {emptyFieldAlert ? <Alert severity="error" style={{marginBottom:"10px"}}>All fields required</Alert> : ""}
          <button className='close-btn' onClick={toggleTenders}>&times;</button>
          <form action="/submit-form" method="post" encType="multipart/form-data">
            <input type="text" id="title" name="title" required onChange={handleInputs} placeholder="Tender Title"/>
            <input type="text" id="ref" name="ref" required onChange={handleInputs} placeholder={"Tender No.:"}/>
            <textarea id="description" name="description" required onChange={handleInputs} placeholder={"Tender Description:"}></textarea>
            <input type="text" onClick={(e)=> {e.target.type="date"}} id="start-date" name="starDate" required ref={startDate} placeholder={"Start Date:"}/>
            <input type="text" onClick={(e)=> {e.target.type="date"}} id="end-date" name="endDate" required  ref={endDate} placeholder={"End Date:"}/>
            <div style={{display:"flex" , justifyContent:"flex-start"}}><input type="file" id="pdf-file" name="pdf-file" accept=".pdf" ref={file} required></input><span style={{fontSize:"11px"}}>(Only PDF Allowed)</span></div>
            <button onClick={handleSubmit} value={"Submit"} className='submitButton'>Submit</button>
          </form>
        </div>
      )}

      {showCorrigendum && (
        <div id='div2'>
          {successAlert ? <Alert severity="success" style={{marginBottom:"10px"}}>Corregendom Create successfully</Alert> : ""}
          {failAlert ? <Alert severity="error" style={{marginBottom:"10px"}}>Something Went Wrong Please try again later</Alert> : ""}
          {emptyFieldAlert ? <Alert severity="error" style={{marginBottom:"10px"}}>All fields required</Alert> : ""}
          <button className="close-btn" onClick={toggleCorrigendum}>&times;</button>
          <form action="/submit-corrigendum" method="post" encType="multipart/form-data">
            <label htmlFor="ref-dropdown">Select Title Ref. No.:</label>
            <select id="ref-dropdown" name="ref-dropdown" required onChange={(e)=> setTenderValue(e.target.value)}>
              <option>Select Tender Ref</option>
              {
                viewTender.map((data,index)=>{
                  return <option value={data.tender_ref_no} key={index}>{data.tender_ref_no}</option>
                })
              }
            </select>
            <h2>Details for Title Ref. No. <span id="ref-details"></span></h2>
            <label for="corrigendum">Corrigendum:</label>
            <textarea id="corrigendum" name="corrigendum" required onChange={handleInputs}></textarea>
            <label for="pdf-file">Attach File (PDF):</label>
            <div style={{display:"flex" , justifyContent:"flex-start"}}><input type="file" id="pdf-file" name="pdf-file" accept=".pdf" ref={corrigendumPdf} required></input><span style={{fontSize:"11px"}}>(Only PDF Allowed)</span></div>
            <button value={"Submit"} className='submitButton' onClick={handleCorrigendum}>Submit</button>
          </form>
        </div>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do You want to change the status of user
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleArchive} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog> 
    </div>
    </>
  );
}

export default Tender;


