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

