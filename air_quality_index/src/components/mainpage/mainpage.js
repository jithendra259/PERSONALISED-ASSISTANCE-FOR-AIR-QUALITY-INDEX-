import React from 'react';
import { CgProfile } from 'react-icons/cg';
import './mainpage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Mainpage component renders the main page layout including the profile icon.
 */
function Mainpage() {
  return (
    <div className="container">
      <div className="mainpageclass">
        <div className="mainheader">
          <div className="profileicon">
            <button type="button" className="btn btn-light" aria-label="Profile">
              <CgProfile size={28}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
