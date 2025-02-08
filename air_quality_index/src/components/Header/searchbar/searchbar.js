import React, { useState } from 'react';
import './searchbar.css';

function Searchbar() {
  // The list of items to filter (same as your first code)
  const items = ["HTML", "CSS", "JavaScript", "jQuery", "Bootstrap", "Angular"];
  
  // State to hold the current query text
  const [query, setQuery] = useState("");

  // Filter items based on the query (case-insensitive)
  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="searchbar">
      <div className="bg-light d-flex justify-content-center align-items-center">
        {/* Set a fixed width for demo purposes; adjust as needed */}
        <div className="position-relative" >
          <input
            type="text"
            className="form-control rounded-pill search-bar pe-5"
            placeholder="Search..."
            aria-label="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            className="btn position-absolute top-50 end-0 translate-middle-y" 
            type="button"
          >
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
          </button>
          
          {/* Dropdown list (positioned absolutely below the input) */}
          {query && (
            <ul 
              className="dropdown-menu show" 
              style={{ 
                width: "100%", 
                position: "absolute", 
                top: "100%", 
                left: 0,
                zIndex: 1000 
              }}
            >
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <li key={index}>
                    <a href="#" className="dropdown-item">
                      {item}
                    </a>
                  </li>
                ))
              ) : (
                <li>
                  <span className="dropdown-item">No results found</span>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
