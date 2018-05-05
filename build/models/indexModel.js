'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _examModel = require('./examModel');

var _examModel2 = _interopRequireDefault(_examModel);

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

var _safeRequest = require('../libs/safeRequest');

var _safeRequest2 = _interopRequireDefault(_safeRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class indexModel {
	constructor(ctx, next) {
		this.ctx = ctx;
	} //获取公告接口
	getNotice() {
		const safeRequestIns = new _safeRequest2.default(this.ctx, _config2.default.getTgetLastNotice, {});
		return safeRequestIns.request();
	}
}exports.default = indexModel;
;