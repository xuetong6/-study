'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let bookController = {
	index() {
		return async (ctx, next) => {
			ctx.body = await ctx.render('book/pages/book.html', {
				title: "一灯学堂学员学习系统 - 我的成就",
				userinfo: ctx.session.userInfo.user_info
			});
		};
	},
	getData() {
		return async (ctx, next) => {

			var dataAction = ctx.params.action;

			function finder(path) {
				let files = _fs2.default.readdirSync(path);
				// console.log("files", files)
				console.log("files", files.length);
				var filesData = files.length;
				ctx.body = {
					data: filesData
				};
			}
			// console.log('book/pages/' + "" + dataAction + "")
			var p = _path2.default.join(__dirname, '..', 'book/pages/' + "" + dataAction + "");
			finder(p);
		};
	}
};
exports.default = bookController;