import React, { useState, useEffect } from 'react';

const WorkoutPlanner = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [duration, setDuration] = useState(0);
  const [workouts, setWorkouts] = useState([]);
  const [workoutId, setWorkoutId] = useState(null);

  useEffect(() => {
    
    fetch('http://localhost:9292/workouts')
      .then((response) => response.json())
      .then((data) => setWorkouts(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
     
      fetch('http://localhost:9292/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Workout posted successfully!');
          // Handle any further actions after posting the workout
        })
        .catch((error) => console.log(error));
    
  }, []);
  


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
  
      setWorkouts([...workouts, exerciseWithDetails]);
      setSelectedExercise('');
      setSets(0);
      setReps(0);
      setDuration(0);
  
      if (!workoutId) {
        // Generate a workout ID
        const newWorkoutId = Math.floor(Math.random() * 1000);
        setWorkoutId(newWorkoutId);
      }
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
        {workouts.map((exercise) => (
          <li key={exercise.id}>
            {exercise.name} - Sets: {exercise.sets}, Reps: {exercise.reps}, Duration: {exercise.duration} seconds
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutPlanner;
