import React, { useState, useMemo, useEffect } from 'react';
import { Country, State, City } from 'country-state-city';
import './searchbar.css';

// Custom hook for debouncing
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

// Precompute static data outside the component
const allCountries = Country.getAllCountries();
const allStates = allCountries.flatMap(country =>
  State.getStatesOfCountry(country.isoCode).map(state => ({
    ...state,
    countryName: country.name,
    countryIso: country.isoCode,
  }))
);
const allCities = allStates.flatMap(state =>
  City.getCitiesOfState(state.countryIso, state.isoCode).map(city => ({
    ...city,
    stateName: state.name,
    countryName: state.countryName,
    stateIso: state.isoCode,
    countryIso: state.countryIso,
  }))
);

function Searchbar() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isSelected, setIsSelected] = useState(false);

  // Filter results based on debounced query (first letter match)
  const { countryMatches, stateMatches, cityMatches } = useMemo(() => {
    const lowerQuery = debouncedQuery.toLowerCase();
    return {
      countryMatches: allCountries.filter(country =>
        country.name.toLowerCase().startsWith(lowerQuery)
      ),
      stateMatches: allStates.filter(state =>
        state.name.toLowerCase().startsWith(lowerQuery)
      ),
      cityMatches: allCities.filter(city =>
        city.name.toLowerCase().startsWith(lowerQuery)
      ),
    };
  }, [debouncedQuery]);

  // Build grouped results
  const groups = useMemo(() => {
    if (debouncedQuery.trim() === "") return [];
    const result = [];
    if (countryMatches.length > 0) {
      result.push({
        header: 'Countries',
        items: countryMatches.map(country => ({
          type: 'country',
          label: country.name,
          id: `country-${country.isoCode}`,
          data: country,
        })),
      });
    }
    if (stateMatches.length > 0) {
      result.push({
        header: 'States',
        items: stateMatches.map(state => ({
          type: 'state',
          label: `${state.name}, ${state.countryName}`,
          id: `state-${state.isoCode}-${state.countryIso}`,
          data: state,
        })),
      });
    }
    if (cityMatches.length > 0) {
      result.push({
        header: 'Cities',
        items: cityMatches.map(city => ({
          type: 'city',
          label: `${city.name}, ${city.stateName}, ${city.countryName}`,
          id: `city-${city.name}-${city.stateIso}-${city.countryIso}`,
          data: city,
        })),
      });
    }
    return result;
  }, [countryMatches, stateMatches, cityMatches]);

  // Create a flat list of all items
  const flatResults = useMemo(() => groups.flatMap(group => group.items), [groups]);

  // Handle item selection
  const handleSelect = (item) => {
    setQuery(item.label);
    setIsSelected(true);
    setActiveIndex(-1);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!flatResults.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev + 1) % flatResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev - 1 + flatResults.length) % flatResults.length);
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(flatResults[activeIndex]);
    }
  };

  // Reset selection state when query changes
  useEffect(() => {
    setIsSelected(false);
    setActiveIndex(-1);
  }, [query]);

  // Render dropdown groups
  let overallIndex = 0;
  const renderedGroups = groups.map(group => (
    <React.Fragment key={group.header}>
      <li className="dropdown-header">{group.header}</li>
      {group.items.map(item => {
        const currentIndex = overallIndex++;
        return (
          <li
            key={item.id}
            className={`dropdown-item-wrapper ${activeIndex === currentIndex ? 'active' : ''}`}
            onMouseEnter={() => setActiveIndex(currentIndex)}
            onClick={() => handleSelect(item)}
          >
            <div className="dropdown-item">{item.label}</div>
          </li>
        );
      })}
    </React.Fragment>
  ));

  return (
    <div className="searchbar">
      <div className="bg-light d-flex justify-content-center align-items-center">
        <div className="position-relative">
          <input
            type="text"
            className="form-control rounded-pill search-bar pe-5"
            placeholder="Search..."
            aria-label="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsSelected(false)}
          />
          <button
            className="btn position-absolute top-50 end-0 translate-middle-y"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>

          {debouncedQuery && !isSelected && (
            <ul
              className="dropdown-menu show"
              style={{
                width: "100%",
                position: "absolute",
                top: "100%",
                left: 0,
                zIndex: 1000,
                maxHeight: "300px",
                overflowY: "auto",
              }}
            >
              {renderedGroups.length > 0 ? renderedGroups : (
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
