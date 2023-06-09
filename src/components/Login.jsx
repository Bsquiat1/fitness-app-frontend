import React, { useState } from 'react';

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
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} style={{ width: '100%', padding: '5px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} style={{ width: '100%', padding: '5px' }} />
        </div>
        <button type="submit" style={{ padding: '10px', backgroundColor: 'blue', color: 'white', border: 'none' }}>Login</button>
      </form>
    </div>
  );
};

export default Login;
