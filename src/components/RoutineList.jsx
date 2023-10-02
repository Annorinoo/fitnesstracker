import React, { useState, useEffect } from 'react';

const RoutineList = () => {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define the API endpoint for fetching routines
    const apiUrl = 'http://localhost:5000/api/routines';

    // Use the fetch API to make a GET request
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setRoutines(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching routines:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Routine List</h2>
      {loading ? (
        <p>Loading routines...</p>
      ) : (
        <ul>
          {routines.map((routine) => (
            <li key={routine.id}>
              <h3>{routine.name}</h3>
              <p>Goal: {routine.goal}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RoutineList;
