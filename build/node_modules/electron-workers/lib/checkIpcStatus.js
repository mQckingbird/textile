'use strict';

exports.__esModule = true;

exports['default'] = function (processObj, cb) {
  var timeout = 100,
      isDone = false,
      timeoutId = undefined;

  function pongHandler(payload) {
    if (payload && payload.workerEvent === 'pong') {
      isDone = true;
      clearTimeout(timeoutId);
      processObj.removeListener('message', pongHandler);
      cb(null, 'open');
    }
  }

  processObj.on('message', pongHandler);

  tryCommunication();

  function tryCommunication() {
    var shotCount = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

    if (isDone) {
      return;
    }

    processObj.send({
      workerEvent: 'ping'
    }, undefined, function (err) {
      if (isDone) {
        return;
      }

      if (err) {
        isDone = true;
        cb(new Error('message could not be sent to electron process'));
      }
    });

    timeoutId = setTimeout(function () {
      if (isDone) {
        return;
      }

      if (shotCount > 200) {
        isDone = true;
        return cb(new Error('Worker timeout (' + timeout + ' ms) ocurred waiting for ipc connection to be available'));
      }

      tryCommunication(shotCount + 1);
    }, timeout);
  }
};

module.exports = exports['default'];