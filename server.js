const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the current directory
app.use(express.static('.'));

/**
 * POST /api/generate-description
 * Receives wonder title and calls Anthropic API
 * Returns the generated description
 */
app.post('/api/generate-description', async (req, res) => {
    try {
        const { wonderTitle } = req.body;
        
        if (!wonderTitle) {
            return res.status(400).json({ error: 'wonderTitle is required' });
        }
        
        const apiKey = process.env.ANTHROPIC_API_KEY;
        
        if (!apiKey) {
            return res.status(500).json({ 
                error: 'Anthropic API key not configured on the server. Please set ANTHROPIC_API_KEY in .env file.' 
            });
        }
        
        const prompt = `Provide a detailed and informative description of ${wonderTitle}. Include its history, significance, architecture/structure, location, and why it's considered a wonder of the world. Keep it to 2-3 paragraphs.`;
        
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-opus-4-6',
                max_tokens: 1024,
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ]
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Anthropic API error:', errorData);
            return res.status(response.status).json({ 
                error: errorData.error?.message || 'Failed to generate description' 
            });
        }
        
        const data = await response.json();
        const description = data.content[0].text;
        
        res.json({ description });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`API endpoint: http://localhost:${PORT}/api/generate-description`);
});
