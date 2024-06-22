import React, { useEffect, useState } from "react";
import axios from "axios";
import { signout } from "../actions";
import { useDispatch } from "react-redux";

export default function Profile(){
    const [User,setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const[customer,setCustomer]=useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState(null);
    const dispatch = useDispatch();


    const fetchUserDetails = async () => {
        try {
          const token = window.localStorage.getItem("token");
        
          const response = await axios.get(
            `http://localhost:8070/users/${User._id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setCustomer(response.data.user);
          setUpdatedUser(response.data.user);
        } catch (error) {
          if (error.response && error.response.status === 401) {
            console.error("Token expired or unauthorized:", error.response);
            alert("Your session has expired. Please login again.");
            dispatch(signout());
          } else {
            console.error("Error fetching admin details:", error.response);
          }
        }
      };
    
      useEffect(() => {
        fetchUserDetails();
      }, []);
    
      const handleUpdate = async () => {
        console.log(updatedUser);
        try {
          const token = window.localStorage.getItem("token");
         
          await axios.put(`http://localhost:8070/users/${User._id}`, updatedUser, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          alert("Update Succsess");
          await fetchUserDetails();
          setIsEditing(false);
        } catch (error) {
          if (error.response && error.response.status === 401) {
            console.error("Token expired or unauthorized:", error.response);
            alert("Your session has expired. Please login again.");
            dispatch(signout());
          } else {
            console.error("Error updating customer details:", error.response);
          }
        }
      };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser({ ...updatedUser, [name]: value });
      };
     const handleShow =()=>{
        setIsEditing(true);
     }
    
      const handleDeleteAccount = async () => {
        try {
          const token = window.localStorage.getItem("token");
       
          await axios.delete(`http://localhost:8070/users/${User._id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          alert("Account deleted successfully");
          dispatch(signout());
          window.location.href = '/';
        } catch (error) {
          if (error.response && error.response.status === 401) {
            console.error("Token expired or unauthorized:", error.response);
            alert("Your session has expired. Please login again.");
            
          } else {
            console.error("Error deleting customer account:", error.response);
          }
        }
      };
    

return(

<div>
<section style={{ backgroundColor: '#eee' }}>
      <div className="container py-5">
      

        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
            
                <h5 className="my-3">{customer.username}</h5>
                <p className="text-muted mb-1">{customer.name}</p>
                <p className="text-muted mb-4">{customer.address}</p>
                <div className="d-flex justify-content-center mb-2">
                  <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary" style={{backgroundColor:''}} onClick={()=>{handleShow()}}>Update</button>
                  <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-primary ms-1" onClick={()=>{handleDeleteAccount()}}>Delete</button>
                </div>
              </div>
            </div>
           
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    {isEditing?( <input
                          type="text"
                          name="name"
                          value={updatedUser.name}
                          onChange={handleChange}
                        />):(<p className="text-muted mb-0">{customer.name}</p>)}
                    
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                  {isEditing?( <input
                          type="text"
                          name="email"
                          value={updatedUser.email}
                          onChange={handleChange}
                        />):(<p className="text-muted mb-0">{customer.email}</p>)}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Phone</p>
                  </div>
                  <div className="col-sm-9">
                  {isEditing?( <input
                          type="text"
                          name="phoneNumber"
                          value={updatedUser.phoneNumber}
                          onChange={handleChange}
                        />):(<p className="text-muted mb-0">{customer.phoneNumber}</p>)}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Date of Birth</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{customer.DOB}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Address</p>
                  </div>
                  <div className="col-sm-9">
                  {isEditing?( <input
                          type="text"
                          name="address"
                          value={updatedUser.address}
                          onChange={handleChange}
                        />):(<p className="text-muted mb-0">{customer.address}</p>)}
                  </div>
{isEditing?( <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary" style={{backgroundColor:''}} onClick={()=>{handleUpdate()}}>Update</button>
                  ):null}
                 
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card mb-4 mb-md-0">
                  <div className="card-body">
                    <p className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status
                    </p>
                    <p className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</p>
                    <div className="progress rounded" style={{ height: '5px' }}>
                      <div className="progress-bar" role="progressbar" style={{ width: '80%' }} aria-valuenow="80"
                        aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card mb-4 mb-md-0">
                  <div className="card-body">
                    <p className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status
                    </p>
                    <p className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</p>
                    <div className="progress rounded" style={{ height: '5px' }}>
                      <div className="progress-bar" role="progressbar" style={{ width: '80%' }} aria-valuenow="80"
                        aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</div>

)




}