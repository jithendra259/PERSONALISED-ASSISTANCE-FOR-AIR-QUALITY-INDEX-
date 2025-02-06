// server.js

// Import the required modules.
const express = require('express');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint.
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});


app.post('/ask', async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'No query provided' });
  }

  try {
    const output = `Processed query: ${query}`;
    res.status(200).json({ response: output });
  } catch (error) {
    console.error('Error processing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * Error-handling middleware.
 * This catches any errors in your request handling and returns a JSON error.
 */
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
