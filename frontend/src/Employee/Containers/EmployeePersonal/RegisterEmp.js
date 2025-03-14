import React, { useContext, useEffect, useState } from 'react'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import Spiner from "../../Components/Spiner/Spiner"
import { empregisterfunc } from "../../services/Apis"
import { ToastContainer, toast } from "react-toastify"
import {useNavigate} from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import "./registerEmp.css"
import { addData } from '../../Components/context/ContextProvider';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Register = () => {

  const [inputdata, setInputData] = useState({
    empfname: "",
    emplname: "",
    empemail: "",
    empmobile: "",
    empaddress: "",
    empgender: "",
    empType: ""

  });


  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [showspin, setShowSpin] = useState(true);
  // const [pdfFile, setPdfFile] = useState(null);
  // New state variables
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState("");
  const [salaryPerDay, setSalaryPerDay] = useState("");

  const navigate = useNavigate();

  const { employeeadd, setEmployeeadd } = useContext(addData);
  

  // status options
  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },
  ];

  // setInput Value
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value })
  }

  // status set
  const setStatusValue = (e) => {
    setStatus(e.value)
  }

  // profile set
  const setProfile = (e) => {
    setImage(e.target.files[0])
  }

  /*
  //pdf
  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    setPdfFile(file);
  };

  */

  // Date change handlers
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  // Salary per day change handler
  const handleSalaryPerDayChange = (e) => {
    setSalaryPerDay(e.target.value);
  };

  //submit userdata
  const submitEmployeeData = async (e) => {
    e.preventDefault();

    const { empfname, emplname, empemail, empmobile, empaddress, empgender, empType } = inputdata;

    if (empfname === "") {
      toast.error("First name is Required !")
    } else if (emplname === "") {
      toast.error("Last name is Required !")
    } else if (empemail === "") {
      toast.error("Email is Required !")
    } else if (!empemail.includes("@")) {
      toast.error("Enter Valid Email !")
    } else if (empmobile === "") {
      toast.error("Mobile is Required !")
    } else if (empmobile.length > 10) {
      toast.error("Enter Valid Mobile !")
    } else if (empaddress === "") {
      toast.error("Address is Required !")
    } else if (empgender === "") {
      toast.error("Gender is Required !")
    } else if (image === "") {
      toast.error("Employee profile is Required !")
    } else if (empType === "") {
      toast.error("Employee type is Required !")
    } else if (salaryPerDay === "") {
      toast.error("Employee basic salary is Required !")
    } else if (status === "") {
      toast.error("Status is Required !")
      //   } else if (pdfFile === null) {
      //     toast.error("PDF Document is Required!");
    } else {

      const data = new FormData();
      data.append("empfname", empfname)
      data.append("emplname", emplname)
      data.append("empemail", empemail)
      data.append("empmobile", empmobile)
      data.append("empaddress", empaddress)
      data.append("empgender", empgender)
      data.append("empType", empType)
      data.append("status", status)
      data.append("emp_profile", image)
      data.append("salaryPerDay", salaryPerDay)
      data.append("startDate", startDate)
      data.append("endDate", endDate);
      // data.append("end_date", endDate.toISOString());

      const config = {
        "Content-Type": "multipart/form-data"
      }

      const response = await empregisterfunc(data, config);


      if (response.status === 200) {
        setInputData({
          ...inputdata,
          empfname: "",
          emplname: "",
          empemail: "",
          empmobile: "",
          empaddress: "",
          empgender: "",
          empType: ""
        });
        setStatus("");
        setImage("");
        setStartDate("");
        setEndDate("");
        setSalaryPerDay("");
        setEmployeeadd(response.data)
        navigate("/homemp");

      } else {
        toast.error("Error!")
      }

    }

  }


  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image))
    }

    setTimeout(() => {
      setShowSpin(false)
    }, 1200)
  }, [image])


  return (
    <>
      {
        showspin ? <Spiner /> : <div className="container">

          <h2 className='text-center mt-1'>Employee Registration</h2>

          <Card className='shadow mt-3 p-3'>
            <div className="profile_div text-center">
              <img src={preview ? preview : "/man.png"} alt="img" />
            </div>

            <br></br>
            <br></br>
            <div className="topic">
              <h5 className="text-left mb-3">Personal Information</h5>
            </div>
            <div className="form-section">


              <Form>
                <Row>
                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" name='empfname' value={inputdata.empfname} onChange={setInputValue} placeholder='Enter Employee FirstName' />
                  </Form.Group>
                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name='emplname' value={inputdata.emplname} onChange={setInputValue} placeholder='Enter Employee LastName' />
                  </Form.Group>
                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name='empemail' value={inputdata.empemail} onChange={setInputValue} placeholder='Enter Employee Email' />
                  </Form.Group>
                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control type="text" name='empmobile' value={inputdata.empmobile} onChange={setInputValue} placeholder='Enter Employee Mobile' />
                  </Form.Group>
                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name='empaddress' value={inputdata.empaddress} onChange={setInputValue} placeholder='Enter Employee Address' />
                  </Form.Group>
                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    <Form.Label>Select Gender</Form.Label>
                    <Form.Check
                      type={"radio"}
                      label={`Male`}
                      name="empgender"
                      value={"Male"}
                      onChange={setInputValue}
                    />
                    <Form.Check
                      type={"radio"}
                      label={`Female`}
                      name="empgender"
                      value={"Female"}
                      onChange={setInputValue}
                    />
                  </Form.Group>


                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    <Form.Label>Select Employee Photo</Form.Label>
                    <Form.Control type="file" name='emp_profile' onChange={setProfile} placeholder='Select Profile' />
                  </Form.Group>



                </Row>

              </Form>
            </div>
            <br></br>
            <div className="topic">
              <h5 className="text-left mb-3">Employment Information</h5>
            </div>
            <div className="form-section">

              <Form>

                <Row>

                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    <Form.Label>Start Date</Form.Label>
                    <DatePicker selected={startDate} onChange={handleStartDateChange} />
                  </Form.Group>
                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    <Form.Label>End Date</Form.Label>
                    <DatePicker selected={endDate} onChange={handleEndDateChange} />
                  </Form.Group>

                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    <Form.Label>Employee Type</Form.Label>
                    <Form.Select
                      name="empType"
                      value={inputdata.empType}
                      onChange={setInputValue}
                    >
                      <option value="">Select Employee Type</option>
                      <option value="trainee">Trainee</option>
                      <option value="worker">Worker</option>
                      <option value="contract">Contract</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    <Form.Label>Basic Salary Per Day</Form.Label>
                    <Form.Control
                      type="text"
                      name="salaryPerDay"
                      value={salaryPerDay}
                      onChange={handleSalaryPerDayChange}
                      placeholder="Enter Salary Per Day"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    <Form.Label>Select Status</Form.Label>
                    <Select options={options} onChange={setStatusValue} />
                  </Form.Group>
                  {/* 
                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    <Form.Label>Upload PDF Document</Form.Label>
                    <Form.Control
                      type="file"
                      accept=".pdf"
                      name="pdfFile"
                      onChange={handlePdfUpload}
                      placeholder="Select PDF Document"
                    />
                    <Form.Text className="text-muted">
                      Please upload a PDF document.
                    </Form.Text>
                  </Form.Group>
*/}
                </Row>
              </Form>
            </div>
            <br></br>
            <Button variant="primary" type="submit" onClick={submitEmployeeData}>
              Submit
            </Button>
          </Card>
          <ToastContainer position="top-center" />
        </div>
      }
    </>
  )

}

export default Register