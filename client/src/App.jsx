import { io } from "socket.io-client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JoinChat from "./components/JoinChat";
import Chat from "./components/Chat";
import "./App.css";
import { useState } from "react";

const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};

const socket = io("http://localhost:5000", connectionOptions);

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <JoinChat
                username={username}
                setUsername={setUsername}
                room={room}
                setRoom={setRoom}
                socket={socket}
              />
            }
          />
          <Route
            path="/chat"
            element={<Chat username={username} room={room} socket={socket} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
