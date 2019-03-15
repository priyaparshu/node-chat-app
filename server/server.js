const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const host = '0.0.0.0';
const port = process.env.PORT || 5000;
const app = express()
const path = require('path');
const server = http.createServer(app);
const io = socketIO(server);
const { isRealString } = require('./utils/validation');

const { Users } = require('./utils/users')

pathdir = path.join(__dirname, '../public')
const { generateMessage, generateLocationMessage } = require('./utils/message');
app.use(express.static(pathdir));

const users = new Users();
io.on('connection', (socket) => {
    console.log('new user connected');


    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || (!isRealString(params.room))) {
            return callback('Name and Room name are required');
        }


        socket.join(params.room);
        //add new user once he joins
        //remove users from all rooms before adding him
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        //emit an event to everyone in chat room
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        //socket.leave('The office Fans');
        //ways to send msgs
        //1. io.emit -> to send to all user in the room -> io.to('Movie fans').emit
        //2. socket.boadcast.emit -> to send to all except the sender -> socket.broadcast('Movie fans').emit
        //3. to indiviual person -> socket.emit
        socket.emit('newMessage', generateMessage('Admin', 'welcome to chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
        callback();
    })


    socket.on('createMessage', (e, callback) => {
        console.log(e)
        // to send the msg to everyone including myself
        io.emit('newMessage', generateMessage(e.from, e.text));
        callback();

        // to send the msg to everyone excluding myself
        // socket.broadcast.emit('newMessage', {
        //     from: e.from,
        //     text: e.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('createLocationMessage', (coords) => {
        console.log("LAT", coords.latitude);
        console.log("LONG", coords.longitude);
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    })

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room))
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
        }
    })


    // socket.emit('newMessage', {
    //     from: 'carl@gmail.com',
    //     text: 'im me when you have time ',
    //     createdAt: 234
    // });

});

app.get('/', (req, res) => {
    res.render('index.html');
})

server.listen(port, host, () => {
    console.log(`server listening on ${host} and ${port}`);
});
