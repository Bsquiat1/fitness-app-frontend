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
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister} style={styles.form}>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Name:</label>
          <input type="text" value={name} onChange={handleNameChange} style={styles.input} />
        </div>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} style={styles.input} />
        </div>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} style={styles.input} />
        </div>
        <button type="submit" style={styles.button}>Register</button>
      </form>
    </div>
  );
};

export default Register;

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '300px',
    margin: '0 auto',
  },
  inputContainer: {
    marginBottom: '1rem',
  },
  label: {
    marginBottom: '0.5rem',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

