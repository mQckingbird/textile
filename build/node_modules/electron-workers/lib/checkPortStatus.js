'use strict';

exports.__esModule = true;

var _net = require('net');

exports['default'] = function (port, host, cb) {
  var timeout = 50,
      connectionRefused = false,
      portStatus = null,
      error = null,
      socket = undefined;

  socket = new _net.Socket();

  // Socket connection established, port is open
  socket.on('connect', function () {
    portStatus = 'open';
    socket.destroy();
  });

  // If no response, assume port is not listening
  socket.setTimeout(timeout);

  socket.on('timeout', function () {
    portStatus = 'closed';
    error = new Error('Worker timeout (' + timeout + ' ms) ocurred waiting for ' + host + ':' + port + ' to be available');
    socket.destroy();
  });

  socket.on('error', function (exception) {
    if (exception.code !== 'ECONNREFUSED') {
      error = exception;
    } else {
      connectionRefused = true;
    }

    portStatus = 'closed';
  });

  // Return after the socket has closed
  socket.on('close', function (exception) {
    if (exception && !connectionRefused) {
      error = exception;
    } else {
      error = null;
    }

    cb(error, portStatus);
  });

  socket.connect(port, host);
};

module.exports = exports['default'];