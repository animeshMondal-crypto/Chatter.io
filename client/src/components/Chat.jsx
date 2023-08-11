import React from "react";
import { useNavigate } from "react-router-dom";
import ActiveUsers from "./ActiveUsers";
import Input from "./Input";
import Messages from "./Messages";
import brandLogo from "../assets/message-code.png";
import "../App.css";

const Chat = ({ username, room, socket }) => {
  const navigate = useNavigate();

  const leaveRoom = () => {
    socket.emit("leave_room", { room });
    navigate("/", { replace: true });
  };
  return (
    <div className="chat-outer">
      <div className="users-wrapper">
        <ActiveUsers username={username} room={room} socket={socket} />
      </div>
      <div className="messages-wrapper">
        <div className="brand">
          <img src={brandLogo} alt="" />
          <h1 className="brand-name">chatter.io</h1>
          <button className="leave-btn" onClick={leaveRoom}>
            Leave Room
          </button>
        </div>
        <Messages username={username} socket={socket} />
        <Input username={username} room={room} socket={socket} />
      </div>
    </div>
  );
};

export default Chat;
