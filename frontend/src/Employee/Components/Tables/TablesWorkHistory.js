import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import Paginations from '../pagination/Pagination';
import { BASE_URL } from '../../services/helper';
import { NavLink } from 'react-router-dom';
import { workstatuschangefunc } from "../../services/Apis"
import { ToastContainer, toast } from "react-toastify"
import "./tableWorkHistory.css"
import Confirmation from '../Confirmation/Confirmation';
import moment from "moment"

const TablesWorkHistory = ({ workhistorydata, deleteWorkHistory, workhistoryGet, handlePrevious, handleNext, page, pageCount, setPage }) => {


  const [showConfirmation, setShowConfirmation] = useState(false);
  const [workhistoryToDelete, setWorkHistoryToDelete] = useState(null);

  const openConfirmation = (workhistoryId) => {
    setWorkHistoryToDelete(workhistoryId);
    setShowConfirmation(true);
  };

  const closeConfirmation = () => {
    setWorkHistoryToDelete(null);
    setShowConfirmation(false);
  };

  const confirmDeleteWorkHistory = () => {
    deleteWorkHistory(workhistoryToDelete);
    closeConfirmation();
  };



  const handleChange = async (id, workstatus) => {

    const response = await workstatuschangefunc(id, workstatus);

    if (response.status === 200) {
      workhistoryGet();
      toast.success("Employment Status Updated")
    } else {
      toast.error("error ")
    }
  }


  const formatEmployeeID = (_id, prefix = "E") => {
    // Check if _id is defined
    if (_id) {
      // Get the last 4 digits of the original ID
      const lastFourDigits = _id.slice(-4);

      // Format ID with prefix and last four digits of the original ID
      return prefix + lastFourDigits;
    } else {
      // Return a default value if _id is undefined
      return "Unknown";
    }
  };


  return (
    <>
      <div className="container">
        <Row>
          <div className="col mt-0">
            <Card className='shadow'>
              <Table className='align-items-center' responsive="sm">
                <thead className='thead-dark'>
                  <tr className='table-dark'>

                    <th>Work ID</th>
                    <th>Employee ID</th>
                    <th>Work Description</th>
                    <th>Work Start Date</th>
                    <th>Work Estimated Date</th>
                    <th>Price for Work (LKR)</th>
                    <th>Work End Date</th>
                    <th>&nbsp;&nbsp;&nbsp;Work Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    workhistorydata.length > 0 ? workhistorydata.map((element, index) => {
                      return (
                        <>
                          <tr>
                            <td>{index + 1 + (page - 1) * 5}</td>
                            <td>{formatEmployeeID(element.employeesId)}</td>
                            <td>{element.itemdes}</td>
                            <td>{moment(element.workstartdate).format("DD-MM-YYYY HH:MM")}</td>
                            <td>{moment(element.workestimateddate).format("DD-MM-YYYY")}</td>
                            <td>{element.workprice}</td>
                            <td>{moment(element.workenddate).format("DD-MM-YYYY")}</td>
                            <td className='d-flex align-items-center'>
                              <Dropdown className='text-center'>
                                <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                                  <Badge bg={element.workstatus == "Completed" ? "primary" : "danger"}>
                                    {element.workstatus} <i class="fa-solid fa-angle-down"></i>
                                  </Badge>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item onClick={() => handleChange(element._id, "Pending")}>Pending</Dropdown.Item>
                                  <Dropdown.Item onClick={() => handleChange(element._id, "Completed")}>Completed</Dropdown.Item>
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

                                    <NavLink to={`/viewworkhistory/${element._id}`} className="text-decoration-none">
                                      <i class="fa-solid fa-eye" style={{ color: "green" }}></i> <span>View</span>
                                    </NavLink>
                                  </Dropdown.Item>

                                  <Dropdown.Item >
                                    <NavLink to={`/updateworkhistory/${element._id}`} className="text-decoration-none">
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
        <ToastContainer />


        <Confirmation
          show={showConfirmation}
          handleClose={closeConfirmation}
          handleConfirm={confirmDeleteWorkHistory}
          title="Confirmation"
          message="Are you sure you want to delete this work history?"
          confirmButtonLabel="Delete"
        />

      </div>
    </>
  )
}

export default TablesWorkHistory