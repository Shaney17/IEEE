var express     = require('express');
var io = require('socket.io');


module.exports = (server) => {
  io(server).on('connection', (socket) => {
      console.log('a user connected');
      socket.on('cliSendData', (data) => {
        socket.broadcast.emit('serSendData', data);
      });
  });
}

