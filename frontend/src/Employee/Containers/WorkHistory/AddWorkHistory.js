import React, { useContext, useEffect, useState } from 'react'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import Spiner from "../../Components/Spiner/Spiner"
import { empworkhistoryfunc, fetchEmployeeIds } from "../../services/Apis"
import { ToastContainer, toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import "./addWorkHistory.css"
import { addWorkData } from '../../Components/context/WorkContextProvider';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddWorkHistory = () => {

  const [inputdata, setInputData] = useState({
    employeesId: "",
    itemdes: "",
    workstartdate: new Date(),
    workestimateddate: null,
    workprice: "",
    workenddate: null
  });

  const [employeeIds, setEmployeeIds] = useState([]);

  const [workstatus, setWorkStatus] = useState("Pending");

  const [showspin, setShowSpin] = useState(false);
  // const [preview, setPreview] = useState("");

  const navigate = useNavigate();

  const { workhistoryadd, setWorkHistoryadd } = useContext(addWorkData);

  useEffect(() => {
    // Fetch employee IDs when the component mounts
    fetchEmployeeIds()
      .then(ids => {
        setEmployeeIds(ids);
      })
      .catch(error => console.error('Error fetching employee IDs:', error));
  }, []);

  //work status options
  const options = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Completed', label: 'Completed' },
  ];

  // setInput Value
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value })
  }

  // work status set
  const setWorkStatusValue = (e) => {
    setWorkStatus(e.value)
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
  const submitWorkHistoryData = async (e) => {
    e.preventDefault();

    const { employeesId, itemdes, workstartdate, workestimateddate, workprice, workenddate } = inputdata;
    if (employeesId === "") {
      toast.error("Employee Id is Required !")
    } else if (itemdes === "") {
      toast.error("Item Description is Required !")
    } else if (workstartdate === "") {
      toast.error("Work Start Date is Required !")
    } else if (workestimateddate === "") {
      toast.error("Work Estimated Date is Required !")
    } else if (workprice === "") {
      toast.error("Work Price is Required !")
      /*
      } else if (workstatus === "") {
        toast.error("Work Status is Required !")    */
    } else {

      const data = new FormData();
      data.append("employeesId", employeesId)
      data.append("itemdes", itemdes)
      data.append("workstartdate", workstartdate)
      data.append("workestimateddate", workestimateddate)
      data.append("workprice", workprice)
      data.append("workenddate", workenddate)
      data.append("workstatus", workstatus)


      const config = {
        "Content-Type": "multipart/form-data"
      }

      setShowSpin(true);

      const response = await empworkhistoryfunc(data, config);

      setShowSpin(false);

      if (response.status === 200) {
        setInputData({
          ...inputdata,
          employeesId: "",
          itemdes: "",
          workstartdate: new Date(),
          workestimateddate: null,
          workprice: "",
          workenddate: null

        });
        setWorkStatus("");
        setWorkHistoryadd(response.data)
        navigate("/workhistory");
      } else {
        toast.error("Error!")
      }

    }

  }


  return (
    <>
      {
        showspin ? <Spiner /> : <div className="container">

          <h2 className='text-center mt-1'>Work History Registration</h2>

          <Card className='shadow mt-3 p-3'>



            <div className="topic">
              <h5 className="text-left mb-3">Work History Information</h5>
            </div>
            <div className="form-section">


              <Form>
                <Row>

                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    <Form.Label>Employee ID</Form.Label>

                    <Form.Control as="select" name='employeesId' value={inputdata.employeesId} onChange={setInputValue}>
                      <option value="">Select Employee ID</option>
                      {employeeIds.map(id => (
                        <option key={id} value={id}>{formatEmployeeID(id)}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" name='itemdes' value={inputdata.itemdes} onChange={setInputValue} placeholder='Enter item description' />
                  </Form.Group>

                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicStartDate">
                    <Form.Label>Work Start Date</Form.Label>
                    <DatePicker
                      selected={inputdata.workstartdate}
                      onChange={(date) => handleDateChange(date, "workstartdate")}
                      dateFormat="yyyy-MM-dd"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicEstimatedDate">
                    <Form.Label>Work Estimated Date</Form.Label>
                    <DatePicker
                      selected={inputdata.workestimateddate}
                      onChange={(date) => handleDateChange(date, "workestimateddate")}
                      dateFormat="yyyy-MM-dd"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    <Form.Label>Work Price</Form.Label>
                    <Form.Control type="text" name='workprice' value={inputdata.workprice} onChange={setInputValue} placeholder='Enter work price' />
                  </Form.Group>
                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicEndDate">
                    <Form.Label>Work End Date</Form.Label>
                    <DatePicker
                      selected={inputdata.workenddate}
                      onChange={(date) => handleDateChange(date, "workenddate")}
                      dateFormat="yyyy-MM-dd"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                    <Form.Label>Select Work Status</Form.Label>
                    <Select options={options} onChange={setWorkStatusValue} />
                  </Form.Group>

                </Row>

              </Form>
            </div>


            <br></br>
            <Button variant="primary" type="submit" onClick={submitWorkHistoryData}>
              Submit
            </Button>
          </Card>
          <ToastContainer position="top-center" />
        </div>
      }
    </>
  )

}

export default AddWorkHistory

