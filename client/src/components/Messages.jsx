import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import "../App.css";

const Messages = ({ username, socket }) => {
  const [resievedMessages, setResievedMessages] = useState([]);
  const messageContainerRef = useRef(null);

  useEffect(() => {
    socket.on("receive_message", (message) => {
      setResievedMessages((messages) => [
        ...messages,
        {
          username: message.username,
          message: message.message,
          _createdtime_: message._createdtime_,
        },
      ]);
    });
  }, [socket]);

  //for scroll to current message
  useEffect(() => {
    messageContainerRef.current.scrollTop =
      messageContainerRef.current.scrollHeight;
  }, [resievedMessages]);

  return (
    <div className="messages-container" ref={messageContainerRef}>
      <Message username={username} messages={resievedMessages} />
    </div>
  );
};

export default Messages;
