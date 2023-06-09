import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="navbar relative" style={styles.navbar}>
      
      <ul style={styles.ul}>
        <li style={styles.li}>
          <Link to="/" style={styles.link}>Home</Link>
        </li>
        <li style={styles.li}>
          <Link to="/workouts" style={styles.link}>Workouts</Link>
        </li>
        <li style={styles.li}>
          <Link to="/exercises" style={styles.link}>Exercises</Link>
        </li>
        <li style={styles.li}>
          <Link to="/login" style={styles.link}>Login</Link>
        </li>
        <li style={styles.li}>
          <Link to="/register" style={styles.link}>Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

const styles = {
  navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
  },
  ul: {
    display: 'flex',
    listStyle: 'none',
  },
  li: {
    marginLeft: '1rem',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
  },
};
