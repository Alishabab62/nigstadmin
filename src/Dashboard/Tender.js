import axios from 'axios';
import React, { useState , useRef, useEffect} from 'react';
import Button from '../components/Button';
import "../CSS/Tender.css"

function Tender() {
  const [showTenders, setShowTenders] = useState(true);
  const [showCorrigendum, setShowCorrigendum] = useState(false);
  const [tender , setDropdown] = useState([])
  const [tenderValue , setTenderValue ] = useState();
  const [formSelect , setFormSelect] = useState(true);
  const startDate = useRef();
  const endDate = useRef();
  const file = useRef();
  const [input , setInput] = useState({
    title:"",
    ref:"",
    description:"",
    corrigendum:""
  });

  const toggleTenders = () => {
    setShowTenders(!showTenders)
    setFormSelect(!formSelect)
  };
  const toggleCorrigendum = () => {
    setShowCorrigendum(!showCorrigendum);
    setFormSelect(!formSelect)
  };

  // const handleDropdownChange = () => {
  //   const refDropdown = document.getElementById('ref-dropdown');
  //   const refDetails = document.getElementById('ref-details');
  // };


// useEffect(()=>{
//   const url = "https://nigst.onrender.com/tender/refNo"
//   axios.get(url).then((res)=>{
//     setDropdown(res.data.tender)
//     console.log(res.data.tender) 
//     console.log(tender)
//   }).catch((err)=>{
//     console.log(err)
//   })
// },[])
 
useEffect(()=>{
  const url = `https://nigst.onrender.com/tender/corrigendum`;
  const data ={
    tender_ref_no: `${tenderValue}`,
    corrigendum:`${input.corrigendum}`
  }
  axios.post(url , data).then((res)=>{
    console.log(res)
  }).catch((error)=>{
    console.log(error)
  })
},[tenderValue])

function handleInputs(e){
  const name = e.target.name;
  const value = e.target.value;
 setInput((prevInput)=>({
  ...prevInput , [name]:value
 }))
}

function handleSubmit(e) {
  e.preventDefault();
  const url = "https://nigst.onrender/tender/create";
  const formData = new FormData();
  formData.append("title", input.title);
  formData.append("tenderRefNo", input.ref);
  formData.append("description", input.description);
  formData.append("startDate", startDate.current.value);
  formData.append("endDate", endDate.current.value);
  formData.append("pdf", file.current.files[0]);
  axios.post(url, formData).then((res) => {
    console.log(res);
  }).catch((error) => {
    console.log(error);
  });
}


  return (
    <div className='tenderCreation flex items-center'>
      {
      formSelect ?   <div className='creation'>
        <button className='openform' onClick={toggleTenders}>Tenders</button>
        <button className='openform' onClick={toggleCorrigendum}>Corregendom</button>
      </div> : ""
      }
      
      {showTenders && (
        <div id='div1'>
          <button className='close-btn' onClick={toggleTenders}>&times;</button>
          <form action="/submit-form" method="post" encType="multipart/form-data">
            <input type="text" id="title" name="title" required onChange={handleInputs} placeholder="Enter Tender"/>
            <input type="text" id="ref" name="ref" required onChange={handleInputs} placeholder={"Title Ref. No.:"}/>
            <textarea id="description" name="description" required onChange={handleInputs} placeholder={"Description:"}></textarea>
            <input type="date" id="start-date" name="starDate" required ref={startDate} placeholder={"Start Date:"}/>
            <input type="date" id="end-date" name="endDate" required  ref={endDate} placeholder={"End Date:"}/>
            <input type="file" id="pdf-file" name="pdf-file" accept=".pdf" required ref={file}/>
            <Button fun={handleSubmit} value={"Submit"} className='submitButton'/>
          </form>
        </div>
      )}

      {showCorrigendum && (
        <div id='div2'>
          <button className="close-btn" onClick={toggleCorrigendum}>&times;</button>
          <form action="/submit-corrigendum" method="post" encType="multipart/form-data">
            <label htmlFor="ref-dropdown">Select Title Ref. No.:</label>
            <select id="ref-dropdown" name="ref-dropdown" required onChange={(e)=> setTenderValue(e.target.value)}>
              {
                tender.map((data,index)=>{
                  return <option value={data} key={index}>{data.tender_ref_no}</option>
                })
              }
            </select>
            <h2>Details for Title Ref. No. <span id="ref-details"></span></h2>
            <label for="corrigendum">Corrigendum:</label>
            <textarea id="corrigendum" name="corrigendum" required onChange={handleInputs}></textarea>
            <label for="pdf-file">Attach File (PDF):</label>
            <input type="file" id="pdf-file" name="pdf-file" accept=".pdf" required></input>
            <Button value={"Submit"} className='submitButton'/>
          </form>
        </div>
      )}
    </div>
  );
}

export default Tender;


