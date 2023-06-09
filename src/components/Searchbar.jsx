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
          const filteredExercises = data.results; // Adjust this based on your API response
          onClick(filteredExercises); // Pass the filtered exercises to the parent component
        });
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search exercises..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
