import React from "react";
import { useState } from "react";
import "../App.css";

const Input = ({ username, room, socket }) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message !== "") {
      const _createdtime_ = new Date().toLocaleTimeString();
      socket.emit("send_message", { username, room, message, _createdtime_ });
      setMessage("");
    }
  };

  return (
    <div className="input-container">
      <input
        className="message-input"
        placeholder="Write a message..."
        autoFocus
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="send-btn" onClick={sendMessage}>
        send
      </button>
    </div>
  );
};

export default Input;
