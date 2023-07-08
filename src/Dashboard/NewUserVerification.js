import React, { useEffect, useRef, useState } from 'react';
import Inputs from '../components/Inputs';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Switch from '@mui/material/Switch';

export default function NewUserVerification() {
  const [verificationFilterValue, setVerificationFilterValue] = useState('');
  const [open, setOpen] = useState(false);
  const startDateRef = useRef();
  const endDateRef = useRef();
  const [data, setData] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [inputs, setInputs] = useState({
    email: '',
    orgName: '',
  });

  const handleClickOpen = (email) => {
    setOpen(true);
    setUserEmail(email);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function filter() {
    const url = `http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/admin/filter?status=${verificationFilterValue}&email=${inputs.email}&organization=${inputs.orgName}&startDate=${startDateRef.current.value}&endDate=${endDateRef.current.value}`;
    axios
      .get(url)
      .then((res) => {
        setData(res.data.reverse());
      })
      .catch((error) => {
        if (error.response.data.message === 'No matching records found.') {
          setData([]);
        }
      });
  }

  useEffect(() => {
    filter();
  }, []);

  function handleAdminVer() {
    setOpen(false);
    const url = 'http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/secure/verify';
    const data = {
      email: userEmail,
    };
    axios
      .patch(url, data)
      .then((res) => {
        console.log(res);
        filter();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  

  const [searchData, setSearchData] = useState('');

  const handleInputChange1 = (event) => {
    setSearchData(event.target.value);
    const input = event.target.value.toLowerCase();
    const rows = document.querySelectorAll("#Name tr");
  
    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      let shouldHide = true;
  
      cells.forEach((cell) => {
        if (cell.textContent.toLowerCase().includes(input)) {
          shouldHide = false;
        }
      });
  
      if (shouldHide) {
        row.classList.add("hidden");
      } else {
        row.classList.remove("hidden");
      }
    });
  };
  
  

  return (
    <div className="user-verification w-full">
      <div className="filter-wrapper">
        <select
          style={{ border: '1px solid black', width: '225px' }}
          onChange={(e) => setVerificationFilterValue(e.target.value)}
        >
          <option>Select by Verification Status</option>
          <option value={''}>All Student</option>
          <option value={'true'}>All verified Student</option>
          <option value={'false'}>All non-verified Student</option>
        </select>
        <div style={{ marginTop: '5px' }}>
          <span>From Date</span> <Inputs type={'date'} ref1={startDateRef} />
        </div>
        <div>
          <span>To Date</span> <Inputs type={'date'} ref1={endDateRef} />
        </div>
        <Button onClick={filter} sx={{bgcolor:"#1b3058",color:"white"}} variant="contained">Apply</Button>
      </div>
      <div>
        <input
          type="text"
          id="SearchInput"
          placeholder="Search New Users"
          value={searchData}
          onChange={handleInputChange1}
        />
      </div>
      <div className="user-details-wrapper">
        {data.length > 0 && (
          <table>
            <thead>
              <tr>
                <th colSpan="13" style={{ textAlign: 'center', backgroundColor: '#ffcb00' }}>
                  Users
                </th>
              </tr>
              <tr>
                <th>S.No</th>
                <th>Created At</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Organization</th>
                <th>Gender</th>
                <th>Mobile Verification</th>
                <th>Email Verification</th>
                <th>NIGST Verification</th>
              </tr>
            </thead>
            <tbody id='Name' >
              {data.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.created_at}</td>
                    <td>{user.first_name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.organization}</td>
                    <td>{user.gender}</td>
                    <td>{user.mobile_verified ? 'True' : 'False'}</td>
                    <td>{user.email_verified ? 'True' : 'False'}</td>
                    <td>
                      <Switch
                        checked={user.admin_verified}
                        onChange={()=>handleClickOpen(user.email)}
                        data={user.email}
                        sx={{
                          '& .MuiSwitch-thumb': {
                            color: user.admin_verified ? 'green' : 'red',
                          },
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {data.length === 0 && (
          <div style={{ width: '100%', textAlign: 'center', fontSize: '30px', marginTop: '200px' }}>
            No data to show
          </div>
        )}
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Do you want to change the status of the user?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleAdminVer} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
