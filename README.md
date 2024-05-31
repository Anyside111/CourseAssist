# CourseAssist AI

## Overview
CourseAssist AI is a platform designed to help students with course-related questions using an AI-powered assistant. It features functionality for handling and uploading course materials, as well as interacting with an AI for educational support.

## Technologies
- React.js
- Node.js with Express
- PostgreSQL
- OpenAI API

## Setup
1. **Clone the repository**
git clone https://example.com/CourseAssist_AI.git
cd CourseAssist_AI


2. **Install dependencies**
- Frontend:
  ```
  cd frontend
  npm install
  ```
- Backend:
  ```
  cd backend
  npm install
  ```

3. **Set up environment variables**
- Add a `.env` file in the backend directory:
  ```
  OPENAI_API_KEY=<your_openai_api_key>
  DATABASE_URL=<your_postgres_database_url>
  ```

4. **Run the application**
- Backend server:
  ```
  node server.js
  ```
- Frontend:
  ```
  npm start
  ```

## Usage
Access the web interface at `http://localhost:3001/ai-tutor` to interact with the AI tutor. It will return the response returned by the ollama model.
Access the web interface at `http://localhost:3001/course-materials` to manage course materials.

## Contributing
Contributions are welcome! Please ensure you adhere to the contributing guidelines outlined in `CONTRIBUTING.md`.

