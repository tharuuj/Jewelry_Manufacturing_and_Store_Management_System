import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom"

const Headers = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ height: "50px" }}>
        <Container>
          <NavLink to="/" className="text-decoration-none text-light mx-2">Diamond.lk</NavLink>
          <Nav className="me-auto">
            <NavLink to="" className="text-decoration-none text-light ">   </NavLink>
          </Nav>
          <Nav className="me-auto">
            <NavLink to="/homeemp" className="text-decoration-none text-light ">Home</NavLink>
          </Nav>
        
          <Nav className="me-auto">
            <NavLink to="/workhistory" className="text-decoration-none text-light ">Work history</NavLink>
          </Nav>
          <Nav className="me-auto">
            <NavLink to="/attendance" className="text-decoration-none text-light ">Attendance</NavLink>
          </Nav>          
          <Nav className="me-auto">
            <NavLink to="/leave" className="text-decoration-none text-light ">Leaves</NavLink>
          </Nav>
          <Nav className="me-auto">
            <NavLink to="/empmails" className="text-decoration-none text-light ">Send emails</NavLink>
          </Nav>

        </Container>
      </Navbar>
    </>
  )
}

export default Headers




