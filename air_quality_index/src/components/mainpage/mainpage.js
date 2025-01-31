import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { IoMenuOutline } from "react-icons/io5";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './mainpage.css';
import { IoIosSearch } from "react-icons/io";

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
              <li>
              <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default"><IoIosSearch /></span>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
               </div>
              </li>
              
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Dashboard</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Ranking</a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Aqi Ranking </a></li>
                  <li><a className="dropdown-item" href="#">Weather Ranking</a></li>
                  <li><a className="dropdown-item" href="#">Historic City AQI Ranking</a></li>
                  <li><a className="dropdown-item" href="#">Historic Counrty AQI Ranking</a></li>
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
        
        <div className="maincontent">
          <div className='row1'>
            <div class="card text-center ">
              <div class="card-header">
                <ul class="nav nav-tabs card-header-tabs">
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="true" href="#">Active</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                  </li>
                </ul>
              </div>

              
              <div class="card-body" >
                <h5 class="card-title">Special title treatment</h5>
                <p class="card-text"></p>

                <div class="card text-bg-dark">
                            <img src="..." class="card-img" alt="..." />
                            <div class="card-img-overlay">
                              <h5 class="card-title">Card title</h5>
                              <p class="card-text">This is a wider card with ssupporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                              <p class="card-text"><small>Last updated 3 mins ago</small></p>
                            </div>
                          </div>
                
                <a href="#" class="btn btn-primary">Go somewhere</a>

              </div>
            </div>
          </div>


          <div className="row">
            <div className="col-sm-2">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">AQI Value</h5>
                  <p className="card-text">678</p>
                  <p className="card-text"></p>
                  <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div>
            <div className="col-sm-2">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div>
          </div>
          
        </div>


      </div>
    </div>
  );
}

export default Mainpage;
