const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const host = '0.0.0.0';
const port = process.env.PORT || 5000;
const app = express()
const publicPath = path.join(__dirname + '/public')
const server = http.createServer(app);
app.use(express.static(publicPath))
console.log(__dirname + '/../public')
console.log('l', publicPath)
server.listen(port, host, () => {
  console.log(`server listening on ${host} and ${port}`);
});
