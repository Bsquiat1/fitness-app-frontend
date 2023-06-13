import React from 'react';

const Home = () => {
  return (
    <div className="wrapper">
      <div className="heading">
        <h1 className="home-h1">Welcome to Flex Fitness</h1>
        <p className="home-p">Get fit and stay healthy with our workout and exercise tracking app.</p>
      </div>

      <div className="about">
        <h2 className="home-h2">About Us</h2>
        <p className="home-p">
          Flex Fitness is dedicated to helping you achieve your fitness goals. Our app provides a comprehensive solution for tracking your workouts and managing your exercise routine.
        </p>
      </div>

      <div className="features">
        <h2 className="home-h2">Key Features</h2>
        <ul className="home-ul">
          <li className="home-li">Create Custom Workouts: Build personalized workout routines tailored to your specific needs and preferences.</li>
          <li className="home-li">Browse through Exercises: Explore a wide range of exercises and find detailed information on how to perform them correctly.</li>
          {/* Add more key features here */}
        </ul>
      </div>

      <div className="contact">
        <h2 className="home-h2">Contact Us</h2>
        <p className="home-p">
          Connect with us on social media for any questions or feedback:
        </p>
        <ul className="home-ul">
          <li className="home-li">Facebook: <a className="home-a" href="https://www.facebook.com/flexfitness">Flex Fitness</a></li>
          <li className="home-li">Twitter: <a className="home-a" href="https://www.twitter.com/flexfitness">Flex Fitness</a></li>
          <li className="home-li">Instagram: <a className="home-a" href="https://www.instagram.com/flexfitness">Flex Fitness</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
