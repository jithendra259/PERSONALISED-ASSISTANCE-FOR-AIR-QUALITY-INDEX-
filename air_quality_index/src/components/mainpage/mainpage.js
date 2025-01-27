import React from 'react';
import { CgProfile } from 'react-icons/cg';
import './mainpage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoMenuOutline } from "react-icons/io5";

function Mainpage(){
  return (
    <div className="container">
      <div className="mainpageclass">
        <div className="mainheader">
          <div className='menuicon'>
            <button type="button" className="btn btn-light" aria-label="Menu">
            <IoMenuOutline />
            </button>
          </div>
          <div className="profileicon">
            <button type="button" className="btn btn-light" aria-label="Profile">
              <CgProfile />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
