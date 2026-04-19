const fetch = require('node-fetch');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { wonderTitle } = req.body || JSON.parse(req.body || '{}');
    if (!wonderTitle) {
      res.status(400).json({ error: 'wonderTitle is required' });
      return;
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      res.status(500).json({ error: 'Anthropic API key not configured on the server. Please set ANTHROPIC_API_KEY in Vercel project settings.' });
      return;
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
      res.status(response.status).json({ error: errorData.error?.message || 'Failed to generate description' });
      return;
    }

    const data = await response.json();
    const description = data.content[0].text;
    res.status(200).json({ description });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
