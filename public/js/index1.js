var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

//new message function
socket.on('newMessage', function (e) {
    console.log('new Message', e);
});
socket.on('disconnect', function () {
    console.log('disconnected good bye');
});







// socket.emit('createMessage', {
//     from: 'carl@gmail.com',
//     text: 'sure how about 3:00ish'
// })




