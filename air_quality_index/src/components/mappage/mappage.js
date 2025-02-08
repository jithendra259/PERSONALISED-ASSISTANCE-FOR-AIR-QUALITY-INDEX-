import React from 'react';
import Header from '../Header/header';

const MapComponent = () => {
  return (
    
    <div className="row w-100">
      <Header/>
      <div className="col-lg-6 my-4 ratio ratio-16x9 mx-auto ">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115681.29592731265!2d-77.47713270775661!3d25.0326996781907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x892f7c99b981dbc9%3A0x2aef01d3485e50d2!2sNassau%2C%20Bahamy!5e0!3m2!1sen!2sen!4v1624445118063!5m2!1sen!2sen&hl=en"
          className="w-100"
          height="400"
          allowFullScreen
          loading="lazy"
          title="Google Map"
        />
      </div>
      
    </div>
  );
};

export default MapComponent;
