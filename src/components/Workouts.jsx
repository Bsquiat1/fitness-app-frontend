import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    // Fetch workouts from the backend
    fetch('http://localhost:9292/workouts')
      .then((response) => response.json())
      .then((data) => setWorkouts(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h2>Workouts</h2>
      <ul>
        {workouts.map((workout) => (
          <li key={workout.id}>
            <h3>Date: {workout.date}</h3>
            <p>Duration: {workout.duration} minutes</p>
            <p>Exercises: {workout.exercises.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Workouts;
