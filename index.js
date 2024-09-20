require('dotenv').config(); // Load environment variables

// Log the API key to verify it's loaded correctly
console.log('API Key:', process.env.RAPIDAPI_KEY);

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for frontend-backend communiacation
app.use(bodyParser.json()); // To parse incoming JSON request bodies
app.use(express.static(path.join(__dirname, 'public')));

// Route for summarization - Proxy to external API
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})
app.get('/login', (req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
})

app.get('/signup', (req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
})

app.post('/summarize', async (req, res) => {
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
        return res.status(400).json({ error: 'Text is required for summarization.' });
    }

    const apiUrl = 'https://gemini-pro-ai.p.rapidapi.com/';
   
    const options = {
        method: 'POST',
        url: 'https://gemini-pro-ai.p.rapidapi.com/',
        headers: {
          'x-rapidapi-key': 'process.RAPID_API KEY',
          'x-rapidapi-host': 'gemini-pro-ai.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          contents: [
            {
              role: 'user',
              parts: [{text: 'Hello'}]
            }
          ]
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log(response.data);
      } catch (error) {
          console.error(error);
      }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
