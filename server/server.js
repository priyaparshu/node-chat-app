const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '../public');

const host = '0.0.0.0';
const port = process.env.PORT || 5000;
const app = express()

const server = http.createServer(app);
const io = socketIO(server);


app.use(express.static(publicPath));


io.on('connection', (socket) => {
  console.log('new user connected');
  socket.emit('newMessage', generateMessage('Admin', 'welcome to chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message) => {
    //console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));

  })

  socket.on('disconnect', function () {
    console.log('disconnected good bye from server');
  });
})

app.get('/', (req, res) => {
  res.render('index.html');
})

server.listen(port, host, () => {
  console.log(`server listening on ${host} and ${port}`);
});

