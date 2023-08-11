import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const JoinChat = ({ username, setUsername, room, setRoom, socket }) => {
  const navigate = useNavigate();

  const joinRoom = () => {
    if (room !== "" && username !== "") {
      socket.emit("join_chat", { username, room });
      navigate("/chat", { replace: true });
    }
  };
  return (
    <div className="main">
      <div className="wrapper">
        <h4>chatter.io</h4>
        <div className="inner">
          <input
            type="text"
            placeholder="Name..."
            autoComplete="false"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Room Id..."
            autoComplete="false"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <button className="btn-joinroom" onClick={joinRoom}>
          Join Room
        </button>
      </div>
    </div>
  );
};

export default JoinChat;
