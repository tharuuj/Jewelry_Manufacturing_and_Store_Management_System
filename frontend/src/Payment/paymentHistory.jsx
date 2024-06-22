import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { GetbyID } from "./actions/payment_actions";
import QRCode from "qrcode.react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const PaymentHistory = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.payment.loading);
  const payments = useSelector((state) => state.payment.payments);

  useEffect(() => {
    if (loading === true) {
      toast.loading("Loading...", {
        id: "loading",
      });
    } else if (loading === false) {
      toast.dismiss("loading");
    }
  }, [loading]);

  useEffect(() => {
    document.title = "My Payment History | Diamonds.lk ";
  }, []);

  const [UID, setUID] = useState("UID_45522");

  const form = {
    UID: UID,
  };
  useEffect(() => {
    dispatch(GetbyID(form));
  }, []);

  
  const generateQRCodeValue = (data) => {
    const date = new Date(data.Date);
    const formattedDate = date.toLocaleDateString("en-US");
    const qrCodeValue = `
      CVV: ${data.CVV}
      CardName: ${data.CardName}
      CardNumber: ${data.CardNumber}
      Contact_No: ${data.Contact_No}
      Date: ${data.formattedDate}
      Email: ${data.Email}
      Expire: ${data.Expire}
      FullName: ${data.FullName}
      OID: ${data.OID}
      PID: ${data.PID}
      PaymentType: ${data.PaymentType}
      Status: ${data.Status}
      Transaction_Refrence: ${data.Transaction_Refrence}
      UID: ${data.UID}
    `;
    return qrCodeValue;
  };

  function generatePDF(data) {
    const input = document.getElementById(`pdf-content-${data.PID}`);

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`payment_${data.PID}.pdf`);
    });
  }

  return (
    <>
      <h3 className="heading_top">Payments History</h3>

      <div className="payment-container">
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            {payments.map((data, index) => (
              <MDBCol
                size="10"
                key={index}
                style={{ marginTop: "30px" }}
                id={`pdf-content-${data.PID}`}
              >
                <MDBCard
                  className="card-stepper text-black"
                  style={{ borderRadius: "16px" }}
                >
                  <MDBCardBody className="p-5">
                    <div className="d-flex justify-content-between align-items-center mb-5">
                      <div>
                        <MDBTypography tag="h5" className="mb-0">
                          Payment ID{" "}
                          <span className="text-primary font-weight-bold">
                            {data.PID}
                          </span>
                        </MDBTypography>
                      </div>
                      <div className="text-end">
                        <p className="mb-0">
                          Invoice Date{" "}
                          <span>
                            {(() => {
                              const dateObj = new Date(data.Date);
                              dateObj.setDate(dateObj.getDate());
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
                        <p className="mb-0">{data.CardNumber}</p>
                      </div>
                    </div>
                    <div className="container">
                      <div className="row" style={{ marginTop: "30px" }}>
                        <div className="col-lg-6">
                          <p className="mb-0">
                            FullName :
                            <span className="font-weight-bold">
                              {data.FullName}
                            </span>
                          </p>
                        </div>
                        <div className="col-lg-6">
                          <p className="mb-0">
                            PaymentType :
                            <span className="font-weight-bold">
                              {data.PaymentType}
                            </span>
                          </p>
                        </div>
                        <div className="col-lg-6">
                          <p className="mb-0">
                            OID :
                            <span className="font-weight-bold">{data.OID}</span>
                          </p>
                        </div>
                        <div className="col-lg-6">
                          <p className="mb-0">
                            Contact Number :
                            <span className="font-weight-bold">
                              {data.Contact_No}
                            </span>
                          </p>
                        </div>
                        <div className="col-lg-6">
                          <p className="mb-0">
                            Email :
                            <span className="font-weight-bold">
                              {data.Email}
                            </span>
                          </p>
                        </div>
                        <div className="col-lg-6">
                          <p className="mb-0">
                            Status :
                            <span
                              className={`font-weight-bold ${
                                data.Status === "Verified"
                                  ? "text-success"
                                  : "text-danger"
                              }`}
                            >
                              {data.Status}
                            </span>
                          </p>
                        </div>
                        <div className="col-lg-6">
                          <p className="mb-0">
                            Transaction Refrence :
                            <span className="font-weight-bold">
                              {data.Transaction_Refrence}
                            </span>
                          </p>
                        </div>
                      </div>
                      <QRCode
                        value={generateQRCodeValue(data)}
                        style={{ marginTop: "30px" }}
                      />
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
      </div>
    </>
  );
};

export default PaymentHistory;
