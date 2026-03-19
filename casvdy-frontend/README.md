# CASVDY Professional AI Assistant

A full-stack, AI-powered chatbot designed for the College of Applied Science, Vadakkencherry (CASVDY) website. 

This project demonstrates a modern client-server architecture, utilizing a React.js frontend and a Python/Flask backend integrated with Google's Gemini AI.

## Architecture
* **Frontend:** React.js (Vite)
* **Backend:** Python (Flask, Flask-CORS)
* **AI Model:** Google Gemini 2.5 Flash

## Prerequisites
To run this project locally, you will need:
* Node.js installed
* Python installed
* A free Google Gemini API Key

## How to Run the Project

### 1. Setup the Backend (Python)
1. Open a terminal in the root folder.
2. Install the required Python libraries:
   `pip install flask flask-cors google-generativeai`
3. Open `app.py` and paste your Gemini API key where it says `"YOUR_API_KEY_HERE"`.
4. Start the backend server:
   `python app.py`
*(The server will run on http://127.0.0.1:5000)*

### 2. Setup the Frontend (React)
1. Open a **second** terminal and navigate to the frontend folder:
   `cd casvdy-frontend`
2. Install the Node dependencies:
   `npm install`
3. Start the React development server:
   `npm run dev`
4. Open the provided `localhost` link in your browser to interact with the bot!