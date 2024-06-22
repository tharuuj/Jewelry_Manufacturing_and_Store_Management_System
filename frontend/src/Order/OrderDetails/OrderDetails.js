import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Orders from '../Orders/Orders';
import Nav from "../Nav/Nav";

const URL = "http://Localhost:8070/orders";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function OrderDetails() {
  const [users, setUsers] = useState([]);
  const [selectedOrderType, setSelectedOrderType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.users));
  }, []);

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: "Users Report",
    onafterprint: () => alert("Users Report Successfully Download !"),
  });

  const handleSearch = () => {
    fetchHandler().then((data) => {
      let filteredUsers = data.users.filter((user) =>
        Object.values(user).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );

      if (selectedOrderType !== "All") {
        filteredUsers = filteredUsers.filter(
          (user) => user.OrderType.toLowerCase() === selectedOrderType.toLowerCase()
        );
      }

      setUsers(filteredUsers);
      setNoResults(filteredUsers.length === 0);
    });
  };

  const handleOrderTypeChange = (e) => {
    setSelectedOrderType(e.target.value);
  };

  return (
    <div className="OrderDetails">
      <Nav/>
      <h1 className="head">Order Details</h1>
      <div className="filter-container" style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Search User Details"
          style={{
            borderRadius: "8px",
            padding: "10px",
            marginRight: "10px",
            cursor: "pointer",
          }}
        />
        <select
          value={selectedOrderType}
          onChange={handleOrderTypeChange}
          style={{
            borderRadius: "8px",
            padding: "10px",
            marginRight: "10px",
            cursor: "pointer",
          }}
        >
          <option value="All">All</option>
          <option value="Online">Online</option>
          <option value="Physical">Physical</option>
        </select>
        <button
          onClick={handleSearch}
          style={{
            backgroundColor: "dimgrey",
            borderRadius: "8px",
            color: "white",
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {noResults ? (
        <div>
          <p>No Users Found</p>
        </div>
      ) : (
        <div ref={ComponentsRef}>
          {users &&
            users.map((user, i) => (
              <div key={i}>
                <Orders user={user} />
              </div>
            ))}
        </div>
      )}
      <br />
      <button
        onClick={handlePrint}
        style={{
          backgroundColor: "green",
          borderRadius: "8px",
          color: "white",
          padding: "10px 20px",
          border: "none",
          display: "block",
          margin: "0 auto",
          cursor: "pointer",
        }}
      >
        Download Report
      </button>
      <br />
    </div>
  );
}

export default OrderDetails;
