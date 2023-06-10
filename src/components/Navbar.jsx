import React from 'react';
import { Link } from 'react-router-dom';

import SearchBar from './Searchbar';

const Navbar = () => {
  return (
    <nav className="navbar relative">
      <div className="navbar-header">
        <h1 className="navbar-header-text">FLEX</h1>
      </div>
      <ul className="navbar-ul">
        <li className="navbar-li">
          <Link to="/" className="navbar-link">Home</Link>
        </li>
        <li className="navbar-li">
          <Link to="/workouts" className="navbar-link">Workouts</Link>
        </li>
        <li className="navbar-li">
          <Link to="/exercises" className="navbar-link">Exercises</Link>
        </li>
        <li className="navbar-li">
          <Link to="/login" className="navbar-link">Login</Link>
        </li>
        <li className="navbar-li">
          <Link to="/register" className="navbar-link">Register</Link>
        </li>
      </ul>
      <SearchBar />
    </nav>
  );
};

export default Navbar;
