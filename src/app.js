const express = require('express');
const bodyParser = require('body-parser');

// Import routes for handling question-related endpoints
const questionRoutes = require('./routes/questionRoutes');

const app = express();

// Middleware to parse JSON request bodies
// This allows us to handle JSON data sent in requests
app.use(bodyParser.json());

// Middleware to use routes defined in questionRoutes
app.use('/api/questions', questionRoutes);

// Defining the port to listen on, defaulting to 3000 if not specified in environment variables
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
