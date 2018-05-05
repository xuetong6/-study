'use strict';
import path from 'path';
import fs from 'fs';
let bookController = {
	index() {
		return async(ctx, next) => {
			ctx.body = await ctx.render('book/pages/book.html', {
				title: "一灯学堂学员学习系统 - 我的成就",
				userinfo: ctx.session.userInfo.user_info
			});
		}
	},
	getData() {
		return async(ctx, next) => {

			var dataAction = ctx.params.action

			function finder(path) {
				let files = fs.readdirSync(path);
				// console.log("files", files)
				console.log("files", files.length)
				var filesData = files.length
				ctx.body = {
					data: filesData
				};
			}
			// console.log('book/pages/' + "" + dataAction + "")
			var p = path.join(__dirname, '..', 'book/pages/' + "" + dataAction + "")
			finder(p)

		}
	}
};
export
default bookController;