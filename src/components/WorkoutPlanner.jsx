import React, { useState, useEffect } from 'react';

const WorkoutPlanner = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [duration, setDuration] = useState(0);
  const [workoutExercises, setWorkoutExercises] = useState([]);

  useEffect(() => {
    // Fetch exercises from the backend
    fetch('http://localhost:9292/exercises')
      .then((response) => response.json())
      .then((data) => setExercises(data))
      .catch((error) => console.log(error));
  }, []);

  const handleExerciseChange = (e) => {
    setSelectedExercise(e.target.value);
  };

  const handleSetsChange = (e) => {
    setSets(parseInt(e.target.value, 10));
  };

  const handleRepsChange = (e) => {
    setReps(parseInt(e.target.value, 10));
  };

  const handleDurationChange = (e) => {
    setDuration(parseInt(e.target.value, 10));
  };

  const handleAddExercise = () => {
    const exerciseToAdd = exercises.find((exercise) => exercise.id === selectedExercise);
    if (exerciseToAdd) {
      const exerciseWithDetails = {
        ...exerciseToAdd,
        sets,
        reps,
        duration,
      };
      setWorkoutExercises([...workoutExercises, exerciseWithDetails]);
      setSelectedExercise('');
      setSets(0);
      setReps(0);
      setDuration(0);
    }
  };

  return (
    <div>
      <h2>Workout Planner</h2>
      <div>
        <label>Select Exercise:</label>
        <select value={selectedExercise} onChange={handleExerciseChange}>
          <option value="">Select an exercise</option>
          {exercises.map((exercise) => (
            <option key={exercise.id} value={exercise.id}>
              {exercise.name}
            </option>
          ))}
        </select>
        <label>Sets:</label>
        <input type="number" value={sets} onChange={handleSetsChange} />
        <label>Reps:</label>
        <input type="number" value={reps} onChange={handleRepsChange} />
        <label>Duration (in seconds):</label>
        <input type="number" value={duration} onChange={handleDurationChange} />
        <button onClick={handleAddExercise}>Add Exercise</button>
      </div>
      <h3>Workout Exercises:</h3>
      <ul>
        {workoutExercises.map((exercise) => (
          <li key={exercise.id}>
            {exercise.name} - Sets: {exercise.sets}, Reps: {exercise.reps}, Duration: {exercise.duration} seconds
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutPlanner;
