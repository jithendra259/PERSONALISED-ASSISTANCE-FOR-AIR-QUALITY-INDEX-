import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { IoMenuOutline } from "react-icons/io5";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './mainpage.css';

function Mainpage() {
  return (
    <div className="container">
      <div className="mainpageclass">
        <header className="mainheader">
          
          <div className="menuicon">
            <div className="dropdown">
              <button 
                className="btn  " 
                type="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                <IoMenuOutline size={24} />
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Menu Item 1</a></li>
                <li><a className="dropdown-item" href="#">Menu Item 2</a></li>
                <li><a className="dropdown-item" href="#">Menu Item 3</a></li>
              </ul>
            </div>
          </div>

          <div className="navbar">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Active</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Dropdown</a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Separated link</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">Disabled</a>
              </li>
            </ul>
          </div>
           
          {/* Profile Icon */}
          <div className="profileicon">
            <div className="dropdown">
              <button 
                className="btn btn-light" 
                type="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                <CgProfile />
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Profile</a></li>
                <li><a className="dropdown-item" href="#">Settings</a></li>
                <li><a className="dropdown-item" href="#">Logout</a></li>
              </ul>
            </div>
          </div>

        </header>
      </div>
    </div>
  );
}

export default Mainpage;
