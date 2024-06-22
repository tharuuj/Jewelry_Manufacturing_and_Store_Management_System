import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { GetbyID } from "./actions/tracking_action";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const TrackOrder = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.delivery.loading);
  const deliveries = useSelector((state) => state.delivery.deliveries);

  useEffect(() => {
    if (loading === true) {
      toast.loading("Loading...", {
        id: "loading",
      });
    } else if (loading === false) {
      toast.dismiss("loading");
    }
  }, [loading]);

  //site title
  useEffect(() => {
    document.title = "Track MY Order | Diamonds.lk ";
  }, []);

  const [UID, setUID] = useState("UID_45522");

  const form = {
    UID: UID,
  };
  useEffect(() => {
    dispatch(GetbyID(form));
  }, []);

  function generatePDF(data) {
    const input = document.getElementById(`pdf-content-${data.OID}`); 

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`delivery_info_${data.OID}.pdf`);
    });
  }
  return (
    <>
      <h3 className="heading_top">Track My Orders</h3>

      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          {deliveries.map((data, index) => (
            <MDBCol size="10" key={index} style={{ marginTop: "30px" }}>
              <MDBCard
                className="card-stepper text-black"
                style={{ borderRadius: "16px" }}
              >
                <MDBCardBody className="p-5" id={`pdf-content-${data.OID}`}>
                  <div className="d-flex justify-content-between align-items-center mb-5">
                    <div>
                      <MDBTypography tag="h5" className="mb-0">
                        Order ID{" "}
                        <span className="text-primary font-weight-bold">
                          {data.OID}
                        </span>
                      </MDBTypography>
                    </div>
                    <div className="text-end">
                      <p className="mb-0">
                        Expected Arrival{" "}
                        <span>
                          {(() => {
                            const dateObj = new Date(data.Date);
                            dateObj.setDate(dateObj.getDate() + 4);
                            const formattedDate = `${dateObj
                              .getDate()
                              .toString()
                              .padStart(2, "0")}-${(dateObj.getMonth() + 1)
                              .toString()
                              .padStart(2, "0")}-${dateObj.getFullYear()}`;
                            return formattedDate;
                          })()}
                        </span>
                      </p>
                      <p className="mb-0">{data.Tracking_Number}</p>
                    </div>
                  </div>
                  <ul
                    id="progressbar-2"
                    className="d-flex justify-content-between mx-0 mt-0 mb-5 px-0 pt-0 pb-2"
                  >
                    {(() => {
                      switch (data.Status) {
                        case "Order Placed":
                          return (
                            <>
                              <li
                                className="step0 active text-center"
                                id="step1"
                              ></li>
                              <li
                                className="step0 text-muted text-center"
                                id="step2"
                              ></li>
                              <li
                                className="step0 text-muted text-end"
                                id="step3"
                              ></li>
                              <li
                                className="step0 text-muted text-end"
                                id="step4"
                              ></li>
                            </>
                          );
                        case "Shipped":
                          return (
                            <>
                              <li
                                className="step0 active text-center"
                                id="step1"
                              ></li>
                              <li
                                className="step0 active text-center"
                                id="step2"
                              ></li>
                              <li
                                className="step0 text-muted text-end"
                                id="step3"
                              ></li>
                              <li
                                className="step0 text-muted text-end"
                                id="step4"
                              ></li>
                            </>
                          );
                        case "In Route":
                          return (
                            <>
                              <li
                                className="step0 active text-center"
                                id="step1"
                              ></li>
                              <li
                                className="step0 active text-center"
                                id="step2"
                              ></li>
                              <li
                                className="step0 active text-center"
                                id="step3"
                              ></li>
                              <li
                                className="step0 text-muted text-end"
                                id="step4"
                              ></li>
                            </>
                          );
                        case "Delivered":
                          return (
                            <>
                              <li
                                className="step0 active text-center"
                                id="step1"
                              ></li>
                              <li
                                className="step0 active text-center"
                                id="step2"
                              ></li>
                              <li
                                className="step0 active text-center delivered"
                                id="step3"
                              ></li>
                              <li
                                className="step0 active text-center delivered"
                                id="step4"
                              ></li>
                            </>
                          );
                        default:
                          return null;
                      }
                    })()}
                  </ul>

                  <div className="d-flex justify-content-between">
                    <div className="d-lg-flex align-items-center">
                      <MDBIcon
                        fas
                        icon="clipboard-list me-lg-4 mb-3 mb-lg-0"
                        size="3x"
                      />
                      <div>
                        <p className="fw-bold mb-1">Order</p>
                        <p className="fw-bold mb-0">Processed</p>
                      </div>
                    </div>
                    <div className="d-lg-flex align-items-center">
                      <MDBIcon
                        fas
                        icon="box-open me-lg-4 mb-3 mb-lg-0"
                        size="3x"
                      />
                      <div>
                        <p className="fw-bold mb-1">Order</p>
                        <p className="fw-bold mb-0">Shipped</p>
                      </div>
                    </div>
                    <div className="d-lg-flex align-items-center">
                      <MDBIcon
                        fas
                        icon="shipping-fast me-lg-4 mb-3 mb-lg-0"
                        size="3x"
                      />
                      <div>
                        <p className="fw-bold mb-1">Order</p>
                        <p className="fw-bold mb-0">In Route</p>
                      </div>
                    </div>
                    <div className="d-lg-flex align-items-center">
                      <MDBIcon fas icon="home me-lg-4 mb-3 mb-lg-0" size="3x" />
                      <div>
                        <p className="fw-bold mb-1">Order</p>
                        <p className="fw-bold mb-0">Delivered</p>
                      </div>
                    </div>
                  </div>
                  <div className="container">
                    <div className="row" style={{ marginTop: "30px" }}>
                      <div className="col-lg-4">
                        <p className="mb-0">
                          FullName :
                          <span className="font-weight-bold">
                            {data.FullName}
                          </span>
                        </p>
                      </div>
                      <div className="col-lg-4">
                        <p className="mb-0">
                          Address :
                          <span className="font-weight-bold">
                            {data.Address}
                          </span>
                        </p>
                      </div>
                      <div className="col-lg-4">
                        <p className="mb-0">
                          Contact Number :
                          <span className="font-weight-bold">
                            {data.Contact_No}
                          </span>
                        </p>
                      </div>
                      <div className="col-lg-4">
                        <p className="mb-0">
                          Email :
                          <span className="font-weight-bold">{data.Email}</span>
                        </p>
                      </div>
                      <div className="col-lg-4">
                        <p className="mb-0">
                          City :
                          <span className="font-weight-bold">{data.City}</span>
                        </p>
                      </div>
                      <div className="col-lg-4">
                        <p className="mb-0">
                          State :
                          <span className="font-weight-bold">{data.State}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <MDBCol size="10" style={{ marginTop: "30px" }}>
                    <button
                      className="btn btn-primary"
                      onClick={() => generatePDF(data)}
                    >
                      Download Receipt
                    </button>
                  </MDBCol>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default TrackOrder;
