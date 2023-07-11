import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import SearchBar from './Searchbar';

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("/logout", {
      method: "DELETE",
    })
      .then(() => {
        onLogout();
        navigate("/login");
      })
      .catch((error) => {
        console.log("Logout error:", error);
      });
  };

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
        <li className="navbar-li">
          <button onClick={handleLogout} className="navbar-link">Logout</button>
        </li>
      </ul>
      <SearchBar />
    </nav>
  );
};

export default Navbar;
