# Talkie

A modern real-time chat application with support for text, image, and video messaging. Built with a full-stack JavaScript architecture.

## Hosting Link

[Live Demo](<your-hosting-link-here>)

## Tech Stack

- **Frontend:** React, Redux, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js, Socket.IO, Multer
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT, Cookies

## Features

- User authentication (signup, login, logout)
- Real-time messaging with Socket.IO
- Send and receive text messages
- Send and receive images and videos (one file per message)
- User presence/online status
- Responsive UI with modern design
- Search and select users to chat
- Cloudy/pastel chat background for a pleasant experience

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd talkie
   ```
2. Install dependencies for both frontend and backend:
   ```sh
   cd backend
   npm install
   cd ../frontend
   npm install
   ```
3. Set up environment variables:
   - In `backend/.env`, add:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```
4. Start the backend:
   ```sh
   cd backend
   npm start
   ```
5. Start the frontend:
   ```sh
   cd frontend
   npm start
   ```

## Folder Structure

- `backend/` - Express server, API routes, Socket.IO, MongoDB models
- `frontend/` - React app, Redux store, UI components

## Functionality

- **Authentication:** Secure user registration and login with JWT and cookies.
- **Real-time Chat:** Instant messaging using Socket.IO.
- **Media Support:** Upload and send images/videos (one per message) using Multer and static file serving.
- **User List:** See and search other users, select to start a chat.
- **Modern UI:** Responsive, clean, and visually appealing interface with pastel backgrounds.

## License

MIT
