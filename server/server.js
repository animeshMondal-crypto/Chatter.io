import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import { addUser, removeUser, getUser, getUsersInRoom } from "./users.js";

const app = express();
const httpServer = createServer(app);

app.use(cors());

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  socket.on("join_chat", ({ username, room }) => {
    const user = addUser({ id: socket.id, username, room });

    //join the user to the room
    socket.join(user.room);

    let _createdtime_ = new Date().toLocaleTimeString();
    //to all the members in the room except new joined member
    socket.to(user.room).emit("receive_message", {
      username: "CHAT_BOT",
      message: `${user.username} has joined`,
      _createdtime_,
    });

    //to the newly joined member only
    socket.emit("receive_message", {
      username: "CHAT_BOT",
      message: `${user.username} welcome to room ${user.room}`,
      _createdtime_,
    });

    //get all the room users
    let chatRoomUsers = getUsersInRoom(user.room);

    //send the room users to all the users
    io.in(user.room).emit("chatroom_users", chatRoomUsers);
  });

  socket.on("send_message", (message) => {
    io.in(message.room).emit("receive_message", message);
  });

  socket.on("leave_room", (room) => {
    socket.leave(room);

    const user = removeUser(socket.id);

    if (user) {
      let _createdtime_ = new Date().toLocaleTimeString();
      io.to(user.room).emit("receive_message", {
        username: "CHAT_BOT",
        message: `${user.username} has left the chat!`,
        _createdtime_,
      });
      let chatRoomUsers = getUsersInRoom(user.room);

      io.in(user.room).emit("chatroom_users", chatRoomUsers);
    }
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      let _createdtime_ = new Date().toLocaleTimeString();
      io.to(user.room).emit("receive_message", {
        username: "CHAT_BOT",
        message: `${user.username} has left the chat!`,
        _createdtime_,
      });

      //get all the room users
      let chatRoomUsers = getUsersInRoom(user.room);

      //send the room users to all the users
      io.in(user.room).emit("chatroom_users", chatRoomUsers);
    }
  });
});

httpServer.listen(process.env.PORT, () => {
  console.log(`running on : http://localhost:${process.env.PORT}`);
});
