import React, { useState, useEffect } from 'react';

const WorkoutPlanner = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [duration, setDuration] = useState(0);
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9292/workouts')
      .then((response) => response.json())
      .then((data) => setWorkouts(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
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

      fetch('http://localhost:9292/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exerciseWithDetails),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Workout added successfully!');
          
        })
        .catch((error) => console.log(error));
    }
  };

  const handleDeleteWorkout = (exerciseId) => {
    const updatedWorkouts = workouts.filter((exercise) => exercise.id !== exerciseId);
    setWorkouts(updatedWorkouts);

    fetch(`http://localhost:9292/workouts/${exerciseId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Workout deleted successfully!');
        
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteAllWorkouts = () => {
    setWorkouts([]);

    fetch('http://localhost:9292/workouts', {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('All workouts deleted successfully!');
        
      })
      .catch((error) => console.log(error));
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
            <button onClick={() => handleDeleteWorkout(exercise.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={handleDeleteAllWorkouts}>Delete All</button>
    </div>
  );
};

export default WorkoutPlanner;
