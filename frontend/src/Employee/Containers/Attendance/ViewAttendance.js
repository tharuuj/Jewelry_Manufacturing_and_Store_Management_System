import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Spiner from "../../Components/Spiner/Spiner"
//import "./profileEmp.css";
import { useParams } from 'react-router-dom';
import { singleAttendancegetfunc } from '../../services/Apis';
import { BASE_URL } from '../../services/helper';
import moment from "moment"

const ViewAttendance = () => {

  const [attendanceprofile, setAttendanceProfile] = useState({});
  const [showspin, setShowSpin] = useState(true);

  

  const { id } = useParams();

  const attendanceProfileGet = async () => {
    const response = await singleAttendancegetfunc(id);

    if (response.status === 200) {
      setAttendanceProfile(response.data);

      

    } else {
      console.log("error");
    }
  };

  

  useEffect(() => {
    attendanceProfileGet();
    setTimeout(() => {
      setShowSpin(false)
    }, 1200)
  }, [id]);

  return (
    <>
      {
        showspin ? <Spiner /> : <div className="container">

          <Card className="card-profile shadow col-lg-6 mx-auto mt-5">
            <Card.Body>
              <Row>
                <div className="col">
                  <div className="employee-profile">
                    <h2>Attendance Details</h2>
                  </div>
                  

                </div>


                <div className="employee-details">
                  <p>Attendance ID: {attendanceprofile._id}</p>
                  <p>Date Created: {moment(attendanceprofile.datecreated).format("DD-MM-YYYY")}</p>
                  <p>Date Updated: {attendanceprofile.dateUpdated}</p>
                </div>


              </Row>
              <div className="personal-info">
                <h4>Attendance Information</h4>
                <table>
                  <tbody>
                  <tr>
                      <td>Employee ID</td>
                      <td>{attendanceprofile.employeeID}</td>
                    </tr>
                    <tr>
                      <td>In Time</td>
                      <td>{attendanceprofile.intime}</td>
                    </tr>

                    <tr>
                      <td>Out Time</td>
                      <td>{attendanceprofile.outtime}</td>
                    </tr>
                    <tr>
                      <td>Working Time</td>
                      <td>{attendanceprofile.workingtime}</td>
                    </tr>
                    <tr>
                      <td>Over Time</td>
                      <td></td>
                    </tr>
                    
                  </tbody>
                </table>
              </div>
              
            </Card.Body>
          </Card>
        </div>
      }

    </>
  );
};

export default ViewAttendance;



