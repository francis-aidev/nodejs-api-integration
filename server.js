const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

/**
 * Simple API Integration Example
 * Demonstrates: Calling an external API, transforming data, returning result
 */

// Example: Get user data from a public API and transform it
app.get('/api/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Step 1: Call external API
    console.log(`Fetching user ${userId} from JSONPlaceholder API...`);
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    
    const userData = response.data;
    
    // Step 2: Transform/enrich the data
    const transformedData = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      company: userData.company?.name || 'N/A',
      // Add more fields as needed
      fetched_at: new Date().toISOString(),
      processing_notes: 'Data transformed and enriched by integration'
    };
    
    // Step 3: Return result
    res.json({
      success: true,
      data: transformedData
    });
    
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Example 2: Get posts from an API and filter them
app.get('/api/posts/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Call API
    console.log(`Fetching posts for user ${userId}...`);
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    
    // Transform data
    const posts = response.data.map(post => ({
      id: post.id,
      title: post.title,
      body: post.body.substring(0, 100) + '...', // Truncate
      userId: post.userId
    }));
    
    res.json({
      success: true,
      count: posts.length,
      data: posts
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Try: http://localhost:${PORT}/api/user/1`);
  console.log(`Try: http://localhost:${PORT}/api/posts/1`);
});