const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for cross-origin requests

// Define API routes
app.use('/api/routines', require('./routes/routines')); // Example: maps to /api/routines
app.use('/api/activities', require('./routes/activities')); // Example: maps to /api/activities

// Other middleware and route handling can go here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
