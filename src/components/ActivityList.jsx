import React, { useState, useEffect } from 'react';

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define the API endpoint for fetching activities
    const apiUrl = 'http://localhost:5000/api/activities';

    // Use the fetch API to make a GET request
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setActivities(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching activities:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Activity List</h2>
      {loading ? (
        <p>Loading activities...</p>
      ) : (
        <ul>
          {activities.map((activity) => (
            <li key={activity.id}>{activity.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActivityList;
