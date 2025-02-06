import React from 'react';
import { IoIosSearch } from "react-icons/io";
import { IoMenuOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import './header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


function Header() {
  return (
    <header className="mainheader">
      {/* Menu Icon */}
      <div className="menu">
        <div className="dropdown">
          <button className="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <IoMenuOutline />
          </button>
          <ul className="dropdown-menu">
            <li><button className="dropdown-item" type="button">Menu Item 1</button></li>
            <li><button className="dropdown-item" type="button">Menu Item 2</button></li>
            <li><button className="dropdown-item" type="button">Menu Item 3</button></li>
          </ul>
        </div>
      </div>
      
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <ul className="navbar-nav d-flex align-items-center w-100">
            
            {/* Search Bar */}
            <li className="nav-item mx-3">
              <div className="input-group">
                <span className="input-group-text"><IoIosSearch /></span>
                <input type="text" className="form-control" placeholder="Search" />
              </div>
            </li>
            
            {/* Navigation Links */}
            <li className="nav-item mx-1" >
              <a className="nav-link active" href="/mainpage">Dashboard</a>
            </li>
            
            <li className="nav-item dropdown mx-1">
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="/ranking" role="button" aria-expanded="false">
                Ranking
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/aqi-ranking">AQI Ranking</a></li>
                <li><a className="dropdown-item" href="/weather-ranking">Weather Ranking</a></li>
                <li><a className="dropdown-item" href="/historic-city-aqi">Historic City AQI</a></li>
                <li><a className="dropdown-item" href="/historic-country-aqi">Historic Country AQI</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="/separated-link">Separated Link</a></li>
              </ul>
            </li>

            <li className="nav-item mx-1" >
              <a className="nav-link active" href="/mappage">Map</a>
            </li>

            <li className="nav-item mx-1" >
              <a className="nav-link active" href="/chatbot">chatbot</a>
            </li>

            {/* Profile Icon */}
            <li className="nav-item profileicon mx-1">
              <div className="dropdown">
                <button className="btn btn-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <CgProfile />
                </button>
                <ul className="dropdown-menu">
                  <li><button className="dropdown-item" type="button">Profile</button></li>
                  <li><button className="dropdown-item" type="button">Settings</button></li>
                  <li><button className="dropdown-item" type="button">Logout</button></li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
