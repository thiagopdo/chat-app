# Chat App

A simple real-time chat application built with Vite and React. The application leverages Socket.IO for real-time communication, daisyUI for the user interface, Axios for HTTP requests, and Zustand for state management. It uses MongoDB as the database.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- Real-time messaging using Socket.IO
- Responsive UI designed with daisyUI
- State management with Zustand
- RESTful API interactions with Axios
- Persistent storage with MongoDB

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/chat-app.git
   cd chat-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**: Create a `.env` file in the root directory and add your configuration details:
   ```
   MONGODB_URI=your_mongodb_uri
   SOCKET_SERVER_URL=your_socket_server_url
   ```

4. **Run the application**:
   ```bash
   npm run dev
   ```

## Usage

To start chatting, open the application in your browser and enter a username to join a chat room. Type a message and hit Enter to send it instantly via WebSockets.

## Technologies Used

- **Vite**: Fast build tool for modern web projects.
- **React**: JavaScript library for creating user interfaces.
- **Socket.IO**: Enables real-time, bi-directional communication between web clients and servers.
- **daisyUI**: A component library built on Tailwind CSS.
- **Axios**: Promise-based HTTP client for making HTTP requests.
- **Zustand**: Lightweight state management solution.
- **MongoDB**: NoSQL database for storing user messages.



