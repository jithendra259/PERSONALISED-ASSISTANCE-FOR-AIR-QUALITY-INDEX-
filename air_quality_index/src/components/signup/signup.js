import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/signup', { email, password });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.error || 'An error occurred.');
        }
    };

    return (
        <div className="signupclass template d-flex justify-content-center align-items-center bg-primary vh-100">
            <div className="col-3 form_container p-5 rounded bg-white">
              
                <form onSubmit={handleSubmit}>
                    <h3 className="mb-4 text-center">Sign Up</h3>
                    <div className="mb-3">
                        <label htmlFor="inputEmail" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="inputEmail"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="inputPassword" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="inputPassword"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="d-grid mb-3">
                        <button type="submit" className="btn btn-primary">Sign up</button>
                    </div>

                    {message && <div className="alert alert-info">{message}</div>}
                    <div className="text-center">
                      <p>already have an account?<Link to="/Login">login</Link></p>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Signup;
