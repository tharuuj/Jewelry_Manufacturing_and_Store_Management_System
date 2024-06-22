import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import Paginations from '../pagination/Pagination';
import { BASE_URL } from '../../services/helper';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify"
import Confirmation from '../Confirmation/Confirmation';
import "./tableattendance.css"
import moment from "moment"

const TableAttendance = ({ attendancedata, deleteAttendance, handlePrevious, handleNext, page, pageCount, setPage }) => {

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [attendanceToDelete, setAttendanceToDelete] = useState(null);

  const openConfirmation = (attendanceId) => {
    setAttendanceToDelete(attendanceId);
    setShowConfirmation(true);
  };

  const closeConfirmation = () => {
    setAttendanceToDelete(null);
    setShowConfirmation(false);
  };

  const confirmDeleteAttendance = () => {
    deleteAttendance(attendanceToDelete);
    closeConfirmation();
  };



  // Function to format employee IDs
  const formatEmployeeID = (_id, prefix = "E") => {
    // Get the last 4 digits of the original ID
    const lastFourDigits = _id.slice(-4);

    // Format ID with prefix and last four digits of the original ID
    return prefix + lastFourDigits;
  };


  // Function to calculate overtime
  const calculateOvertime = (workingTime) => {
    // Assuming workingTime is in HH:MM format, split hours and minutes
    const [hours, minutes] = workingTime.split(':').map(Number);

    // Convert working time to minutes
    const totalMinutes = hours * 60 + minutes;

    // Calculate overtime in minutes (if it exceeds 10 hours)
    const overtimeMinutes = Math.max(totalMinutes - 10 * 60, 0);

    // Convert overtime back to HH:MM format
    const overtimeHours = Math.floor(overtimeMinutes / 60);
    const overtimeRemainingMinutes = overtimeMinutes % 60;

    return `${overtimeHours}:${overtimeRemainingMinutes < 10 ? '0' : ''}${overtimeRemainingMinutes}`;
  };


  return (
    <div className='AttTable'>
      <div className="container">
        <Row>
          <div className="col mt-0">
            <Card className='shadow'>
              <Table className='align-items-center' responsive="sm">
                <thead className='thead-dark'>
                  <tr className='table-darke'>

                    <th>Attendance ID</th>
                    <th>Employee ID</th>
                    <th>In Time</th>
                    <th>Out Time</th>
                    <th>Working Time (HH:MM)</th>
                    <th>Overtime (HH:MM)</th> {/* New column for overtime */}
                    <th>Attendance Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {attendancedata.length > 0 ? attendancedata.map((element, index) => {
                    const overtime = calculateOvertime(element.workingtime);
                    return (
                      <>
                        <tr>
                          <td>{index + 1 + (page - 1) * 5}</td>
                          <td>{formatEmployeeID(element.employeeID)}</td>
                          <td>{element.intime}</td>
                          <td>{element.outtime}</td>
                          <td>{element.workingtime}</td>
                          <td>{overtime}</td> {/* Display calculated overtime */}
                          <td>{moment(element.attdate).format("DD-MM-YYYY HH:MM")}</td>
                          <td>
                            <Dropdown>
                              <Dropdown.Toggle variant='light' className='action' id="dropdown-basic">
                                <i class="fa-solid fa-ellipsis-vertical"></i>
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item >
                                  <NavLink to={`/viewattendance/${element._id}`} className="text-decoration-none">
                                    <i class="fa-solid fa-eye" style={{ color: "green" }}></i> <span>View</span>
                                  </NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item >
                                  <NavLink to={`/updateatt/${element._id}`} className="text-decoration-none">
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

        {/* Confirmation Modal */}
        <Confirmation
          show={showConfirmation}
          handleClose={closeConfirmation}
          handleConfirm={confirmDeleteAttendance}
          title="Confirmation"
          message="Are you sure you want to delete this attendance?"
          confirmButtonLabel="Delete"
        />


      </div>
    </div>
  )
}

export default TableAttendance

