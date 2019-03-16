
var socket = io();
function scrollToBootom() {
    //selector
    var messages = jQuery('#message');
    var newMessage = messages.children('li:last-child');
    var clientHeight = message.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}



socket.on('connect', function () {
    // let params = new URLSearchParams(window.location.search);
    // let name = params.get("name");
    // let room = params.get("room");

    var params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('no error')
        }
    })
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

//takes users array similr to getUser array
socket.on('updateUserList', function (users) {
    var ol = jQuery('<ol></ol>');

    users.forEach(function (user) {
        ol.append(jQuery('<li></li>').text(user));
    });
    jQuery('#users').html(ol);
});

socket.on('newMessage', function (message) {
    //var formatedText = moment(message.createdAt).format('h:mm a');
    var formatedTime = moment(message.createdAt).format('h:mm a');
    console.log('ft', formatedTime);
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formatedTime
    });
    //console.log(html);
    jQuery('#messages').append(html);
    console.log('newMessage', template);
    //console.log('newMessage', message);
    // var formatedTime = moment(message.createdAt).format('h:mm a')
    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${formatedTime}: ${message.text}//`)
    // jQuery('#messages').append(li);
});



socket.on('newLocationMessage', function (message) {
    var formatedLocationTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        createdAt: formatedLocationTime,
        url: message.url
    })
    jQuery('#messages').append(html);
    scrollToBootom();
});

// socket.on('newLocationMessage', function (message) {
//     var formatedLocationTime = moment(message.createdAt).format('h:mm a');
//     console.log(message);
//     var li = jQuery('<li></li>');
//     var a = jQuery('<a target="_blank">my current location</a>');
//     li.text(`${formatedLocationTime}:  ${message.from}: `);
//     a.attr('href', message.url);
//     li.append(a);
//     jQuery('#messages').append(li);
//     console.log('li', li);
// })
// socket.emit('createMessage', {
//     from: 'frank',
//     text: 'i am done'
// }, function (callbkdata) {
//     console.log('good bye', callbkdata);
// });

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    var messageTextBox = jQuery('[name=message]')
    socket.emit('createMessage', {

        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('')
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...')
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert(`Unable to fetch posotion ${position}`)
    });


});