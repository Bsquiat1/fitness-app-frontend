import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import WorkoutPlanner from './components/WorkoutPlanner';
import Exercises from './components/Exercises';
import Login from './components/Login';
import Register from './components/Register';
import SearchBar from './components/Searchbar';
import Navbar from './components/Navbar';
// import MagicMouseComponent from './components/MagicMouseComponent';

const App = () => {
  const [filteredExercises, setFilteredExercises] = useState([]);

  
  return (
    <Router>
      <div className="App">
        {/* <MagicMouseComponent /> */}
        
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workouts" element={<WorkoutPlanner />} />
          <Route path="/exercises" element={<Exercises filteredExercises={filteredExercises} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
