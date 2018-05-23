'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _ElectronManager = require('./ElectronManager');

var _ElectronManager2 = _interopRequireDefault(_ElectronManager);

var _packageJson = require('../package.json');

var debugMe = _debug2['default'](_packageJson.name);

function createManager(options) {
  var manager = new _ElectronManager2['default'](options);
  debugMe('Creating a new manager with options:', manager.options);
  return manager;
}

function electronManager(options) {
  return createManager(options);
}

exports['default'] = electronManager;
module.exports = exports['default'];