'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

var _safeRequest = require('../libs/safeRequest');

var _safeRequest2 = _interopRequireDefault(_safeRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class interestedModel {
	constructor(ctx, next) {
		this.ctx = ctx;
	}
	getStundentData() {
		const data = {
			uid: this.ctx.session.userInfo.uid
		};
		const safeRequestIns = new _safeRequest2.default(this.ctx, _config2.default.getStudentsInterested, data);

		return safeRequestIns.request();
	}
}exports.default = interestedModel;
;