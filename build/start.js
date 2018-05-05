'use strict';

var _config = require('./config/config');

var _config2 = _interopRequireDefault(_config);

var _server = require('./server.js');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//监听端口🐂😊
_server2.default.listen(_config2.default.port);
console.log('ydVueSystem listening on port %s', _config2.default.port);