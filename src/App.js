
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import WorkoutPlanner from './components/WorkoutPlanner';
import Exercises from './components/Exercises';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';


const App = () => {
  
  

  
  return (
    <Router>
      <div className="App">
        
        
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workouts" element={<WorkoutPlanner />} />
          <Route path="/exercises" element={<Exercises  />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
