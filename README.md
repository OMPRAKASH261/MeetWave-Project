# MeetWave

MeetWave is a real-time video calling and collaboration app built with React on the frontend and Express + Socket.IO on the backend. It supports user registration/login, meeting links, live WebRTC video/audio sessions, in-call chat, and meeting history tracking.

## Features

- User authentication with username/password
- Meeting join flow using a meeting code or URL slug
- Real-time video and audio calls using WebRTC
- Socket-based signaling and chat messaging
- Meeting history tracking for logged-in users
- Responsive UI with Material UI
- Guest join capability from the landing page

## Tech Stack

Frontend
- React
- React Router
- Material UI
- Axios
- WebRTC
- Socket.IO client

Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Socket.IO
- bcrypt for password hashing
- dotenv for environment configuration

## Project Structure

```text
MeetWave/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── controllers/
│   │   │   ├── socketManager.js
│   │   │   └── user.controller.js
│   │   ├── models/
│   │   │   ├── meeting.model.js
│   │   │   └── user.model.js
│   │   └── routes/
│   │       └── users.routes.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
├── package.json
├── README.md
└── .gitignore
```

## Prerequisites

Before running the project, make sure you have:

- Node.js 18+ installed
- MongoDB running locally or a MongoDB Atlas connection string
- npm or yarn

## Environment Setup

### Backend
Create a `.env` file inside the `backend/` folder:

```env
PORT=8000
MONGO_URL=mongodb://127.0.0.1:27017/meetwave
```

If you are using MongoDB Atlas, replace the value with your Atlas connection string.

### Frontend local configuration
The frontend uses `frontend/src/environment.js` to determine which backend URL to call.

Open the file and ensure local development uses the local backend:

```js
let IS_PROD = false;
const server = IS_PROD ?
  "https://meetwavebackend.onrender.com" :
  "http://localhost:8000";
```

If you want to use the production deployment instead, leave it as `true`.

## Installation

1. Clone the repository

```bash
git clone https://github.com/OMPRAKASH261/MeetWave-Project.git
cd MeetWave-Project
```

2. Install backend dependencies

```bash
cd backend
npm install
```

3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

## Running the Application

### Start the backend

```bash
cd backend
npm run dev
```

The backend will run on:

- http://localhost:8000

### Start the frontend

```bash
cd frontend
npm start
```

The frontend will run on:

- http://localhost:3000

## API Endpoints

The backend exposes the following user routes under `/api/v1/users`:

- `POST /api/v1/users/register` — register a new user
- `POST /api/v1/users/login` — authenticate a user and return a token
- `POST /api/v1/users/add_to_activity` — add a meeting code to user's history
- `GET /api/v1/users/get_all_activity` — fetch a user's meeting history

Example request payload for registration:

```json
{
  "name": "John Doe",
  "username": "johndoe",
  "password": "securepassword"
}
```

Example login payload:

```json
{
  "username": "johndoe",
  "password": "securepassword"
}
```

## How It Works

1. A user signs up or logs in from the React frontend.
2. The server validates credentials and stores a token in MongoDB.
3. The user enters a meeting code and joins a call room.
4. The frontend connects to Socket.IO and uses signaling messages to establish WebRTC peer connections.
5. Remote users exchange video/audio streams and chat messages in real time.
6. Meeting codes are stored in MongoDB so the user can view their recent call history.

## Notes

- STUN servers are used for NAT traversal in WebRTC connections.
- The project currently uses Google STUN for peer discovery in the browser.
- For production, consider adding TLS, environment-based secrets, rate limiting, and stronger auth/session handling.

## Useful Commands

```bash
# Backend
cd backend
npm run dev
npm run start

# Frontend
cd frontend
npm start
npm run build
```

## License

This project is for educational and personal use. Add a license if you plan to distribute it publicly.

## Credits

- UI design inspiration and branding support from available web resources.
- WebRTC and Socket.IO are used for live communication and signaling.

## Future Improvements

- Add JWT-based authentication instead of token storage in MongoDB
- Add room creation and host controls
- Add screen sharing/call controls improvements
- Implement meeting recording and file sharing
- Add better error handling and validation
- Improve security with input sanitization and rate limiting
