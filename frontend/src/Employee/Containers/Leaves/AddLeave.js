import React, { useContext, useEffect, useState } from 'react'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import Spiner from "../../Components/Spiner/Spiner"
import { empleavefunc, fetchEmployeeIds } from "../../services/Apis"
import { ToastContainer, toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
//import "./addWorkHistory.css"
import { addLeaveData } from '../../Components/context/LeaveContextProvider';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddLeave = () => {

  const [inputdata, setInputData] = useState({
    empsId: "",
    leavedate: null,
    leavedes: "",
  });

  const [employeeIds, setEmployeeIds] = useState([]);

  const [showspin, setShowSpin] = useState(false);
  // const [preview, setPreview] = useState("");

  const navigate = useNavigate();

  const { leaveadd, setLeaveadd } = useContext(addLeaveData);

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

  

  // Handle date change for start date
  const handleDateChange = (date, fieldName) => {
    setInputData({ ...inputdata, [fieldName]: date });
  }

  // Function to format employee IDs
  const formatEmployeeID = (_id, prefix = "E") => {
    // Get the last 4 digits of the original ID
    const lastFourDigits = _id.slice(-4);

    // Format ID with prefix and last four digits of the original ID
    return prefix + lastFourDigits;
  };


  //submit userdata
  const submitLeaveData = async (e) => {
    e.preventDefault();

    const { empsId, leavedate, leavedes } = inputdata;
    if (empsId === "") {
      toast.error("Employee Id is Required !")
    } else if (leavedate === "") {
      toast.error("Leave date is Required !")
    } else if (leavedes === "") {
      toast.error("Leave reason is Required !")
    } else {

      const data = new FormData();
      data.append("empsId", empsId)
      data.append("leavedate", leavedate)
      data.append("leavedes", leavedes)

      const config = {
        "Content-Type": "multipart/form-data"
      }

      setShowSpin(true);

      const response = await empleavefunc(data, config);

      setShowSpin(false);

      if (response.status === 200) {
        setInputData({
          ...inputdata,
          empsId: "",
          leavedate: "",
          leavedes: null,

        });
        
        setLeaveadd(response.data)
        navigate("/leave");
      } else {
        toast.error("Error!")
      }

    }

  }


  return (
    <>
      {
        showspin ? <Spiner /> : <div className="container">

          <h2 className='text-center mt-1'>Add a leave</h2>

          <Card className='shadow mt-3 p-3'>



            <div className="topic">
              <h5 className="text-left mb-3">Leave Information</h5>
            </div>
            <div className="form-section">


              <Form>
                <Row>

                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    <Form.Label>Employee ID</Form.Label>

                    <Form.Control as="select" name='empsId' value={inputdata.empsId} onChange={setInputValue}>
                      <option value="">Select Employee ID</option>
                      {employeeIds.map(id => (
                        <option key={id} value={id}>{formatEmployeeID(id)}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicEstimatedDate">
                    <Form.Label>Leave Date</Form.Label>
                    <DatePicker
                      selected={inputdata.leavedate}
                      onChange={(date) => handleDateChange(date, "leavedate")}
                      dateFormat="yyyy-MM-dd"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    <Form.Label>Reason for the leave</Form.Label>
                    <Form.Control type="text" name='leavedes' value={inputdata.leavedes} onChange={setInputValue} placeholder='Enter leave reason' />
                  </Form.Group>

                </Row>

              </Form>
            </div>


            <br></br>
            <Button variant="primary" type="submit" onClick={submitLeaveData}>
              Submit
            </Button>
          </Card>
          <ToastContainer position="top-center" />
        </div>
      }
    </>
  )

}

export default AddLeave

