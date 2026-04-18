# Humber Project
Web Fundamentals project

# Project Pitch/Proposal
Name - World of Wonders
About the project -- 
World of Wonders is a simple website that showcases the seven wonders of the world. It has three pages. A main landing page, a search and filter page and a Information page. User can see the list of wonders, search by name and also get detailed information about each wonder in the description page.

## Project Overview

World of Wonders is an interactive web application designed to educate and inspire users about the Seven Wonders of the World. The project features a modern, responsive interface built with HTML, CSS, and JavaScript, allowing users to browse, search, and explore detailed information about each wonder. The application integrates an AI-powered backend that generates rich, informative descriptions for each wonder using the Anthropic API, providing users with unique and engaging content every time.

The site is structured with three main pages: a visually appealing landing page, a search and filter page for easy navigation, and a dedicated information page for each wonder. Users can search wonders by name, view images, and access AI-generated descriptions that cover history, significance, architecture, and cultural impact. The backend is powered by Node.js and Express, serving both static assets and dynamic API requests.

This project demonstrates the integration of modern frontend techniques with AI-driven content generation, offering a seamless and educational user experience. It is suitable for students, educators, and anyone interested in world history and architecture.

## Development Challenge

One significant challenge faced during development was ensuring compatibility between the frontend's API requests and the Anthropic backend models. The Anthropic API frequently updates its model names and access requirements, which led to repeated errors such as 'model not found' or 'invalid model'. Resolving this required careful reading of the Anthropic documentation, testing multiple model versions, and handling errors gracefully in both the backend and frontend to ensure a smooth user experience even when the AI service changed or was temporarily unavailable.

## Deployment Strategy: Vercel

To deploy the World of Wonders project using Vercel, follow these steps:

1. **Prepare the Project:**
   - Ensure all dependencies are listed in `package.json` and your project runs correctly with `npm start`.
   - Move your Express server code to an `api` directory as a serverless function, or use Vercel's Node.js support for backend APIs.
   - Make sure your frontend files (`index.html`, `style.css`, `script.js`, etc.) are in the root or a `public` directory.

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com/) and sign up or log in.
   - Click **New Project** and import your GitHub/GitLab/Bitbucket repository containing the project.
   - Follow the prompts to configure the project. Set the build command to `npm install` and the output directory to `public` (if using a `public` folder).

3. **Configure Environment Variables:**
   - In the Vercel dashboard, go to your project settings and add your `ANTHROPIC_API_KEY` as an environment variable.

4. **Deploy:**
   - Click **Deploy**. Vercel will build and deploy your project automatically.
   - After deployment, your site will be live at a Vercel-provided URL (e.g., `https://your-project-name.vercel.app`).

**Note:** If you need backend API routes, place your Express logic in the `api` directory as serverless functions, since Vercel does not support running a persistent Node.js server. For more advanced backend needs, consider using Vercel in combination with other backend services or platforms.

## Local vs Vercel Deployment

- **Local Development:**
  - Run `npm start` to launch the Express server (server.js or api/index.js).
  - All static files and API routes (like `/api/generate-description`) are handled by Express on `http://localhost:3000`.
  - Use this mode for development and testing on your machine.

- **Vercel Deployment:**
  - The Express server is not used. Instead, API endpoints are implemented as serverless functions (e.g., `api/generate-description.js`).
  - Static files are served by Vercel, and API requests are routed to the appropriate serverless function.
  - Use the Vercel CLI (`vercel dev`) if you want to simulate the Vercel environment locally.

**Note:** The codebase supports both local Express development and Vercel serverless deployment for flexibility and ease of testing.

