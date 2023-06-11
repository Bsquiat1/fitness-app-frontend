import React, { useState } from 'react';

const SearchBar = ({ onClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const handleSearch = () => {
    const searchQuery = searchTerm.trim().toLowerCase();
    if (searchQuery) {
      // Make your API request here with the appropriate URL and query parameters
      fetch(`http://localhost:9292/exercises?search=${searchQuery}`)
        .then(response => response.json())
        .then(data => {
          const filteredExercises = data.results; 
          onClick(filteredExercises); 
        });
    }
  };

  return (
    <div className="containers">
      <input
        
        required
        className="input"
        name="text"
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <div className="icon">
        <svg
          viewBox="0 0 512 512"
          className="ionicon"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Search</title>
          <path
            strokeWidth="32"
            strokeMiterlimit="10"
            stroke="currentColor"
            fill="none"
            d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
          ></path>
          <path
            d="M338.29 338.29L448 448"
            strokeWidth="32"
            strokeMiterlimit="10"
            strokeLinecap="round"
            stroke="currentColor"
            fill="none"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;
