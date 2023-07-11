import React, { useState, useEffect } from 'react';

const WorkoutPlanner = ({ user }) => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [duration, setDuration] = useState(0);
  const [workouts, setWorkouts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState(null);

  useEffect(() => {
    fetch('/workouts')
      .then((response) => response.json())
      .then((data) => setWorkouts(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch('/exercises')
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
    setShowModal(true);
    setEditingWorkout(null);
  };

  const handleEditWorkout = (workout) => {
    setShowModal(true);
    setEditingWorkout(workout);
    setSelectedExercise(workout.name);
    setSets(workout.sets);
    setReps(workout.reps);
    setDuration(workout.duration);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingWorkout(null);
    setSelectedExercise('');
    setSets(0);
    setReps(0);
    setDuration(0);
  };

  const handleModalSubmit = () => {
    const newWorkout = {
      name: selectedExercise,
      sets,
      reps,
      duration,
    };

    if (editingWorkout) {
      // Update existing workout
      fetch(`/workouts/${editingWorkout.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newWorkout),
      })
        .then((response) => {
          if (response.ok) {
            console.log('Workout updated successfully!');
            return response.json();
          } else {
            throw new Error('Failed to update workout');
          }
        })
        .then((data) => {
          setWorkouts(
            workouts.map((workout) => (workout.id === editingWorkout.id ? data : workout))
          );
          setShowModal(false);
          setSelectedExercise('');
          setSets(0);
          setReps(0);
          setDuration(0);
        })
        .catch((error) => console.log(error));
    } else {
      
      fetch('/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newWorkout),
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
          setWorkouts([...workouts, data]);
          setShowModal(false);
          setSelectedExercise('');
          setSets(0);
          setReps(0);
          setDuration(0);
        })
        .catch((error) => console.log(error));
    }
  };

  const handleDeleteWorkout = (workoutId) => {
    fetch(`/workouts/${workoutId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Workout deleted successfully!');
        setWorkouts(workouts.filter((workout) => workout.id !== workoutId));
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteAllWorkouts = () => {
    fetch('/workouts', {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('All workouts deleted successfully!');
        setWorkouts([]);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="workout-planner">
      {user && <h2>{user.username}'s Workout Planner</h2>}
      <div className="input-group">
        <div className="button-container">
          <button className="btn" onClick={handleAddExercise}>
            Add Exercise
          </button>
        </div>
      </div>
      <h3>Workout Exercises:</h3>
      <ul className="workout-list">
        {workouts.map((workout) => (
          <li key={workout.id}>
            {workout.name} - Sets: {workout.sets}, Reps: {workout.reps}, Duration: {workout.duration} minutes
            <button className="edit-button" onClick={() => handleEditWorkout(workout)}>
            <i className="fas fa-edit"></i>
            </button>
            <button className="delete-button" onClick={() => handleDeleteWorkout(workout.id)}>
              <span className="X"></span>
              <span className="Y"></span>
              <div className="close">Close</div>
            </button>
          </li>
        ))}
      </ul>
      <button className="delete-all" onClick={handleDeleteAllWorkouts}>
        Delete all
      </button>

      {showModal && (
        <div className="modal">
          <div className="card">
            <h4>Add Exercise</h4>
            <label>Exercise name:</label>
            <input type="text" value={selectedExercise} onChange={handleExerciseChange} />
            <label>Sets:</label>
            <input type="number" value={sets} onChange={handleSetsChange} />
            <label>Reps:</label>
            <input type="number" value={reps} onChange={handleRepsChange} />
            <label>Duration (in minutes):</label>
            <input type="number" value={duration} onChange={handleDurationChange} />
            <button onClick={handleModalClose}>Cancel</button>
            <button onClick={handleModalSubmit}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutPlanner;
