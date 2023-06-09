import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import Workouts from './components/Workouts';
import Exercises from './components/Exercises';
import Login from './components/Login';
import Register from './components/Register';
import SearchBar from './components/Searchbar';
import Navbar from './components/Navbar';

const App = () => {
  const [filteredExercises, setFilteredExercises] = useState([]);

  const handleSearch = (filteredExercises) => {
    setFilteredExercises(filteredExercises);
  };

  return (
    <Router>
      <div className="App">
        
        <Navbar />
        <SearchBar onclick={handleSearch} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/exercises" element={<Exercises filteredExercises={filteredExercises} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
