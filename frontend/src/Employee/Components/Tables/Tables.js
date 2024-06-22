import React, {useState} from 'react'
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import Paginations from '../pagination/Pagination';
import { BASE_URL } from '../../services/helper';
import { NavLink } from 'react-router-dom';
import { statuschangefunc } from "../../services/Apis"
import { ToastContainer, toast } from "react-toastify"
import Confirmation from '../Confirmation/Confirmation';
import "./table.css"

const Tables = ({ employeedata, deleteEmployee, employeeGet, handlePrevious, handleNext, page, pageCount, setPage }) => {
 
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const openConfirmation = (employeeId) => {
    setEmployeeToDelete(employeeId);
    setShowConfirmation(true);
  };

  const closeConfirmation = () => {
    setEmployeeToDelete(null);
    setShowConfirmation(false);
  };

  const confirmDeleteEmployee = () => {
    deleteEmployee(employeeToDelete);
    closeConfirmation();
  };



  const handleChange = async (id, status) => {
    
   const response = await statuschangefunc(id, status);
   
    if (response.status === 200) {
      employeeGet();
      toast.success("Employment Status Updated")
    } else {
      toast.error("error ")
    } 
  }

  return (
    <>
      <div className="container">
        <Row>
          <div className="col mt-0">
            <Card className='shadow'>
              <Table className='align-items-center' responsive="sm">
                <thead className='thead-dark'>
                  <tr className='table-dark'>

                    <th>Employee ID</th>
                    <th>Profile</th>
                    <th>FullName</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Gender</th>
                    <th>Employeee Type</th>
                    <th>&nbsp;&nbsp;&nbsp;Status</th>

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    employeedata.length > 0 ? employeedata.map((element, index) => {
                      return (
                        <>
                          <tr>
                            <td>{index + 1 + (page - 1)*5}</td>
                            <td className='img_parent'>
                              <img src={`${BASE_URL}/uploads/${element.profile}`} alt="img" />
                            </td>
                            <td>{element.empfname + element.emplname}</td>
                            <td>{element.empemail}</td>
                            <td>{element.empmobile}</td>
                            <td>{element.empgender == "Male" ? "M" : "F"}</td>
                            <td>{element.empType}</td>
                            <td className='d-flex align-items-center'>
                              <Dropdown className='text-center'>
                                <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                                  <Badge bg={element.status == "Active" ? "primary" : "danger"}>
                                    {element.status} <i class="fa-solid fa-angle-down"></i>
                                  </Badge>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item onClick={()=>handleChange(element._id,"Active")}>Active</Dropdown.Item>
                                  <Dropdown.Item onClick={()=>handleChange(element._id,"Inactive")}>InActive</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>

                            <td>
                              <Dropdown>
                                <Dropdown.Toggle variant='light' className='action' id="dropdown-basic">
                                  <i class="fa-solid fa-ellipsis-vertical"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item >
                                    <NavLink to={`/empprofile/${element._id}`} className="text-decoration-none">
                                      <i class="fa-solid fa-eye" style={{ color: "green" }}></i> <span>View</span>
                                    </NavLink>
                                  </Dropdown.Item>
                                  <Dropdown.Item >
                                    <NavLink to={`/editemp/${element._id}`} className="text-decoration-none">
                                      <i class="fa-solid fa-pen-to-square" style={{ color: "blue" }}></i> <span>Edit</span>
                                    </NavLink>
                                  </Dropdown.Item>
                                  <Dropdown.Item >
                                  <div onClick={() => openConfirmation(element._id)}>
                                  <i class="fa-solid fa-trash" style={{ color: "red" }}></i> <span>Delete</span>
                                    </div>
                                    

                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        </>
                      )
                    }) : <div className='no_data text-center'>No Data Found</div>
                  }

                </tbody>
                
              </Table>
              
              <Paginations
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                page={page}
                pageCount={pageCount}
                setPage={setPage}
              />
              
            </Card>
          </div>
        </Row>
<ToastContainer/>

{/* Confirmation Modal */}
<Confirmation
          show={showConfirmation}
          handleClose={closeConfirmation}
          handleConfirm={confirmDeleteEmployee}
          title="Confirmation"
          message="Are you sure you want to delete this employee?"
          confirmButtonLabel="Delete"
        />
      </div>
    </>
  )
}

export default Tables