import React, { useState, useEffect } from "react";
import { Form, Input, message, Modal, Select, Table, DatePicker, Button } from "antd";
import Layouts from "../Layouts/Layouts";
import axios from "axios";
import Spinner from "../Spinner";
import moment from "moment";
import styled from "styled-components";
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Analytics from "../Analytics";
import AdminSideBar from "../../Components/Admin/AdminComponents/AdminSideBar";

const { RangePicker } = DatePicker;

// Styled component for the filters
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h6 {
    margin-bottom: 5px;
  }

  .filter-select {
    margin-right: 20px;
    min-width: 200px;
  }

  .filter-range-picker {
    width: 300px;
  }

  .add-button {
    margin-left: 20px;
  }

  .anticon svg {
    font-size: 20px;
    cursor: pointer;
  }

  .active-icon {
    color: lightgray;
    border: 1px solid lightgray;
    padding: 3px;
    border-radius: 5px;
  }

  .inactive-icon {
    color: gray;
  }

  .switch-icons {
    display: flex;
    gap: 20px;
  }
`;

const Finance = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const[user,setuser_id]=useState(JSON.parse(localStorage.getItem('user')));

  // Table columns
  const columns = [
    {
      title: "FinanceID",
      dataIndex: "Financeid",
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (text) => <span>{text * 200} LKR</span>,
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  // Fetch all transactions
  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        
        setLoading(true);
        const res = await axios.get(
          "http://localhost:8070/api/v1/transactions/get-transaction",
          {
            userid: user._id,
            frequency,
            selectedDate,
            type,

          }
        );
        setLoading(false);
        setAllTransaction(res.data);
        console.log(allTransaction)
      } catch (error) {
        console.log(error);
        message.error("Fetch Issue With Transactions");
      }
    };
    getAllTransactions();
  }, [frequency, selectedDate, type]);

  // delete handler
  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.delete("http://localhost:8070/api/v1/transactions/delete-transaction", { transactionId: record._id });
      setLoading(false);
      message.success("Transaction Deleted");
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Unable to delete");
    }
  };

  // Form submit handler
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);


      const financeIdExists = allTransaction.some(transaction => transaction.Financeid === values.Financeid);

      if (financeIdExists) {
        setLoading(false);
        message.error("Finance ID already exists");
        return; 
      }

      if (editable) {
        await axios.put("http://localhost:8070/api/v1/transactions/edit-transaction", {
          payload: {
            ...values,
            userID: user._id,
          },
          transactionId: editable._id,
        });
        setLoading(false);
        message.success("Transaction updated Successfully");
      } else {
        await axios.post("http://localhost:8070/api/v1/transactions/add-transaction", {
          ...values,
          userid: user._id,
        });
        setLoading(false);
        message.success("Transaction Added Successfully");
      }

      setShowModal(false);
      setEditable(null);
    } catch (error) {
      setLoading(false);
      message.error("Failed to add transaction");
    }
  };

  // Generate PDF report
  const handleGeneratePDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";
  
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
  
    doc.setFontSize(15);
    const title = "Transaction Report";
    const subtitle = "Generated on " + moment().format("YYYY-MM-DD");
    const headers = [["FinanceID", "Date", "Amount", "Type", "Category", "Description"]];
  
    const data = allTransaction.map((item) => [
      item.Financeid,
      moment(item.date).format("YYYY-MM-DD"),
      item.amount,
      item.type,
      item.category,
      item.description,
    ]);
  
    let content = {
      startY: 70,
      head: headers,
      body: data,
    };
  
    // Set title
    doc.setTextColor(0, 0, 255); // Blue color for the title
    doc.text(title, marginLeft, 40);
  
    // Set subtitle
    doc.setTextColor(255, 0, 0); // Red color for the subtitle
    doc.setFontSize(12); // Adjust font size for the subtitle
    doc.text(subtitle, marginLeft, 55);
  
    // Set content
    doc.setTextColor(0); // Reset text color to black
    doc.setFontSize(10); // Adjust font size for the content
    doc.autoTable(content);
  
    doc.save("transaction_report.pdf");
  };
  


  //handle search
  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value === "") {
      setFilteredTransactions([]);
    } else {
      const filtered = allTransaction.filter(
        (transaction) =>
          transaction.Financeid.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredTransactions(filtered);
    }
  };

  
  const handleViewChange = (view) => {
    setViewData(view);
  };

  return (
<div className="AdminRight">
<AdminSideBar/>
<div className="AdminContent">


    <Layouts>
      {loading && <Spinner />}
      <FilterContainer>
        <div style={{ flex: 1 }}>
          <h6>Select Frequency</h6>
          <Select
            className="filter-select"
            value={frequency}
            onChange={(value) => setFrequency(value)}
          >
            <Select.Option value="7">Last 1 week</Select.Option>
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="365">Last 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              className="filter-range-picker"
              value={selectedDate}
              onChange={(values) => setSelectedDate(values)}
            />
          )}
        </div>

        <div style={{ flex: 1 }}>
          <h6>Select Type</h6>
          <Select
            className="filter-select"
            value={type}
            onChange={(value) => setType(value)}
          >
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </div>

        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <UnorderedListOutlined
            className={`mx-2 ${viewData === "table" ? "active-icon" : "inactive-icon"}`}
            onClick={() => handleViewChange("table")}
          />
          <AreaChartOutlined
            className={`mx-2 ${viewData === "analytics" ? "active-icon" : "inactive-icon"}`}
            onClick={() => handleViewChange("analytics")}
          />
          <Input.Search
            placeholder="Search Finance ID"
            allowClear
            enterButton
            onSearch={handleSearch}
            style={{ width: 210, marginRight: 10 }}
          />
          <button
            className="btn btn-primary add-button"
            onClick={() => setShowModal(true)}
          >
            Add Transaction
          </button>
        </div>
      </FilterContainer>

      <div className="content">
        {viewData === "table" ? (
          <Table
            columns={columns}
            dataSource={searchTerm ? filteredTransactions : allTransaction}
          />
        ) : (
          <Analytics allTransaction={allTransaction} />
        )}
        <div style={{ textAlign: "right", marginTop: "15px" }}>
          <Button
            type="primary"
            onClick={handleGeneratePDF}
            style={{ backgroundColor: "red", border: "none" }}
          >
            Generate PDF
          </Button>
        </div>
      </div>

      <Modal
        title={editable ? 'Edit Transaction' : 'Add Transaction'}
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleSubmit} initialValues={editable}>
          <Form.Item label="FinanceID" name="Financeid">
            <Input type="text" />
          </Form.Item>

          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="Esalary">Employee Salary</Select.Option>
              <Select.Option value="Ssalary">Supplier Salary</Select.Option>
              <Select.Option value="water">Water Bill</Select.Option>
              <Select.Option value="electricity">Electricity Bill</Select.Option>
              <Select.Option value="Dring">Diamond Ring</Select.Option>
              <Select.Option value="GEring">Gold Ear Ring</Select.Option>
              <Select.Option value="braslet">Bracelet</Select.Option>
              <Select.Option value="pendant">Rose Gold Pendant</Select.Option>
              <Select.Option value="Sring">Silver Ring</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layouts>
    </div></div>
  );
};

export default Finance;
