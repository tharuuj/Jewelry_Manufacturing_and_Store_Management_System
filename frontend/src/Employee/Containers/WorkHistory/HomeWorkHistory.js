import React, { useContext, useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import TablesWorkHistory from '../../Components/Tables/TablesWorkHistory';
import Spiner from "../../Components/Spiner/Spiner"
import { useNavigate } from "react-router-dom"
import { addWorkData, updateWorkHistoryData, dltworkhistorydata } from '../../Components/context/WorkContextProvider';
import { workhistorygetfunc, deleteworkhistoryfunc } from '../../services/Apis';
import Alert from 'react-bootstrap/Alert';
import "./homeWorkHistory.css"
import { toast } from 'react-toastify';
import '@fortawesome/fontawesome-free/css/all.css';



const HomeWorkHistory = () => {

  const [workhistorydata, setWorkHistoryData] = useState([]);
  const [showspin, setShowSpin] = useState(true);
  const [search, setSearch] = useState("");
  const [workstatus, setWorkStatus] = useState("All");
  const [sort,setSort] = useState("new");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const { workhistoryadd, setWorkHistoryadd } = useContext(addWorkData);

    const { updateworkhistory, setWorkHistoryUpdate } = useContext(updateWorkHistoryData)
    const {deleteworkhistorydata, setDltWorkHistorydata} = useContext(dltworkhistorydata);

  const navigate = useNavigate();

  const addwork = () => {
    navigate("/addwork")
  }


  // get work history 
  const workhistoryGet = async () => {
    const response = await workhistorygetfunc(search, workstatus, sort, page);

    if (response.status === 200) {
      setWorkHistoryData(response.data.workhistoriesdata);
      setPageCount(response.data.Pagination.pageCount)
    } else {
      console.log("error in getting work history data")
    }
  }



  
  // delete employee personal details delete
  const deleteWorkHistory = async(id)=>{
    
    const response = await deleteworkhistoryfunc(id);
    if(response.status === 200){
      workhistoryGet();
      setDltWorkHistorydata(response.data)
    }else{
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
    workhistoryGet();
    setTimeout(() => {
      setShowSpin(false)
    }, 1200)
  }, [search, workstatus, sort, page])


  return (
    <>

      {
        workhistoryadd ? <Alert variant="success" onClose={() => setWorkHistoryadd("")} dismissible>{workhistoryadd.itemdes.toUpperCase()} Work Details Succesfully Added</Alert> : ""
      }
       
      {
        updateworkhistory ? <Alert variant="primary" onClose={() => setWorkHistoryUpdate("")} dismissible>{updateworkhistory.itemdes.toUpperCase()} Succesfully Updated</Alert> : ""
      }
     
    {
      deleteworkhistorydata ? <Alert variant="danger" onClose={() => setDltWorkHistorydata("")} dismissible>{deleteworkhistorydata.itemdes.toUpperCase()} Succesfully Deleted</Alert>:""
    }
 


      <div className="container">
        <div className="main_div">
          {/* search add btn */}
          <div className="search_add mt-4 d-flex justify-content-between">

            <div className="search col-lg-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search by description"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="success" className='search_btn'>Search</Button>
              </Form>
            </div>


            <div className="add_btn">
              <Button variant="primary" onClick={addwork}> <i class="fa-solid fa-plus"></i>&nbsp; Add Work Details</Button>

            </div>
          </div>


          {/* sort,status */}

          <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
            
            {/* sort by value */}           
            <div className="filter_newold">
              <h5>Sort By Value</h5>
              <Dropdown className='text-center'>
                <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                  <i class="fa-solid fa-sort"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  
                  <Dropdown.Item onClick={()=>setSort("new")}>New</Dropdown.Item>
                  <Dropdown.Item onClick={()=>setSort("old")}>Old</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
              

            {/* filter by status*/}

            <div className="filter_status">
              <div className="status">
                <h5>Filter By Work Status</h5>
                <div className="status_radio d-flex justify-content-between flex-wrap">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="workstatus"
                    value={"All"}
                    onChange={(e) => setWorkStatus(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Pending`}
                    name="workstatus"
                    value={"Pending"}
                    onChange={(e) => setWorkStatus(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Completed`}
                    name="workstatus"
                    value={"Completed"}
                    onChange={(e) => setWorkStatus(e.target.value)}
                  />
                </div>
              </div>
            </div>

          </div>


        </div>
        {
          showspin ? <Spiner /> : <TablesWorkHistory
            workhistorydata={workhistorydata}
            deleteWorkHistory={deleteWorkHistory}
            workhistoryGet={workhistoryGet}
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

export default HomeWorkHistory


