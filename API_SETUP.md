# World of Wonders - Anthropic API Setup Guide

## Overview
This project uses a Node.js/Express backend server to securely communicate with the Anthropic API. The backend acts as a proxy to avoid CORS issues and keeps your API key secure.

## Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)
- Anthropic API key

## Setup Steps

### 1. Get an Anthropic API Key
- Visit https://console.anthropic.com/
- Sign up or log in to your account
- Generate an API key from the API settings
- Copy your API key (it starts with `sk-ant-`)

### 2. Configure the API Key
1. Open the `.env` file in the project root
2. Replace `your_api_key_here` with your actual API key:
```
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
```
3. Save the file

### 3. Install Dependencies
Open a terminal in the project folder and run:
```bash
npm install
```

This will install Express, CORS, and dotenv.

### 4. Start the Backend Server
In the same terminal, run:
```bash
npm start
```

You should see:
```
Server running at http://localhost:3000
API endpoint: http://localhost:3000/api/generate-description
```

### 5. Open the Website
1. In VS Code, right-click on `index.html`
2. Select "Open with Live Server" (or use your preferred method)
3. The website will open (usually at `http://127.0.0.1:5500` or similar)

### 6. Test the Feature
1. Go to the Home page
2. Click "View Wonder" on any wonder card
3. Wait for the AI-generated description to load
4. You'll be redirected to the Description page with the AI response

## Troubleshooting

### "Backend server not running" error
- Make sure you've run `npm start` in a terminal
- The terminal should show "Server running at http://localhost:3000"
- Keep this terminal window open while using the website

### CORS error in browser console
- This means the backend server is not running
- Open a new terminal and run `npm start`

### "Anthropic API key not configured on the server" error
- Check that your `.env` file exists and has the correct API key
- Make sure there are no extra spaces or quotes around the key
- Restart the server after editing the `.env` file

### "Cannot find module" error
- Run `npm install` to install all dependencies
- Make sure you're in the correct project directory

## File Structure
```
WorldOfWonders/
├── index.js           (Backend server - runs on port 3000)
├── package.json        (Node.js dependencies)
├── .env               (Contains ANTHROPIC_API_KEY - KEEP SECRET)
├── index.html         (Home page)
├── search.html        (Search page)
├── description.html   (Description page)
├── script.js          (Frontend JavaScript)
└── style.css          (Styling)
```

## Security Notes
- **Never commit the `.env` file to version control**
- Add `.env` to your `.gitignore` file if using Git
- Never share your API key with anyone
- The API key is only used on the backend server, not sent to the browser
- In production, use environment variables or a secrets manager

## Testing the API Endpoint
You can test the backend directly using curl:
```bash
curl -X POST http://localhost:3000/api/generate-description \
  -H "Content-Type: application/json" \
  -d '{"wonderTitle": "Taj Mahal"}'
```

## API Rate Limits
The Anthropic API has rate limits based on your account tier. Check https://console.anthropic.com/ for your limits.

## Support
- Anthropic API docs: https://docs.anthropic.com/
- Express docs: https://expressjs.com/

