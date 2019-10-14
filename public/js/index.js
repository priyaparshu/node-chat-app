var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});
socket.on('disconnect', function () {
  console.log('disconnected good bye');
});

//new message function
socket.on('newMessage', function (el) {

  var li = jQuery('<li></li>');
  li.text(`${el.from} : ${el.text}`);

  jQuery('#messages').append(li);
});
// socket.emit('createMessage', {
//   from: 'Gina',
//   text: 'hi'
// }, (msg) => {
//   console.log('good', msg)
// })

jQuery('#message-form').on('submit', function (e) {
  console.log(e)
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, () => {

  })
})







// socket.emit('createMessage', {
//     from: 'carl@gmail.com',
//     text: 'sure how about 3:00ish'
// })




