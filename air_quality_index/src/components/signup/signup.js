import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './signup.css';

function Signup() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    if (!formData.firstname) {
      err.firstname = "Please enter your firstname";
    }
    if (!formData.lastname) {
      err.lastname = "Please enter your lastname";
    }
    if (!formData.email) {
      err.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      err.password = "Please provide a password";
    } else if (formData.password.length < 5) {
      err.password = "Your password must be at least 5 characters long";
    }
    return err;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length === 0) {
      // Perform signup action (e.g., API call)
      console.log("Signup form submitted", formData);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5 mx-auto">
          <div id="second">
            <div className="myform form">
              <div className="logo mb-3">
                <div className="col-md-12 text-center">
                  <h1>Signup</h1>
                </div>
              </div>
              <form name="registration" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="firstname">First Name</label>
                  <input
                    type="text"
                    name="firstname"
                    className="form-control"
                    id="firstname"
                    placeholder="Enter Firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                  />
                  {errors.firstname && <div className="error">{errors.firstname}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="lastname">Last Name</label>
                  <input
                    type="text"
                    name="lastname"
                    className="form-control"
                    id="lastname"
                    placeholder="Enter Lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                  />
                  {errors.lastname && <div className="error">{errors.lastname}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <div className="error">{errors.email}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && <div className="error">{errors.password}</div>}
                </div>
                <div className="col-md-12 text-center mb-3">
                  <button type="submit" className="btn btn-block mybtn btn-primary tx-tfm">
                    Signup
                  </button>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <p className="text-center">
                      Already have an account? <Link to="/login">Sign in here</Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
