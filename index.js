'use strict'

var express = require('express'), 
    app     = express(),
    http    = require('http').Server(app),
    io      = require('socket.io')(http),
    messages = [{
        id: 1,
        text: 'Hola soy mensaje',
        author: 'Jhonatan Meza' 
    }];
    
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('socket desde el servidor');
    socket.emit('messages', messages);

    socket.on('new-message', (data) => {
        messages.push(data);
        io.sockets.emit('messages', messages);
    })
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});