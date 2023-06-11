import React, { useEffect, useState } from 'react';

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState('');

  useEffect(() => {
    // Fetch exercises from the backend
    fetch('http://localhost:9292/exercises')
      .then((response) => response.json())
      .then((data) => setExercises(data))
      .catch((error) => console.log(error));
  }, []);

  const handleBodyPartChange = (e) => {
    setSelectedBodyPart(e.target.value);
  };

  const filteredExercises = selectedBodyPart
    ? exercises.filter((exercise) => exercise.muscle_group === selectedBodyPart)
    : exercises;

  return (
    <div className='exercise-page'>
      <h2>Exercises</h2>
      <div>
        <label>Select Body Part:</label>
        <select value={selectedBodyPart} onChange={handleBodyPartChange}>
          <option value="">All</option>
          <option value="Chest">Chest</option>
          <option value="Legs">Legs</option>
          <option value="Abs">Abs</option>
          <option value="Back">Back</option>
          <option value="Arms">Arms</option>
          <option value="Triceps">Triceps</option>
          <option value="Shoulders">Shoulders</option>
        </select>
      </div>
      
    <div className="container">
      {filteredExercises.map((exercise) => (
        <div className="box" key={exercise.id}>
          <span className="title">{exercise.name}</span>
          <div>
            <strong>{exercise.name}</strong>
            <p>{exercise.description}</p>
            <span>Muscle Group: {exercise.muscle_group}</span>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Exercises;
