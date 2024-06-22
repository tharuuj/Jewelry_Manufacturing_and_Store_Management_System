import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Spiner from "../../Components/Spiner/Spiner"
import "./profileEmp.css";
import { useParams } from 'react-router-dom';
import { singleEmployeegetfunc } from '../../services/Apis';
import { BASE_URL } from '../../services/helper';
import moment from "moment"
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Profile = () => {

  const [employeeprofile, setEmployeeProfile] = useState({});
  const [showspin, setShowSpin] = useState(true);

  // Initialize state for employee types and their counters
  const [employeeCounters, setEmployeeCounters] = useState({
    worker: 0,
    trainee: 0,
    contract: 0
  });

  const { id } = useParams();

  const employeeProfileGet = async () => {
    const response = await singleEmployeegetfunc(id);

    if (response.status === 200) {
      setEmployeeProfile(response.data);

      // Increment counters based on employee type
      setEmployeeCounters(prevCounters => ({
        ...prevCounters,
        [response.data.empType]: prevCounters[response.data.empType] + 1
      }));

    } else {
      console.log("error");
    }
  };

  // Function to format employee IDs
  const formatEmployeeID = (_id, employeeType, counter) => {
    // Get the last 4 digits of the original ID
    const lastFourDigits = _id.slice(-4);

    // Define prefix based on employee type
    let prefix;
    switch (employeeType) {
      case "worker":
        prefix = "W";
        break;
      case "trainee":
        prefix = "T";
        break;
      case "contract":
        prefix = "C";
        break;
      default:
        prefix = "";
    }

    // Format ID with prefix, last four digits of the original ID, and counter
    // return prefix + lastFourDigits + counter.toString().padStart(3, "0");
    return prefix + lastFourDigits;
  };

  useEffect(() => {
    employeeProfileGet();
    setTimeout(() => {
      setShowSpin(false)
    }, 1200)
  }, [id]);

  // Report generation
  const generatePDF = () => {
    const input = document.getElementById('profile-container');
    const pdf = new jsPDF('p', 'pt');
    const pdfWidth = 500;
    const pdfHeight = 500;

    const tableHeaders = ['Field', 'Value'];
    const data = [
      ['Employee ID', formatEmployeeID(employeeprofile._id, employeeprofile.empType, employeeCounters[employeeprofile.empType])],
      ['Date Created', moment(employeeprofile.datecreated).format("DD-MM-YYYY")],
      ['Date Updated', employeeprofile.dateUpdated],
      ['Full Name', employeeprofile.empfname + employeeprofile.emplname],
      ['Email', employeeprofile.empemail],
      ['Phone Number', employeeprofile.empmobile],
      ['Address', employeeprofile.empaddress],
      ['Gender', employeeprofile.empgender],
      ['Employee Type', employeeprofile.empType],
      ['Basic Salary', employeeprofile.salaryPerDay],
      ['Start Date', employeeprofile.startDate],
      ['End Date', employeeprofile.endDate],
      ['Status', employeeprofile.status]
    ];

    pdf.setFontSize(12);
    pdf.text("Diamonds.lk   Employee Profile", pdfWidth / 2, 30, 'center');
    pdf.autoTable({
      startY: 50,
      head: [tableHeaders],
      body: data,
      startY: 50
    });

    pdf.save(`employee_profile_${id}.pdf`);
  };

  return (
    <>
      {
        showspin ? <Spiner /> : <div className="container" id="profile-container">

          <Card className="card-profile shadow col-lg-6 mx-auto mt-5">
            <Card.Body>
              <Row>
                <div className="col">
                  <div className="employee-profile">
                    <h2>Employee Profile</h2>
                  </div>
                  <div className="profile-photo">
                    <img src={`${BASE_URL}/uploads/${employeeprofile.profile}`} alt="Employee Profile" />
                  </div>

                </div>


                <div className="employee-details">
                  <p>Employee ID: {formatEmployeeID(employeeprofile._id, employeeprofile.empType, employeeCounters[employeeprofile.empType])}</p>
                  <p>Date Created: {moment(employeeprofile.datecreated).format("DD-MM-YYYY")}</p>
                  <p>Date Updated: {employeeprofile.dateUpdated}</p>
                </div>


              </Row>
              <div className="personal-info">
                <h4>Personal Information</h4>
                <table>
                  <tbody>
                    <tr>
                      <td>Full Name</td>
                      <td>{employeeprofile.empfname + employeeprofile.emplname}</td>
                    </tr>

                    <tr>
                      <td>Email</td>
                      <td>{employeeprofile.empemail}</td>
                    </tr>
                    <tr>
                      <td>Phone Number</td>
                      <td>{employeeprofile.empmobile}</td>
                    </tr>
                    <tr>
                      <td>Address</td>
                      <td>{employeeprofile.empaddress}</td>
                    </tr>
                    <tr>
                      <td>Gender</td>
                      <td>{employeeprofile.empgender}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="employment-info">
                <h4>Employment Information</h4>
                <table>
                  <tbody>
                    <tr>
                      <td>Employee Type</td>
                      <td>{employeeprofile.empType}</td>
                    </tr>
                    <tr>
                      <td>Basic Salary</td>
                      <td>{employeeprofile.salaryPerDay}</td>
                    </tr>
                    <tr>
                      <td>Start Date</td>
                      <td>{employeeprofile.startDate}</td>
                    </tr>
                    <tr>
                      <td>End Date</td>
                      <td>{employeeprofile.endDate}</td>
                    </tr>
                    <tr>
                      <td>Status</td>
                      <td>{employeeprofile.status}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </div>
      }
      {/* Button to generate PDF */}
      <div className="text-center mt-3">
        <button className="btn btn-primary" onClick={generatePDF}>Generate PDF</button>
      </div>
    </>
  );
};

export default Profile;
