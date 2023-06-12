import React, { useEffect, useState } from 'react';

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  const [likedExercises, setLikedExercises] = useState([]);

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

  const handleLikeExercise = (exerciseId) => {
    if (likedExercises.includes(exerciseId)) {
      // Unlike exercise
      setLikedExercises(likedExercises.filter((id) => id !== exerciseId));
    } else {
      // Like exercise
      setLikedExercises([...likedExercises, exerciseId]);
    }
  };

  const filteredExercises = selectedBodyPart
    ? exercises.filter((exercise) => exercise.muscle_group === selectedBodyPart)
    : exercises;

  return (
    <div className='exercise-page'>
      <div className="select-container">
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
            <span className="title">{exercise.name}<button
                onClick={() => handleLikeExercise(exercise.id)}
                className={`like-button ${likedExercises.includes(exercise.id) ? 'liked' : ''}`}
              >
                {likedExercises.includes(exercise.id) ? '❤️ ' : '🤍 '}
              </button></span>
            
            <div>
              {/* <strong>{exercise.name}</strong> */}
              <p>{exercise.description}</p>
              <span>Muscle Group: {exercise.muscle_group}</span>
              <img src={exercise.image} alt={exercise.name} />
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exercises;
