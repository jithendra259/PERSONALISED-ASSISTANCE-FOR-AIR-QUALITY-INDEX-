import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Header/header';

const MapPage = () => {
  const [mapHtml, setMapHtml] = useState('');
  
  useEffect(() => {
    // Fetch the map HTML from the Flask backend
    axios.get('http://127.0.0.1:5000/api/map')
      .then(response => {
        setMapHtml(response.data.map_html);
      })
      .catch(error => {
        console.error('Error fetching map:', error);
      });
  }, []);

  return (
    <div>
      {/* Render the header */}
      <Header/>
      {/* Render the map HTML */}
      <div dangerouslySetInnerHTML={{ __html: mapHtml }} />
    </div>
  );
};

export default MapPage;