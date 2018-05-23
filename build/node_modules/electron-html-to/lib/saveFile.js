'use strict';

exports.__esModule = true;
exports['default'] = saveFile;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

function saveFile(dirPath, filePath, content, cb) {
  _mkdirp2['default'](dirPath, function (err) {
    if (err) {
      return cb(err);
    }

    _fs2['default'].writeFile(filePath, content, cb);
  });
}

module.exports = exports['default'];