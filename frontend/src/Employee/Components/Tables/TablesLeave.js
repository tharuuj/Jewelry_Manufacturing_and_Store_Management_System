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
import "./tableWorkHistory.css"
import Confirmation from '../Confirmation/Confirmation';
import moment from "moment"

const TablesLeave = ({ leavedata,deleteLeave, leaveGet, handlePrevious, handleNext, page, pageCount, setPage }) => {

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [leaveToDelete, setLeaveToDelete] = useState(null);

  const openConfirmation = (leaveId) => {
    setLeaveToDelete(leaveId);
    setShowConfirmation(true);
  };

  const closeConfirmation = () => {
    setLeaveToDelete(null);
    setShowConfirmation(false);
  };

  const confirmDeleteLeave = () => {
    deleteLeave(leaveToDelete);
    closeConfirmation();
  };


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

                    <th>Leave ID</th>
                    <th>Employee ID</th>
                    <th>Leave Date</th>
                    <th>Leave Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    leavedata.length > 0 ? leavedata.map((element, index) => {
                      return (
                        <>
                          <tr>
                            <td>{index + 1 + (page - 1) * 5}</td>
                            <td>{formatEmployeeID(element.empsId)}</td>
                            <td>{moment(element.leavedate).format("DD-MM-YYYY")}</td>
                            <td>{element.leavedes}</td>
                            <td>
                              <Dropdown>
                                <Dropdown.Toggle variant='light' className='action' id="dropdown-basic">
                                  <i class="fa-solid fa-ellipsis-vertical"></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>

                                  <Dropdown.Item >
                                    <NavLink to={`/updateleave/${element._id}`} className="text-decoration-none">
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
          handleConfirm={confirmDeleteLeave}
          title="Confirmation"
          message="Are you sure you want to delete this leave?"
          confirmButtonLabel="Delete"
        />

      </div>
    </>
  )
}

export default TablesLeave