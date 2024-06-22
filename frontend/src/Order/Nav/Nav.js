import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="OrderNav">
      <ul className="home-ul">
        <li className="home-11">
          <Link to="/" className="active home-a">
            <h2>Home</h2>
          </Link>
        </li>
        <li className="home-11">
          <Link to="/AddOrders" className="active home-a">
            <h2>AddOrders</h2>
          </Link>
        </li>
        <li className="home-11">
          <Link to="/OrderDetails" className="active home-a">
            <h2>Order Details</h2>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;

