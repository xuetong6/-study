'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
let achieveController = {
    index() {
        return async (ctx, next) => {
            ctx.body = await ctx.render('achieve/pages/index.html', {
                title: "一灯学堂学员学习系统 - 我的成就",
                userinfo: ctx.session.userInfo.user_info
            });
        };
    }
};
exports.default = achieveController;