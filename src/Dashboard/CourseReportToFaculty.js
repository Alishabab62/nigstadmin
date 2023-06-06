import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiFillFilePdf } from 'react-icons/ai';

export default function CourseReportToFaculty() {
  const [data, setData] = useState([]);


  function handlePDFView(data) {

    const url = `http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/sauth/report/view/${data}`;
    axios.get(url, { responseType: "blob" }).then((res) => {
      const objectUrl = URL.createObjectURL(res.data);
      const newWindow = window.open();

      if (!newWindow) {
        alert('Pop-up blocked. Please allow pop-ups for this website.');
      } else {
        newWindow.document.body.innerHTML = "<embed width='100%' height='100%' src='" + objectUrl + "' type='application/pdf'></embed>";
        newWindow.document.title = "PDF";
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const url = `http://ec2-13-233-110-121.ap-south-1.compute.amazonaws.com/sauth/view_by_faculty/${user.faculty}`;
    axios.get(url).then((res) => {
      setData(res.data.reports);
    }).catch((error) => {
      console.log(error)
    });
  }, [])
  return (
    <div className='user-details-wrapper'>
      <table>
        <tbody>
          <tr>
            <th>S.No</th>
            <th>Submission At</th>
            <th>Faculty</th>
            <th>Schedule ID</th>
            <th>Remark</th>
            <th>View PDF</th>
          </tr>
          {data.map((user, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.submission_date}</td>
                <td>{user.faculty}</td>
                <td>{user.schedule_id}</td>
                <td>{user.remarks}</td>
                <td><button> <AiFillFilePdf onClick={() => handlePDFView(user.schedule_id)} style={{ color: "red", fontSize: "30px" }} /></button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
