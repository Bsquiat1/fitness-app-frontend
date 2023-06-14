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
    
  
    fetch('http://localhost:9292/workouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: selectedExercise,
        sets,
        reps,
        duration,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Workout added successfully!');
          return response.json();
        } else {
          throw new Error('Failed to add workout');
        }
      })
      .then((data) => {
        // Update the workouts state with the added exercise
        setWorkouts([...workouts, data]);
  
        // Reset input values
        setSelectedExercise('')
        setSets(0);
        setReps(0);
        setDuration(0);
      })
      .catch((error) => console.log(error));
  };
  
  
  const handleDeleteWorkout = (exerciseId) => {
    

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
    <div className="workout-planner">
      <h2>Workout Planner</h2>
      <div className="input-group">
        <label>Exercise name:</label>
        <input
          type="text"
          value={selectedExercise}
          onChange={handleExerciseChange}
          placeholder="Enter exercise name"
        />

        <label>Sets:</label>
        <input type="number" value={sets} onChange={handleSetsChange} />
        <label>Reps:</label>
        <input type="number" value={reps} onChange={handleRepsChange} />
        <label>Duration (in minutes):</label>
        <input type="number" value={duration} onChange={handleDurationChange} />
        <button className='btn' onClick={handleAddExercise}>Add Exercise</button>
      </div>
      <h3>Workout Exercises:</h3>
      <ul className="workout-list">
        {workouts.map((workout) => (
          <li key={workout.id}>
            {workout.name} - Sets: {workout.sets}, Reps: {workout.reps}, Duration: {workout.duration} minutes
            <button className='delete-button' onClick={() => handleDeleteWorkout(workout.id)}><span class="X"></span>
  <span class="Y"></span>
  <div class="close">Close</div></button>
          </li>
        ))}
      </ul>
      <button className='delete-all' onClick={handleDeleteAllWorkouts}> Delete all</button>
    </div>
  );
};
export default WorkoutPlanner;
