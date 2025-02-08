import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    if (!formData.email) {
      err.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      err.password = "Please enter password";
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
      // Perform login action (e.g., API call)
      console.log("Login form submitted", formData);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5 mx-auto">
          <div id="first">
            <div className="myform form">
              <div className="logo mb-3">
                <div className="col-md-12 text-center">
                  <h1>Login</h1>
                </div>
              </div>
              <form name="login" onSubmit={handleSubmit}>
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
                <div className="form-group">
                  <p className="text-center">
                    By signing up you accept our <a href="#">Terms Of Use</a>
                  </p>
                </div>
                <div className="col-md-12 text-center">
                  <button type="submit" className="btn btn-block mybtn btn-primary tx-tfm">
                    Login
                  </button>
                </div>
                <div className="col-md-12">
                  <div className="login-or">
                    <hr className="hr-or" />
                    <span className="span-or">or</span>
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                  <p className="text-center">
                    <a href="#" className="google btn mybtn">
                      <i className="fa fa-google-plus"></i> Signup using Google
                    </a>
                  </p>
                </div>
                <div className="form-group">
                  <p className="text-center">
                    Don't have an account? <Link to="/signup">Sign up here</Link>
                  </p>
                  <p><Link to="/mainpage">main page</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
