import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { TextField, MenuItem, InputBase, IconButton } from "@mui/material";
import { GetAll, ChangeStatus } from "./actions/tracking_action";
import Tooltip from "@mui/material/Tooltip";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
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
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const TrackingAdmin = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.delivery.loading);
  const deliveries = useSelector((state) => state.delivery.deliveries);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

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
    document.title = "Order Tracking Management | Diamonds.lk ";
  }, []);

  useEffect(() => {
    dispatch(GetAll());
  }, []);

  const filteredDeliveries = deliveries.filter(
    (delivery) =>
      delivery.FullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.Tracking_Number.toLowerCase().includes(
        searchQuery.toLowerCase()
      ) ||
      delivery.OID.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.Contact_No.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.Address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.Date.includes(searchQuery) ||
      delivery.Status.toLowerCase().includes(searchQuery.toLowerCase())
  ).filter(
    (delivery) =>
      statusFilter === "" || delivery.Status.toLowerCase() === statusFilter.toLowerCase()
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  //pdf generate function
  const generatePDF = () => {
    const input = document.getElementById("table-content");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("tracking_table.pdf");
    });
  };
  //update modal functions
  const [shmodal, setShmodal] = useState(false);
  const [status, setStatus] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");

  const showModal = (data) => {
    setShmodal(true);
    setStatus(data.Status);
    setTrackingNumber(data.Tracking_Number);
  };

  const closeModal = () => {
    setShmodal(false);
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    const form = {
      Tracking_Number: trackingNumber,
      Status: status,
    };

    dispatch(ChangeStatus(form));
    setStatus("");
    setTrackingNumber("");
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
                      label="Tracking Number"
                      variant="outlined"
                      fullWidth
                      value={trackingNumber}
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
                      <MenuItem value="Verified">Verified</MenuItem>
                      <MenuItem value="Unverified">Unverified</MenuItem>
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

  //seemore modal functions
  const [shseemodal, setseeShmodal] = useState(false);
  const [OID, setOID] = useState("");
  const [UID, setUID] = useState("");
  const [FullName, setFullName] = useState("");
  const [Address, setAddress] = useState("");
  const [Contact_No, setContact_No] = useState("");
  const [Email, setEmail] = useState("");
  const [City, setCity] = useState("");
  const [State, setState] = useState("");
  const [ZipCode, setZipCode] = useState("");
  const [Country, setCountry] = useState("");
  const [date, setDate] = useState("");

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
    setStatus(data.Status);
    setTrackingNumber(data.Tracking_Number);
    setOID(data.OID);
    setUID(data.UID);
    setFullName(data.FullName);
    setAddress(data.Address);
    setContact_No(data.Contact_No);
    setEmail(data.Email);
    setCity(data.City);
    setState(data.State);
    setZipCode(data.ZipCode);
    setCountry(data.Country);
    setDate(data.Date);
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
                        label="Tracking Number"
                        variant="outlined"
                        fullWidth
                        value={trackingNumber}
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
                  <div className="col-md-12">
                    <div className="form-group">
                      <TextField
                        type="text"
                        label="Address"
                        variant="outlined"
                        fullWidth
                        value={Address}
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
                        label="City"
                        variant="outlined"
                        fullWidth
                        value={City}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <TextField
                        type="text"
                        label="State"
                        variant="outlined"
                        fullWidth
                        value={State}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <TextField
                        type="text"
                        label="ZipCode"
                        variant="outlined"
                        fullWidth
                        value={ZipCode}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <TextField
                        type="text"
                        label="Country"
                        variant="outlined"
                        fullWidth
                        value={Country}
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
      <h3 className="heading_top">Order Tracking Management</h3>
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
          <TextField
            select
            label="Filter by Status"
            variant="outlined"
            value={statusFilter}
            onChange={handleStatusFilter}
            style={{ marginRight: "10px" }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Verified">Verified</MenuItem>
            <MenuItem value="Unverified">Unverified</MenuItem>
          </TextField>
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
              <th scope="col">Tracking Number</th>
              <th scope="col">OID</th>
              <th scope="col">Fullname</th>
              <th scope="col">Address</th>
              <th scope="col">Contact No</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {filteredDeliveries.map((data, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{data.Tracking_Number}</td>
                <td>{data.OID}</td>
                <td>{data.FullName}</td>
                <td>{data.Address}</td>
                <td>{data.Contact_No}</td>
                <td>
                  {(() => {
                    const dateStr = data.Date;
                    const date = new Date(dateStr);

                    const day = date.getDate().toString().padStart(2, "0");
                    const month = (date.getMonth() + 1)
                      .toString()
                      .padStart(2, "0");
                    const year = date.getFullYear();

                    const formattedDate = `${day}-${month}-${year}`;
                    return formattedDate;
                  })()}
                </td>
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
                      onClick={(e) => {
                        showseemoreModal(data);
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="Update Status">
                    <ChangeCircleIcon
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={(e) => {
                        showModal(data);
                      }}
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

export default TrackingAdmin;
