import React,{useState} from "react";

import { Container, Form, Row, Col, Button } from "react-bootstrap";
import cover from "../../../Components/Accsesories/Images/2.jpg"
import { Navigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import './signup.css'
import {signup} from '../../actions';

export default function Index() {
  const[name,setName]=useState('');
  const[DOB,setDOB]=useState('');
  const[address,setAddress]=useState('');
  const[phoneNumber,setphoneNumber]=useState('');
  const[username,setUsername]=useState('');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[error,setError]=useState('');
  const[role,setrole]=useState('customer');
  const auth=useSelector(state=>state.auth);
  const user=useSelector(state=>state.user);
  const dispatch=useDispatch();
  const [errorMessage, setErrorMessage] = useState('');

  const userSignup=(e)=>{
    
e.preventDefault();

if (!name) {
  setErrorMessage('Name is required');
  return;
}

if (!DOB) {
  setErrorMessage('DOB is required');
  return;
}

if (!address) {
  setErrorMessage('Address is required');
  return;
}

if (!phoneNumber) {
  setErrorMessage('Phone Number is required');
  return;
}

  const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dobRegex.test(DOB)) {
    setErrorMessage('Invalid DOB format');
    return;
  }
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phoneNumber)) {
    setErrorMessage('Invalid phone number format');
    return;
  }


if (!username) {
  setErrorMessage('Username is required');
  return;
}

if (!email) {
  setErrorMessage('Email is required');
  return;
}


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  setErrorMessage('Invalid email format');
  return;
}

if (!password) {
  setErrorMessage('Password is required');
  return;
}
if (password.length < 6) {
  setErrorMessage('Password must be at least 6 characters long');
  return;
}
    const user={
      name,DOB,address,phoneNumber,username,email,password,role
    }
    dispatch(signup(user));
    alert("Customer created successfully")
    window.location.href = '/';

  }
 
  if(user.loading){
    return<p>loading...!</p>
  }
  return (
    <div className="signUP">
     
     <a href="/" class="close"/>

            <section className="h-100 " >
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col">
        <div className="card card-registration my-4">
          <div className="row g-0">
            <div className="col-xl-6 d-none d-xl-block">
              <img src={cover}
                alt="Sample photo" className="img-fluid" style={{objectFit:"cover",objectPosition:'center'}}
                 />
            </div>
            <div className="col-xl-6">
              <div className="card-body p-md-5 text-black">
                <h3 className="mb-5 text-uppercase">Diomonds.lk Customer registration</h3>
<form onSubmit={userSignup}>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div data-mdb-input-init className="form-outline">
                      <input type="text" id="form3Example1m" className="form-control form-control-lg"  
                    placeholder="FullName"
                    value={name}
                    onChange={(e) =>setName(e.target.value) }/>
                      <label className="form-label" for="form3Example1m">Full name</label>
                    </div>
                  </div>
               
                </div>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div data-mdb-input-init className="form-outline">
                      <input type="text" id="form3Example1m1" className="form-control form-control-lg"  
                    placeholder="2001-04-05"
                    value={DOB}
                 
                    onChange={(e) =>setDOB(e.target.value)} />
                      <label className="form-label" for="form3Example1m1">Date of Birth</label>
                    </div>
                  </div>
                
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                  <input type="text" id="form3Example8" className="form-control form-control-lg"  
                    value={address}
                   
                    onChange={(e) =>setAddress(e.target.value)}/>
                  <label className="form-label" for="form3Example8">Address</label>
                </div>

               


                <div data-mdb-input-init className="form-outline mb-4">
                  <input type="text" id="form3Example9" className="form-control form-control-lg" 
                    placeholder="0740035353"
                    value={phoneNumber}
                    
                    onChange={(e) =>setphoneNumber(e.target.value)}/>
                  <label className="form-label" for="form3Example9">Phone Number</label>
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                  <input type="text" id="form3Example90" className="form-control form-control-lg" 
                    placeholder="Username"
                    value={username}
                   
                     onChange={(e) =>setUsername(e.target.value)}/>
                  <label className="form-label" for="form3Example90">Username</label>
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                  <input  id="form3Example99" className="form-control form-control-lg"  
                placeholder="a@gmail.com"
                value={email}
                type="email"
                onChange={(e) =>setEmail(e.target.value)} />
                  <label className="form-label" for="form3Example99">Email</label>
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                  <input  id="form3Example97" className="form-control form-control-lg"   
                placeholder="Password"
                value={password}
                type="password"
                onChange={(e) =>setPassword(e.target.value)}/>
                  <label className="form-label" for="form3Example97">Password (should be six characters long)</label>
                </div>

                <div className="d-flex justify-content-end pt-3">
                  <button  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-light btn-lg">Reset all</button>
                  <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-warning btn-lg ms-2">Submit form</button>
                </div>
                {errorMessage && <div className="error">{errorMessage}</div>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      
    </div>
  );
}
