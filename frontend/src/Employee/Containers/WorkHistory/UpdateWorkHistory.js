import React, { useContext, useEffect, useState } from 'react'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import Spiner from "../../Components/Spiner/Spiner"
import { ToastContainer, toast } from "react-toastify"
//import { BASE_URL } from '../../services/helper';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { editworkhistoryfunc, singleWorkHistorygetfunc, fetchEmployeeIds } from '../../services/Apis';
import { useNavigate, useParams } from 'react-router-dom';
//import "./EditEmp.css"
import { BASE_URL } from '../../services/helper';
import { updateWorkHistoryData } from '../../Components/context/WorkContextProvider';

const UpdateWorkHistory = () => {

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
  
  
const {updateworkhistory, setWorkHistoryUpdate} = useContext(updateWorkHistoryData)

const navigate = useNavigate();

  const { id } = useParams();

  //work status options
  const options = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Completed', label: 'Completed' },
  ];

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

  // work status set
  const setWorkStatusValue = (e) => {
    setWorkStatus(e.value)
  }

  
// Handle date change for start date
const handleDateChange = (date, fieldName) => {
    setInputData({ ...inputdata, [fieldName]: date });
  }
  
  

  const workhistoryProfileGet = async () => {
    const response = await singleWorkHistorygetfunc(id);

    if (response.status === 200) {     
      setInputData(response.data)
      setWorkStatus(response.data.workstatus)
      
    } else {
      console.log("error");
    }
  }



  //submit workdata
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

      const response = await editworkhistoryfunc(id, data,config);
      
      setShowSpin(false);
          
          if(response.status === 200){
            
        
     setWorkHistoryUpdate(response.data)
            navigate("/workhistory");
          }
     

    }

  }

  useEffect(() => {
    workhistoryProfileGet();
  }, [id])

  

  return (
    <>
      {
        showspin ? <Spiner /> : <div className="container">


          <h2 className='text-center mt-1'>Update Work History Details</h2>

          <Card className='shadow mt-3 p-3'>
            
            <br></br>
            <div className="topic">
              <h5 className="text-left mb-3">Personal Information</h5>
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
              Update WorkHistory
            </Button>
          </Card>
          <ToastContainer position="top-center" />
        </div>
      }
    </>
  )

}


export default UpdateWorkHistory
