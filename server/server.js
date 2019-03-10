const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const host = '0.0.0.0';
const port = process.env.PORT || 5000;
const app = express()
const path = require('path');
const server = http.createServer(app);
const io = socketIO(server);
pathdir = path.join(__dirname, '../public')

app.use(express.static(pathdir));


io.on('connection', (socket) => {
    console.log('new user connected');
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'welcome to chat app',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'admin',
        text: 'A new user has joined',
        createdAt: new Date().getTime()
    });


    socket.on('createMessage', (e) => {
        console.log(e)
        // to send the msg to everyone including myself
        io.emit('newMessage', {
            from: e.from,
            text: e.text,
            createdAt: new Date().getTime()
        })
        // to send the msg to everyone excluding myself
        // socket.broadcast.emit('newMessage', {
        //     from: e.from,
        //     text: e.text,
        //     createdAt: new Date().getTime()
        // });
    });



    socket.on('disconnect', () => {
        console.log('Client disconnected adios');
    })


    // socket.emit('newMessage', {
    //     from: 'carl@gmail.com',
    //     text: 'im me when you have time ',
    //     createdAt: 234
    // });


    socket.on('disconnect', () => {
        console.log('Client disconnected adios');

    });

});

app.get('/', (req, res) => {
    res.render('index.html');
})

server.listen(port, host, () => {
    console.log(`server listening on ${host} and ${port}`);
});
