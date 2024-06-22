import React, { useContext, useEffect, useState } from 'react'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Spiner from "../../Components/Spiner/Spiner"
import { empattendancefunc, fetchEmployeeIds } from "../../services/Apis"
import { ToastContainer, toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import "./addAttendance.css"
import { addAttendanceData } from '../../Components/context/AttendanceContextProvider';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddAttendance = () => {

    const [inputdata, setInputData] = useState({
        employeeID: "",
        intime: "",
        outtime: "",
        workingtime: "",
        attdate: new Date(),

    });


    const [employeeIds, setEmployeeIds] = useState([]); // State to store employee IDs


    const [showspin, setShowSpin] = useState(false);
    // const [preview, setPreview] = useState("");

    const navigate = useNavigate();

    const { setAttendanceadd } = useContext(addAttendanceData);

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

    // Handle date change for start date
    const handleDateChange = (date, fieldName) => {
        setInputData({ ...inputdata, [fieldName]: date });
    }

    //get the current time
    const getCurrentTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };
    

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


    //submit attendance data
    const submitAttendanceData = async (e) => {
        e.preventDefault();

        const { employeeID, intime, outtime, workingtime, attdate } = inputdata;
        if (employeeID === "") {
            toast.error("EmployeeId is Required !")
        } else if (intime === "") {
            toast.error("In time is Required !")
         } else if (outtime === "" || outtime > getCurrentTime()) { // Check if out time is empty or future time
                toast.error("Please select a valid out time.Future time is not allowed");
        } else {

            const data = new FormData();
            data.append("employeeID", employeeID)
            data.append("intime", intime)
            data.append("outtime", outtime)
            data.append("workingtime", workingtime)
            data.append("attdate", attdate)

            const config = {
                "Content-Type": "multipart/form-data"
            }

            setShowSpin(true);

            const response = await empattendancefunc(data, config);

            setShowSpin(false);

            if (response.status === 200) {
                setInputData({
                    ...inputdata,
                    employeeID: "",
                    intime: "",
                    outtime: "",
                    workingtime: "",
                    attdate: new Date(),

                });
                setAttendanceadd(response.data)
                navigate("/attendance");
            } else {
                toast.error("Error!")
            }

        }

    }

    useEffect(() => {
        calculateWorkingTime();
    }, [inputdata.intime, inputdata.outtime]);


    return (
        <>
            {
                showspin ? <Spiner /> : <div className="container">

                    <h2 className='text-center mt-1'>Attendance Registration</h2>

                    <Card className='shadow mt-3 p-3'>

                        <div className="topic">
                            <h5 className="text-left mb-3">Attendance Information</h5>
                        </div>
                        <div className="form-section">

                            <Form>
                                <Row>

                                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                        <Form.Label>Employee ID</Form.Label>

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
                                    {/* 
                                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                        <Form.Label>Out time</Form.Label>
                                        <Form.Control type="time" name='outtime' value={inputdata.outtime} onChange={setInputValue} />
                                    </Form.Group>
                                    */}
                                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                        <Form.Label>Out time</Form.Label>
                                        <Form.Control
                                            type="time"
                                            name='outtime'
                                            value={inputdata.outtime}
                                            onChange={setInputValue}
                                            max={getCurrentTime()} // Setting max attribute to current time
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                        <Form.Label>Work Time</Form.Label>
                                        <Form.Control type="text" name='workingtime' value={inputdata.workingtime} disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3 col-lg-6" controlId="formBasicStartDate">
                                        <Form.Label>Attendance Date</Form.Label>
                                        <DatePicker
                                            selected={inputdata.attdate}
                                            onChange={(date) => handleDateChange(date, "attdate")}
                                            dateFormat="yyyy-MM-dd"
                                        />
                                    </Form.Group>
                                </Row>

                            </Form>
                        </div>

                        <br></br>
                        <Button variant="primary" type="submit" onClick={submitAttendanceData}>
                            Submit Attendance
                        </Button>
                    </Card>
                    <ToastContainer position="top-center" />
                </div>
            }
        </>
    )

}

export default AddAttendance

