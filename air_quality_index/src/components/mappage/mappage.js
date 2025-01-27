import React from 'react';
import { CgProfile } from 'react-icons/cg';
import './mappage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Mappage(){
  return (
    <div className="container">
      <div className="mainpageclass">
        <div className="mainheader">
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
export default Mappage;
