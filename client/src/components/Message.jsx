import React from "react";
import "../App.css";

const Message = ({ username, messages }) => {
  return (
    <div className="messages">
      {messages.map((message, idx) =>
        message.username === username ? (
          <div className="msg send" key={idx}>
            <h5 className="name">{message.username}</h5>
            <p>{message.message}</p>
            <h5 className="time">{message._createdtime_}</h5>
          </div>
        ) : (
          <div className="msg receive" key={idx}>
            <h5 className="name">{message.username}</h5>
            <p>{message.message}</p>
            <h5 className="time">{message._createdtime_}</h5>
          </div>
        )
      )}
    </div>
  );
};

export default Message;
