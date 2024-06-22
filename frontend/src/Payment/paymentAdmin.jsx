import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { TextField, MenuItem, InputBase, IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import DownloadIcon from "@mui/icons-material/Download";


import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { GetAll, ChangeStatus } from "./actions/payment_actions";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const PaymentAdmin = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.payment.loading);
  const payments = useSelector((state) => state.payment.payments);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); // State for status filter

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
    document.title = "Payment Verify Management | Diamonds.lk ";
  }, []);

  useEffect(() => {
    dispatch(GetAll());
  }, []);

  const filteredPayments = payments
    .filter(
      (payment) =>
        payment.FullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.PID.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.OID.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.Contact_No.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.Email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.Date.includes(searchQuery) ||
        payment.PaymentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.Status.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((payment) => {
      // Apply status filter
      if (statusFilter === "") {
        return true; // Return true for all payments if no filter is applied
      } else {
        return payment.Status.toLowerCase() === statusFilter.toLowerCase();
      }
    });

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const generatePDF = () => {
    const input = document.getElementById("table-content");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("payment_table.pdf");
    });
  };

  const [shmodal, setShmodal] = useState(false);
  const [status, setStatus] = useState("");
  const [pid, setPID] = useState("");

  const showModal = (data) => {
    setShmodal(true);
    setStatus(data.Status);
    setPID(data.PID);
  };

  const closeModal = () => {
    setShmodal(false);
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    const form = {
      PID: pid,
      Status: status,
    };

    dispatch(ChangeStatus(form));

    setShmodal(false);
  };

  const UpdateModal = () => {
    return (
      <MDBModal open={shmodal} setOpen={setShmodal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Upgrade Delivery Status</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={closeModal}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="list-wrapper">
                <form>
                  <div className="form-group">
                    <TextField
                      type="text"
                      label="PID"
                      variant="outlined"
                      fullWidth
                      value={pid}
                    />
                  </div>
                  <div className="form-group">
                    <TextField
                      select
                      label="Select Status"
                      variant="outlined"
                      fullWidth
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <MenuItem value="Unverified">Unverified</MenuItem>
                      <MenuItem value="Verified">Verified</MenuItem>
                    </TextField>
                  </div>
                </form>
              </div>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={closeModal}>
                Close
              </MDBBtn>
              <MDBBtn onClick={handleSubmitUpdate}>Change status</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    );
  };

  const [shseemodal, setseeShmodal] = useState(false);
  const [OID, setOID] = useState("");
  const [UID, setUID] = useState("");
  const [FullName, setFullName] = useState("");
  const [Contact_No, setContact_No] = useState("");
  const [Email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [PaymentType, setPaymentType] = useState("");
  const [refrence, setReference] = useState("");

  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    if (date) {
      const dateObj = new Date(date);
      const formattedDateStr = `${dateObj
        .getDate()
        .toString()
        .padStart(2, "0")}-${(dateObj.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${dateObj.getFullYear()}`;
      setFormattedDate(formattedDateStr);
    }
  }, [date]);

  const showseemoreModal = (data) => {
    setseeShmodal(true);
    setPID(data.PID);
    setStatus(data.Status);
    setOID(data.OID);
    setUID(data.UID);
    setFullName(data.FullName);
    setContact_No(data.Contact_No);
    setEmail(data.Email);
    setDate(data.Date);
    setReference(data.Transaction_Refrence);
    setPaymentType(data.PaymentType);
  };

  const closeseemoreModal = () => {
    setseeShmodal(false);
  };

  const SeeMoreModal = () => {
    return (
      <MDBModal open={shseemodal} setOpen={setseeShmodal} tabIndex="-1">
        <MDBModalDialog size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>See More Deliveries</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={closeseemoreModal}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="list-wrapper">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <TextField
                        type="text"
                        label="PID"
                        variant="outlined"
                        fullWidth
                        value={pid}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <TextField
                        type="text"
                        label="OID"
                        variant="outlined"
                        fullWidth
                        value={OID}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <TextField
                        type="text"
                        label="UID"
                        variant="outlined"
                        fullWidth
                        value={UID}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <TextField
                        type="text"
                        label="FullName"
                        variant="outlined"
                        fullWidth
                        value={FullName}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <TextField
                        type="text"
                        label="Payment Type"
                        variant="outlined"
                        fullWidth
                        value={PaymentType}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <TextField
                        type="text"
                        label="Contact_No"
                        variant="outlined"
                        fullWidth
                        value={Contact_No}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <TextField
                        type="text"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={Email}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <TextField
                        type="text"
                        label="Transaction Refrence"
                        variant="outlined"
                        fullWidth
                        value={refrence}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <TextField
                        type="text"
                        label="Status"
                        variant="outlined"
                        fullWidth
                        value={status}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <TextField
                        type="text"
                        label="Date"
                        variant="outlined"
                        fullWidth
                        value={formattedDate}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={closeseemoreModal}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    );
  };

  return (
    <>
      <h3 className="heading_top">Payment Verify Management</h3>
      <div
        className="row justify-content-between align-items-center"
        style={{ width: "90%", margin: "0 auto" }}
      >
        <div className="col-md-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search "
              aria-label="Search"
              aria-describedby="search-button"
              value={searchQuery}
              onChange={handleSearch}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="search-button"
            >
              Search
            </button>
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          <div className="status-filter" style={{marginRight:'12px'}}>
            <TextField
              select
              label="Filter by Status"
              value={statusFilter}
              onChange={handleStatusFilter}
             
            >
              <MenuItem value=""  ><div style={{paddingRight:'120px'}}>All</div></MenuItem>
              <MenuItem value="Verified">Verified</MenuItem>
              <MenuItem value="Unverified">Unverified</MenuItem>
            </TextField>
          </div>
          <button className="btn btn-primary" onClick={generatePDF}>
            Download PDF
          </button>
        </div>
      </div>

      <div className="tableDiv" id="table-content">
        <MDBTable hover>
          <MDBTableHead>
            <tr style={{ backgroundColor: "black", color: "white" }}>
              <th scope="col">#</th>
              <th scope="col">PID</th>
              <th scope="col">OID</th>
              <th scope="col">Fullname</th>
              <th scope="col">Contact No</th>
              <th scope="col">Date</th>
              <th scope="col">Payment Type</th>
              <th scope="col">Refrence</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {filteredPayments.map((data, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{data.PID}</td>
                <td>{data.OID}</td>
                <td>{data.FullName}</td>
                <td>{data.Contact_No}</td>
                <td>
                  {(() => {
                    const dateStr = data.Date;
                    const date = new Date(dateStr);
                    const adjustedDate = new Date(
                      date.getTime() - date.getTimezoneOffset() * 60000
                    );

                    const day = adjustedDate
                      .getDate()
                      .toString()
                      .padStart(2, "0");
                    const month = (adjustedDate.getMonth() + 1)
                      .toString()
                      .padStart(2, "0");
                    const year = adjustedDate.getFullYear();

                    const formattedDate = `${day}-${month}-${year}`;
                    return formattedDate;
                  })()}
                </td>

                <td>{data.PaymentType}</td>
                <td>{data.Transaction_Refrence}</td>
                <td>{data.Status}</td>
                <td
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Tooltip title="See more">
                    <VisibilityIcon
                      style={{
                        cursor: "pointer",
                        marginRight: "15px",
                      }}
                      onClick={(e) => showseemoreModal(data)}
                    />
                  </Tooltip>
                  <Tooltip title="Update Status">
                    <ChangeCircleIcon
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={(e) => showModal(data)}
                    />
                  </Tooltip>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </div>
      {UpdateModal()}
      {SeeMoreModal()}
    </>
  );
};

export default PaymentAdmin;
