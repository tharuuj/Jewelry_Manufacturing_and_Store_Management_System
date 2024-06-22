import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Spiner from "../../Components/Spiner/Spiner"
//import "./profileEmp.css";
import { useParams } from 'react-router-dom';
import { singleWorkHistorygetfunc } from '../../services/Apis';
import { BASE_URL } from '../../services/helper';
import moment from "moment"

const ViewWorkHistory = () => {

  const [workhistoryprofile, setWorkHistoryProfile] = useState({});
  const [showspin, setShowSpin] = useState(true);

  

  const { id } = useParams();

  const workhistoryProfileGet = async () => {
    const response = await singleWorkHistorygetfunc(id);

    if (response.status === 200) {
      setWorkHistoryProfile(response.data);

    } else {
      console.log("error");
    }
  };
  


  useEffect(() => {
    workhistoryProfileGet();
    setTimeout(() => {
      setShowSpin(false)
    }, 1200)
  }, [id]);

  return (
    <>
      {
        showspin ? <Spiner /> : <div className="container">

          <Card className="card-profile shadow col-lg-6 mx-auto mt-5">
            <Card.Body>
              <Row>
                <div className="col">
                  <div className="employee-profile">
                    <h2>Work History Details</h2>
                  </div>
                  
                </div>


                <div className="employee-details">
                  <p>Work History ID: {workhistoryprofile._id}</p>
                  <p>Date Created: {moment(workhistoryprofile.datecreated).format("DD-MM-YYYY")}</p>
                  <p>Date Updated: {workhistoryprofile.dateUpdated}</p>
                </div>


              </Row>
              <div className="personal-info">
                <h4>Work Assigning Information</h4>
                <table>
                  <tbody>
                    
                    <tr>
                      <td>Assigned Employee ID</td>
                      <td>{workhistoryprofile.employeesId}</td>
                    </tr>
                    <tr>
                      <td>Item Description</td>
                      <td>{workhistoryprofile.itemdes}</td>
                    </tr>
                    <tr>
                      <td>Work Started Date</td>
                      <td>{moment(workhistoryprofile.workstartdate).format("DD-MM-YYYY HH:MM")}</td>
                    </tr>
                    <tr>
                      <td>Work Estimated Date</td>
                      <td>{moment(workhistoryprofile.workestimateddate).format("DD-MM-YYYY")}</td>
                    </tr>
                    <tr>
                      <td>Estimated Price for the work</td>
                      <td>{workhistoryprofile.workprice}</td>
                    </tr>
                    <tr>
                      <td>Work End Date</td>
                      <td>{moment(workhistoryprofile.workenddate).format("DD-MM-YYYY")}</td>
                    </tr>
                    <tr>
                      <td>Work Status</td>
                      <td>{workhistoryprofile.workstatus}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
            </Card.Body>
          </Card>
        </div>
      }

    </>
  );
};

export default ViewWorkHistory;



