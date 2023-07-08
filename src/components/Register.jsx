import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password_digest, setPassword_digest] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword_digestChange = (e) => {
    setPassword_digest(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Prepare the registration data
    const registrationData = {
      username,
      email,
      password_digest,
    };

    // Send the registration request to the API
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    })
      .then((response) => {
        if (response.ok) {
          // Registration successful
          console.log('Registration successful');
          // Reset the form
          setUsername('');
          setEmail('');
          setPassword_digest('');
          // Navigate to the login page
          navigate('/login');
        } else {
          // Registration failed
          console.log('Registration failed');
          setErrorMessage('Registration failed. Please try again.');
        }
      })
      .catch((error) => {
        console.log('Registration error:', error);
        setErrorMessage('An error occurred during registration.');
      });
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <div className="login-box">
          <p>Register</p>
          <form onSubmit={handleRegister}>
            <div className="user-box">
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                required
              />
              <label>Name:</label>
            </div>
            <div className="user-box">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <label>Email:</label>
            </div>
            <div className="user-box">
              <input
                type="password"
                value={password_digest}
                onChange={handlePassword_digestChange}
                required
              />
              <label>Password:</label>
            </div>
            <a href="#" onClick={handleRegister}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Register
            </a>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <p>
            Already have an account?{' '}
            <Link to="/login" className="a2">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
