// this is a simple node.js server using Express.js
// it returns a JSON object when you visit localhost:4000

const express = require('express');
const app = express();
const PORT = 4000;

//New imports to allow data transfer between the client and the server domains
const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());

// use socketIO to allow real-time connection
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

let users = [];

socketIO.on('connection', (socket) => {
  console.log(`${socket.id} user just connected!`);

  //when a user sends a message, sent it to all others 
  socket.on('message', (data) => {
    socketIO.emit('messageResponse', data);
  });

  //when a user connects, add them to the users array and send it to all others 
  socket.on('newUser', (data) => {
    users.push(data);
    socketIO.emit('userResponse', users);
  });

  //when a user types
  socket.on('typing', (data) => {
    socket.broadcast.emit('typingResponse', data);
  });

  //when a user is done typing
  socket.on('doneTyping', (data) => {
    socket.broadcast.emit('typingResponse', data);
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} user just connected!`);
    //remove disconnected user from users array
    users = users.filter((user) => user.socketID !== socket.id);
    socketIO.emit('userResponse', users);
  });
});

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});