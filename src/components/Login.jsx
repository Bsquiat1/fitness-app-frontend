import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
  
    // Prepare the login data
    const loginData = {
      email,
      password,
    };
  
    // Send the login request to the API
    fetch('http://localhost:9292/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        if (response.ok) {
          // Login successful
          console.log('Login successful');
          // Reset the form
          setEmail('');
          setPassword('');
        } else {
          // Login failed
          console.log('Login failed');
          // Handle the login failure, show error message, etc.
        }
      })
      .catch((error) => {
        console.log('Login error:', error);
        // Handle any errors that occurred during login
      });
  };
  
  return (
    <div class="login-box">
      <h2 >Login</h2>
      <form onSubmit={handleLogin}>
        <div class="user-box">
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange}  />
        </div>
        <div class="user-box">
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange}  />
        </div>
        <a href="#">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Login
    </a>
      </form>
      <p>
        Don't have an account?
        <Link to="/register" className="a2">
          Sign up!
        </Link>
      </p>
    </div>
  );
};

export default Login;
