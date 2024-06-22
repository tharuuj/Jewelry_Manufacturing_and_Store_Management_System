import React, { useState, useEffect } from "react";



import { login } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from '../../actions';
import { Navigate } from 'react-router-dom';
import './signin.css'


export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, []);

  const userLogin = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password
    };
    if (!email.trim()&&!password.trim()) {
      setError('Password and Email is required');
      return;
    }
    // Check if email or password is empty
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
  
    if (!password.trim()) {
      setError('Password is required');
      return;
    }
    try {
      await dispatch(login(user));
    } catch (error) {
      
        setError('Invalid username or password');
      
    }
  };

  if (auth.authenticate) {
  
        
    return <Navigate to={'/'} />
  }

  return (
    <div>
     


          <div class="login-page">
  <div class="form">
   
    <form class="login-form" onSubmit={userLogin}>
      <input  type="text"
      value={email}
      onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
      <input type="password" placeholder="password" 
      value={password}
      onChange={(e) => setPassword(e.target.value)}/>
      <button type="submit">login</button>
      <p class="message">Not registered? <a href="/signup">Create an account</a></p>
    </form>
    {error && <p className="error-message">{error}</p>}
  </div>
</div>
    </div>
  );
}
