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
  const [enterValidAlert, setEnterValidAlert] = useState(false);
  const [dateCheck,setDateCheck] = useState(false)
  const [viewTender , setViewTender] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [tenderNo , setTenderNo] = useState("");
  const [tenderArchiveSuccess,setTenderArchiveSuccess] = useState(false);
  const [viewArchiveTender,setViewArchiveTender] = useState(false);
  const [viewArchive,setViewArchive] = useState([]);
  const [noDataToShow, setNoDataToShow] = useState(false);
  const [input , setInput] = useState({
    title:"",
    ref:"",
    description:"",
    corrigendum:""
  });

  const toggleTenders = () => {
    setShowTenders(true)
    setFormSelect(false)
    setFilter(false)
    setViewArchiveTender(false)
  };
  const toggleCorrigendum = () => {
    setShowCorrigendum(true);
    setFormSelect(false)
    setViewArchiveTender(false)
    setFilter(false)
  };
function archiveFun(){
    setViewArchiveTender(true)
    setShowCorrigendum(false);
    setFilter(false)
    setShowTenders(false)
}
 function closeTenderForm(){
    setViewArchiveTender(false)
    setShowCorrigendum(false);
    setFilter(false)
    setFormSelect(true)
    setFilter(true)
    setShowTenders(false)
 }
//  function closeCorregendumForm(){
//   setViewArchiveTender(false)
//   setShowCorrigendum(false);
//   setFilter(false)
//   setFormSelect(true)
//   setFilter(true)
//   setShowTenders(false)
//  }
function viewPDF(id) {
  const url = `http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/tender/vpdf/${id}`;
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
  tenderViewFun();
  viewArchiveTenderUI();
},[])


function viewArchiveTenderUI(){
  const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/tender/view_archive";
  axios.get(url).then((res)=>{
  setViewArchive(res.data.data);
  }).catch((error)=>{
    if(error.response.data.message === "Nothing to show!"){
      setNoDataToShow(true)
    }
  })
}


function tenderViewFun(){
  const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/tender/view";
  axios.get(url).then((res)=>{
    setViewTender(res.data.tender.reverse());
  }).catch((error)=>{
    if(error.response.data.message === "Nothing to show."){
      setNoDataToShow(true);
      setViewTender([]);
    }
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
  e.preventDefault();
  if(startDate.current.value > endDate.current.value){
    setDateCheck(true);
    setTimeout(() => {
      setDateCheck(false)
    }, 5000);
    return;
  }
  if(input.ref.includes('/')){
    setEnterValidAlert(true);
    setTimeout(() => {
      setEnterValidAlert(false);
    }, 5000);
    return;
  }
  if(file.current.files[0] !== undefined && input.title && input.description && startDate.current.value && endDate.current.value && input.ref ){
    const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/tender/create";
    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("tenderRefNo", input.ref);
    formData.append("description", input.description);
    formData.append("startDate", startDate.current.value);
    formData.append("endDate", endDate.current.value);
    formData.append("pdf", file.current.files[0]);
    axios.post(url, formData).then((res) => {
     tenderViewFun(); 
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
  const formData = new FormData();
  formData.append("corrigendum", input.corrigendum);
  formData.append("tender_number", tenderValue);
  formData.append("pdf", corrigendumPdf.current.files[0]);
  const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/tender/corrigendum"
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
  viewArchiveTenderUI();
  const url = "http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/tender/archive";
  const data = {
    tender_number:`${tenderNo}`
  }
  axios.patch(url,data).then((res)=>{
    
    if(res.data.message=== "Tender archived successfully"){
      setTenderArchiveSuccess(true);
      viewArchiveTenderUI();
      tenderViewFun();
    }
    setTimeout(() => {
      setTenderArchiveSuccess(false)
    }, 5000);
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

function corrigendumPDFView(corrigendumID){
  const url = `http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/tender/corri_pdf/${corrigendumID}`;
  axios.get(url, { responseType: "blob" }).then((res) => {
    const objectUrl = URL.createObjectURL(res.data);
    const newWindow = window.open();
    newWindow.document.title = "PDF"
    if (!newWindow) {
      alert('Pop-up blocked. Please allow pop-ups for this website.');
    } else {
      newWindow.document.body.innerHTML = "<embed width='100%' height='100%' src='" + objectUrl + "' type='application/pdf'></embed>";
    }
  }).catch((error) => {
    console.log(error);
  });
}

function archiveCorrigendumPDFView(id){
  const url = `http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/tender/corri_pdf/${id}`;
  axios.get(url, { responseType: "blob" }).then((res) => {
    const objectUrl = URL.createObjectURL(res.data);
    const newWindow = window.open();
    newWindow.document.title = "PDF"
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
    <div style={{display:"flex",flexDirection:"column"}}>
      {tenderArchiveSuccess && <Alert severity='success' style={{position:"absolute",left:"50%" , top:"130px"}}>Tender Archive successfully</Alert>}
      {
      formSelect ?   <div className='creation' style={{marginTop:"50px"}}>
        <button className='openform' onClick={toggleTenders}>Create New Tenders</button>
        <button style={{width:"300px"}} className='openform ' onClick={toggleCorrigendum}>Create New Corregendom</button>
        <button className='openform' onClick={archiveFun}>View Archive Tender</button>
      </div> : ""
      }
      {(viewTender.length>=1 && filter) ? <div className='user-details-wrapper'>
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
                  <td>
        { data.corrigenda[0].corrigendumID !== null ? 
          <table>
            <tbody>
              <tr>
                <th>S.No</th>
                <th>Created At</th>
                <th>ID</th>
                <th>Corregendom</th>
                <th>PDF</th>
              </tr>
              {data.corrigenda.map((corrigendum, index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{corrigendum.created_at}</td>
                  <td>{corrigendum.corrigendumID}</td>
                  <td>{corrigendum.corrigendum}</td>
                  <td>{corrigendum.pdf !== null ? <AiFillFilePdf style={{color:"red",fontSize:"30px",cursor:"pointer"}}  onClick={(e)=>corrigendumPDFView(corrigendum.corrigendumID)}/> : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
            : "" }
        </td>
                  <td  style={{cursor:"pointer"}} ><AiFillFilePdf style={{color:"red",fontSize:"25px"}}   onClick={()=>viewPDF(data.tender_ref_no)}/></td>
                  <td><button data={data.tender_ref_no} style={{backgroundColor:"green" , color:"green" , borderRadius:"50%" , height:"25px" , width:"25px"}} onClick={handleClickOpen}></button></td>
              </tr>
                )
              })
            }
           
        </table>
        </div> : "" }
        {
       (( viewTender.length === 0 && filter) || (viewArchive.length  === 0 && viewArchiveTender)) && 
        <div style={{ width: "100%", textAlign: "center", fontSize: "30px", marginTop: "200px" }}>No data to show</div>
      }
        {(viewArchiveTender && viewArchive.length > 0) ? <div className='user-details-wrapper'>
        <table>
            <tr>
                <th>S.No</th>
                <th>Tender No</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Corregendom</th>
            </tr>
            {
              viewArchive.map((data,index)=>{
                return (
                  <tr key={index}>
                  <td>{index+1}</td>
                  <td>{data.tender_ref_no}</td>
                  <td>{data.description}</td>
                  <td>{data.startdate}</td>
                  <td>{data.enddate}</td>
                  <td>
                  { data.corrigendum[0].corrigendumID !== null ? 
          <table>
            <tbody>
              <tr>
                <th>S.No</th>
                <th>Created At</th>
                <th>ID</th>
                <th>Corregendom</th>
                <th>PDF</th>
              </tr>
              {data.corrigendum.map((corrigendum, index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{corrigendum.created_at}</td>
                  <td>{corrigendum.corrigendumID}</td>
                  <td>{corrigendum.corrigendum}</td>
                  <td>{corrigendum.pdf !== null ? <AiFillFilePdf style={{color:"red",fontSize:"30px",cursor:"pointer"}}  onClick={(e)=>archiveCorrigendumPDFView(data.tender_ref_no)}/> : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
            : "" }
                  </td>
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
          {dateCheck ? <Alert severity="error" style={{marginBottom:"10px"}}>Start Date can't be greater</Alert> : ""}
          {enterValidAlert ? <Alert severity="error" style={{marginBottom:"10px"}}>Enter Valid String</Alert> : ""}
          <button className='close-btn' onClick={closeTenderForm}>&times;</button>
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
          <button className="close-btn" onClick={closeTenderForm}>&times;</button>
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
            <div style={{display:"flex" , justifyContent:"flex-start"}}><input type="file" id="pdf-file" name="pdf-file" accept=".pdf" ref={corrigendumPdf} required></input><span style={{fontSize:"11px"}}>(Only PDF Allowed (Optional))</span></div>
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
          Do you want to archive the tender
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
    </div>
  );
}

export default Tender;


