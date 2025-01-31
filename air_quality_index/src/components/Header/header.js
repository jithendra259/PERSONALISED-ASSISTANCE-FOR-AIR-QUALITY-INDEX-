import React from 'react';
import { IoIosSearch } from "react-icons/io";
import { IoMenuOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import './header.css';

function Header() {
  return (
    <header className="mainheader">
      <div className="menuicon">
        <div className="dropdown">
          <button 
            className="btn" 
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
          <li>
            <div className="input-group mb-3">
              <span className="input-group-text" id="inputGroup-sizing-default"><IoIosSearch /></span>
              <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">Dashboard</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Ranking</a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Aqi Ranking</a></li>
              <li><a className="dropdown-item" href="#">Weather Ranking</a></li>
              <li><a className="dropdown-item" href="#">Historic City AQI Ranking</a></li>
              <li><a className="dropdown-item" href="#">Historic Country AQI Ranking</a></li>
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
  );
}

export default Header;