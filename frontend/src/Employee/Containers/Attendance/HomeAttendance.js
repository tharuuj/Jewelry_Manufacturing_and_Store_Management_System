import React, { useContext, useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import TableAttendance from '../../Components/Tables/TableAttendance';
import Spiner from "../../Components/Spiner/Spiner"
import { useNavigate } from "react-router-dom"
import { addAttendanceData, dltattendancedata, updateAttendanceData } from '../../Components/context/AttendanceContextProvider';
import { attendancegetfunc, deleteattendancefunc } from '../../services/Apis';
import Alert from 'react-bootstrap/Alert';
import "./homeAttendance.css"
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import '@fortawesome/fontawesome-free/css/all.css';



const HomeAttendance = () => {

    const [attendancedata, setAttendanceData] = useState([]);
    const [showspin, setShowSpin] = useState(true);
    const [search, setSearch] = useState("");
    const [datecreated, setDatecreated] = useState(null);
    const [sort, setSort] = useState("new");
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);

    const { attendanceadd, setAttendanceadd } = useContext(addAttendanceData);

    const { attendanceupdate, setAttendanceUpdate } = useContext(updateAttendanceData)
    const { deleteattendancedata, setDltAttendancedata } = useContext(dltattendancedata);

    const navigate = useNavigate();

    const addattendanceb = () => {
        navigate("/addattendance")
    }

    const handleDateChange = (date) => {
        setDatecreated(date);
    };

    // get attendance
    const attendanceGet = async () => {
        try {
            const response = await attendancegetfunc(search, datecreated, sort, page);


            if (response.status === 200) {
                setAttendanceData(response.data.attendancesdata);
                setPageCount(response.data.Pagination.pageCount)
            } else {
                console.log("error in getting attendance data")
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    // delete attendance details
    const deleteAttendance = async (id) => {

        const response = await deleteattendancefunc(id);
        if (response.status === 200) {
            attendanceGet();
            setDltAttendancedata(response.data)
        } else {
            toast.error("error")
        }
    }



    // pagination
    // handle prev btn
    const handlePrevious = () => {
        setPage(() => {
            if (page === 1) return page;
            return page - 1
        })
    }

    // handle next btn
    const handleNext = () => {
        setPage(() => {
            if (page === pageCount) return page;
            return page + 1
        })
    }

    useEffect(() => {
        attendanceGet();
        setTimeout(() => {
            setShowSpin(false)
        }, 1200)
    }, [search, datecreated, sort, page])



    return (
        <>

            {
                attendanceadd ? <Alert variant="success" onClose={() => setAttendanceadd("")} dismissible>{attendanceadd.employeeID.toUpperCase()} Attendance Succesfully Added</Alert> : ""
            }

            {
                attendanceupdate ? <Alert variant="primary" onClose={() => setAttendanceUpdate("")} dismissible>{attendanceupdate.employeeID.toUpperCase()} Succesfully Updated</Alert> : ""
            }

            {
                deleteattendancedata ? <Alert variant="danger" onClose={() => setDltAttendancedata("")} dismissible>{deleteattendancedata.employeeID.toUpperCase()} Succesfully Deleted</Alert> : ""
            }


            <div className="container home-attendance-container">
                <div className="main_div">
                    {/* search add btn */}
                    <div className="search_add mt-4 d-flex justify-content-between">
                        <div className="search col-lg-4">
                            <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Button variant="success" className='search_btn'>Search</Button>
                            </Form>
                        </div>
                        <div className="add_btn">
                            <Button variant="primary" onClick={addattendanceb}> <i class="fa-solid fa-plus"></i>&nbsp; Add Attendance</Button>
                        </div>
                    </div>


                    {/* datecreated */}

                    <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">

                        <div className="filter_date">
                            <div className="filter">
                                <h4>Filter By Date</h4>
                                <div className="gender d-flex justify-content-between">
                                    <div className="datepicker-container">
                                        <DatePicker
                                            selected={datecreated}
                                            onChange={handleDateChange}
                                            dateFormat="MM/dd/yyyy"
                                            placeholderText="Select date"
                                            showYearDropdown
                                            scrollableYearDropdown
                                            isClearable
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* sort details */}

                        <div className="filter_newold">
                            <h4>Sort Details</h4>
                            <Dropdown className='text-center'>
                                <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                                    <i class="fa-solid fa-sort"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {/*  <Dropdown.Item onClick={()=>setSort("new")}>New</Dropdown.Item>   */}
                                    <Dropdown.Item onClick={() => setSort("new")}>New</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSort("old")}>Old</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>


                    </div>
                </div>
                {
                    showspin ? <Spiner /> : <TableAttendance
                        attendancedata={attendancedata}
                        deleteAttendance={deleteAttendance}
                        attendanceGet={attendanceGet}
                        handlePrevious={handlePrevious}
                        handleNext={handleNext}
                        page={page}
                        pageCount={pageCount}
                        setPage={setPage}
                    />
                }

            </div>
        </>
    )
}

export default HomeAttendance


