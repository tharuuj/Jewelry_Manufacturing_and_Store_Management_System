import React, { useContext, useEffect, useState } from 'react'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import Spiner from "../../Components/Spiner/Spiner"
//import { updateData } from '../../components/context/ContextProvider';
import { ToastContainer, toast } from "react-toastify"
//import { BASE_URL } from '../../services/helper';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { editattendancefunc, singleAttendancegetfunc, fetchEmployeeIds } from '../../services/Apis';
import { useNavigate, useParams } from 'react-router-dom';
//import "./EditEmp.css"
import { BASE_URL } from '../../services/helper';
import { updateAttendanceData } from '../../Components/context/AttendanceContextProvider';



const UpdateAttendance = () => {

  const [inputdata, setInputData] = useState({
    employeeID: "",
    intime: "",
    outtime: "",
    workingtime: ""
    
  });


  const [preview, setPreview] = useState("");
  const [showspin, setShowSpin] = useState(false);

 const [employeeIds, setEmployeeIds] = useState([]); // State to store employee IDs


const {attendanceupdate, setAttendancUpdate} = useContext(updateAttendanceData)

const navigate = useNavigate();

  const { id } = useParams();



  useEffect(() => {
    // Fetch employee IDs when the component mounts
    fetchEmployeeIds()
        .then(ids => {
            setEmployeeIds(ids);
        })
        .catch(error => console.error('Error fetching employee IDs:', error));
}, []);

  // setInput Value
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value })
  }

// Function to format employee IDs
const formatEmployeeID = (_id, prefix = "E") => {
  // Get the last 4 digits of the original ID
  const lastFourDigits = _id.slice(-4);

  // Format ID with prefix and last four digits of the original ID
  return prefix + lastFourDigits;
};


 
  


  const attendanceProfileGet = async () => {
    const response = await singleAttendancegetfunc(id);

    if (response.status === 200) {     
      setInputData(response.data)
      
    } else {
      console.log("error");
    }
  }

  //calculate working time
  const calculateWorkingTime = () => {
    const intimeParts = inputdata.intime.split(":");
    const outtimeParts = inputdata.outtime.split(":");
  
    const intimeHours = parseInt(intimeParts[0]);
    const intimeMinutes = parseInt(intimeParts[1]);
    const outtimeHours = parseInt(outtimeParts[0]);
    const outtimeMinutes = parseInt(outtimeParts[1]);
  
    let hours = outtimeHours - intimeHours;
    let minutes = outtimeMinutes - intimeMinutes;
  
    // Adjust for negative minutes
    if (minutes < 0) {
      hours--;
      minutes += 60;
    }
  
    const workingTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    setInputData({ ...inputdata, workingtime: workingTime }); // Setting workingtime as a string
  }
  
  


  //submit userdata
  const submitAttendanceData = async (e) => {
    e.preventDefault();

    const { employeeID, intime, outtime, workingtime } = inputdata;
        if (employeeID === "") {
            toast.error("EmployeeId is Required !")
        } else if (intime === "") {
            toast.error("In time is Required !")
    } else {

        const data = new FormData();
        data.append("employeeID", employeeID)
        data.append("intime", intime)
        data.append("outtime", outtime)
        data.append("workingtime", workingtime)

      const config = {
        "Content-Type": "multipart/form-data"
      }
      setShowSpin(true);
      const response = await editattendancefunc(id, data,config);
      setShowSpin(false);
          if(response.status === 200){
           
            setAttendancUpdate(response.data)
            navigate("/attendance");
          }
     
    }

  }

  useEffect(() => {
    attendanceProfileGet();
  }, [id])

  useEffect(() => {
    calculateWorkingTime();
  }, [inputdata.intime, inputdata.outtime]);
  //didnt update the code from this point to below
 /* useEffect(() => {
    if (image) {
      setImgdata("")
      setPreview(URL.createObjectURL(image))
    }    
    setTimeout(() => {
      setShowSpin(false)
    }, 1200)
  }, [image])
*/

  return (
    <>
      {
        showspin ? <Spiner /> : <div className="container">


          <h2 className='text-center mt-1'>Update Attendance Details</h2>

          <Card className='shadow mt-3 p-3'>
            
            <br></br>
            <div className="topic">
              <h5 className="text-left mb-3">Attendance Details</h5>
            </div>
            <div className="form-section">


            <Form>
                                <Row>

                                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                        <Form.Label>Employee ID</Form.Label>
                                        {/* Render dropdown with employee IDs 
                                        <Form.Control as="select" name='employeeID' value={inputdata.employeeID} onChange={setInputValue}>
                                                <option value="">Select Employee ID</option>
                                                {employeeIds.map(id => (
                                                    <option key={id} value={id}>{id}</option>
                                                ))}
                                            </Form.Control>
                                        */}
                                        <Form.Control as="select" name='employeeID' value={inputdata.employeeID} onChange={setInputValue}>
                                            <option value="">Select Employee ID</option>
                                            {employeeIds.map(id => (
                                                <option key={id} value={id}>{formatEmployeeID(id)}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                        <Form.Label>In time</Form.Label>
                                        <Form.Control type="time" name='intime' value={inputdata.intime} onChange={setInputValue} />
                                    </Form.Group>
                                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                        <Form.Label>Out time</Form.Label>
                                        <Form.Control type="time" name='outtime' value={inputdata.outtime} onChange={setInputValue} />
                                    </Form.Group>
                                    {/*
                                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                        <Form.Label>Work Time</Form.Label>
                                        <Form.Control type="time" name='workingtime' value={inputdata.workingtime} onChange={setInputValue} />
                                    </Form.Group>
                                          */}
                                          <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                        <Form.Label>Work Time</Form.Label>
                                        <Form.Control type="text" name='workingtime' value={inputdata.workingtime} disabled />
                                    </Form.Group>
                                </Row>

                            </Form>
            </div>
            
            
            <br></br>
            <Button variant="primary" type="submit" onClick={submitAttendanceData}>
              Update Attendance
            </Button>
          </Card>
          <ToastContainer position="top-center" />
        </div>
      }
    </>
  )

}


export default UpdateAttendance
