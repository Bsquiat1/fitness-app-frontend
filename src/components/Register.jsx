import React, { useState } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Prepare the registration data
    const registrationData = {
      name,
      email,
      password,
    };

    // Send the registration request to the API
    fetch('http://localhost:9292/register', {
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
          setName('');
          setEmail('');
          setPassword('');
        } else {
          // Registration failed
          console.log('Registration failed');
          // Handle the registration failure, show error message, etc.
        }
      })
      .catch((error) => {
        console.log('Registration error:', error);
        // Handle any errors that occurred during registration
      });
  };

  return (
    <div className="login-box">
      <p>Register</p>
      <form onSubmit={handleRegister}>
        <div className="user-box">
          <input type="text" value={name} onChange={handleNameChange} required />
          <label>Name:</label>
        </div>
        <div className="user-box">
          <input type="email" value={email} onChange={handleEmailChange} required />
          <label>Email:</label>
        </div>
        <div className="user-box">
          <input type="password" value={password} onChange={handlePasswordChange} required />
          <label>Password:</label>
        </div>
        <a href="#">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Register
    </a>
      </form>
    </div>
  );
};

export default Register;
