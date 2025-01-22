import { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email,setemail]=useState('')
  const [password,setpassword]=useState('')
  function handleSubmit(event){
    event.preventDefault();
  }
  return ( 
   
    <div className="loginclass template d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="col-3 form_container p-5 rounded bg-white">
        <form onSubmit={handleSubmit}>
          <h3 className="mb-4 text-center">Sign In</h3>
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">Email</label>
            <input 
            type="email" 
            className="form-control" 
            id="inputEmail" 
            placeholder="Enter your email"
            onChange={e=>setemail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label">Password</label>
            <input
            type="password" 
            className="form-control" 
            id="inputPassword" 
            placeholder="Enter your password" 
            onChange={e=>setpassword(e.target.value)}
            />
          </div>

          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" id="rememberMe" />
            <label htmlFor="rememberMe" className="form-check-label">
              Remember me
            </label>
          </div>

          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-primary">Sign in</button>
          </div>

          <div className="text-center">
            <Link to="/forgot-password" className="me-3">Forgot Password?</Link>
            <Link to="/signup">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
