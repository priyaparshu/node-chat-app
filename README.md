# node-chat-app
An app using Websocket and socket.io enables two way communication between the client and the server. The client could be a web app, iphone app or an Android app. In real time we will be able to send event and event data to from server to the client which we could never do with an http API.
In this application, the client will be a web application. We will be connecting the two to allow flow of data from browser to the server or from server to the browser instantly.

In this chat application we are building, we will have a server and the client will be a user who is using the chat application. The client will emit a createMessage event that is sent to the server. The server will have an Emit event that will emit this message from the client  to everyone else. The message will be displayed to the screen and users can respond to it.

We will be using mocha as test suit and expect as the assertion library.
