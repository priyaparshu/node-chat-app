# node-chat-app
In this project I am building an app using Websocket and socket.io to enables two way communication between the client and the server. The client could be a web app, iphone app or an Android app. In real time I will be able to send event and event data from server to the client and back. This would have been impossible to do with an http API.
In this application, Client will be the user who is using the chat application. The client will emit a createMessage event that is sent to the server. The server will have an Emit event that will emit this message from the client  to everyone else. The message will be displayed to the screen and users can respond to it.



I will be using "mocha" as test suit and "expect" as the assertion library.

I will be using validator library especially (validator.isEmail()) function in order to validate emails. A token array from mongodb db will be used to access individual tokens. token is used to stores auth infomation.

I will use JWT to authenticate requests. The token will be sent back from login request, client will take this and use it to authenticate other requests by passing them in header. I will use a library called JWT. Its 
  jwt.sign creates the hash value using the data and the secret and returns a token. 
  jwt.verify will take the token and verify that token was not manipulated.
