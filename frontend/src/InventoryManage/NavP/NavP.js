import React from "react";

import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="Inventory">
      <ul className="home-ul">
        <li className="home-11">
          <Link to="/mainhome" className="active home-a">
            <h2>Home</h2>
          </Link>
        </li>
        <li className="home-11">
          <Link to="/addproduct" className="active home-a">
            <h2>Add Product</h2>
          </Link>
        </li>
        <li className="home-11">
          <Link to="/productdetails" className="active home-a">
            <h2>Product details</h2>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
