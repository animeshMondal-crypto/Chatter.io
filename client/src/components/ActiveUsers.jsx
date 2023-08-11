import React, { useState, useEffect } from "react";
import "../App.css";

const ActiveUsers = ({ username, room, socket }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("chatroom_users", (users) => {
      setUsers(users);
    });
  }, [socket]);

  return (
    <div className="active-container">
      <div>
        <h1>People Chatting</h1>
        <div className="active-users">
          {users.map((user, index) => (
            <h2 key={index}>
              <div className="active-user">{user.username}</div>
            </h2>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActiveUsers;
