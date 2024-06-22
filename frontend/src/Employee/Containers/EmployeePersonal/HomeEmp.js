import React, { useContext, useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Tables from '../../Components/Tables/Tables';
import Spiner from "../../Components/Spiner/Spiner"
import Header from '../../Components/Headers/Headers';
import { useNavigate } from "react-router-dom"
import { addData, dltdata, updateData } from '../../Components/context/ContextProvider';

//import { useEmployeeCount } from '../../Components/context/EmployeeCountContext';
import { employeegetfunc, deletefunc, exporttocsvfunc } from '../../services/Apis';
import Alert from 'react-bootstrap/Alert';
import "./homeEmp.css"
import { toast } from 'react-toastify';
import '@fortawesome/fontawesome-free/css/all.css';



const HomeEmp = () => {

  const [employeedata, setEmployeeData] = useState([]);
  const [showspin, setShowSpin] = useState(true);
  const [search, setSearch] = useState("");
  const [empgender, setGender] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("new");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  //const { setEmployeeCount } = useEmployeeCount();

  const { employeeadd, setEmployeeadd } = useContext(addData);

  const { update, setUpdate } = useContext(updateData)
  const { deletedata, setDLtdata } = useContext(dltdata);

  const navigate = useNavigate();

  const adduser = () => {
    navigate("/registeremp")
  }


  // get employee 
  const employeeGet = async () => {
    const response = await employeegetfunc(search, empgender, status, sort, page);

    if (response.status === 200) {
      setEmployeeData(response.data.employeesdata);
      setPageCount(response.data.Pagination.pageCount);
    //  setEmployeeCount(response.data.employeesdata.length);
    } else {
      console.log("error in getting employee data")
    }
  }

  // delete employee personal details delete
  const deleteEmployee = async (id) => {

    const response = await deletefunc(id);
    if (response.status === 200) {
      employeeGet();
      setDLtdata(response.data)
    } else {
      toast.error("error")
    }
  }

  // export to csv employee
  const exportemployee = async () => {
    const response = await exporttocsvfunc();


    if (response.status === 200) {
      window.open(response.data.downloadUrl, "blank")
    } else {
      toast.error("error !")
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
    employeeGet();
    setTimeout(() => {
      setShowSpin(false)
    }, 1200)
  }, [search, empgender, status, sort, page])

  return (
    <>

      {
        employeeadd ? <Alert variant="success" onClose={() => setEmployeeadd("")} dismissible>{employeeadd.empfname.toUpperCase()} Succesfully Added</Alert> : ""
      }

      {
        update ? <Alert variant="primary" onClose={() => setUpdate("")} dismissible>{update.empfname.toUpperCase()} Succesfully Updated</Alert> : ""
      }

      {
        deletedata ? <Alert variant="danger" onClose={() => setDLtdata("")} dismissible>{deletedata.empfname.toUpperCase()} Succesfully Deleted</Alert> : ""
      }

      <div className="container">
      <Header/>
        <div className="main_div">
          {/* search add btn */}
          <div className="search_add mt-4 d-flex justify-content-between">
            <div className="search col-lg-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search by name"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="success" className='search_btn'>Search</Button>
              </Form>
            </div>
            <div className="add_btn">
              <Button variant="primary" onClick={adduser}> <i class="fa-solid fa-plus"></i>&nbsp; Add Employee</Button>
            </div>
          </div>


          {/* export,gender,status */}

          <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
            <div className="export_csv">
              <Button className='export_btn' onClick={exportemployee}>Export To Csv</Button>
            </div>
            <div className="filter_gender">
              <div className="filter">
                <h5>Filter By Gender</h5>
                <div className="gender d-flex justify-content-between">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="empgender"
                    value={"All"}
                    onChange={(e) => setGender(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Male`}
                    name="empgender"
                    value={"Male"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Female`}
                    name="empgender"
                    value={"Female"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* sort by value */}

            <div className="filter_newold">
              <h5>Sort By Value</h5>
              <Dropdown className='text-center'>
                <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                  <i class="fa-solid fa-sort"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSort("new")}>New</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSort("old")}>Old</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>


            {/* filter by status*/}
            <div className="filter_status">
              <div className="status">
                <h5>Filter By Status</h5>
                <div className="status_radio d-flex justify-content-between flex-wrap">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="status"
                    value={"All"}
                    onChange={(e) => setStatus(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Active`}
                    name="status"
                    value={"Active"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`InActive`}
                    name="status"
                    value={"InActive"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
        {
          showspin ? <Spiner /> : <Tables
            employeedata={employeedata}
            deleteEmployee={deleteEmployee}
            employeeGet={employeeGet}
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

export default HomeEmp


