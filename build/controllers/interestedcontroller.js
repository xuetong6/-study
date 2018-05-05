'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _interestedModel = require('../models/interestedModel');

var _interestedModel2 = _interopRequireDefault(_interestedModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let studentInterested = {
	index() {
		return async (ctx, next) => {
			const _interestedModels = new _interestedModel2.default(ctx);

			const _coursedata = await _interestedModels.getStundentData();

			var objLengths = Object.keys(_coursedata.result).length;

			if (objLengths < 1) {
				ctx.body = {
					skills: "",
					space: "",
					salary: "",
					description: ""
				};
			} else if (objLengths > 3) {
				ctx.body = {
					skills: _coursedata.result.skills,
					space: _coursedata.result.space,
					salary: _coursedata.result.salary,
					description: _coursedata.result.description
				};
			}
		};
	}
};
exports.default = studentInterested;