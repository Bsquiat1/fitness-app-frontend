import React from 'react';


const Home = () => {
  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={headerTextStyle}>Flex</h1>
      </header>
      
      <div style={contentStyle}>
        <h1>Welcome to Flex Fitness</h1>
        <p>Get fit and stay healthy with our workout and exercise tracking app.</p>
      </div>
    </div>
  );
};

// Define the styles
const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const headerStyle = {
  background: '#f8f8f8',
  padding: '20px',
  textAlign: 'center',
};

const headerTextStyle = {
  fontSize: '48px',
  fontFamily: 'Old English Text MT, serif',
};

const contentStyle = {
  textAlign: 'center',
};

export default Home;
