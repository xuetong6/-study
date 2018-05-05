'use strict';
let achieveController = {
    index() {
        return async(ctx, next) => {
            ctx.body = await ctx.render('achieve/pages/index.html', {
                title: "一灯学堂学员学习系统 - 我的成就",
                userinfo: ctx.session.userInfo.user_info
            });
        }
    }
};
export
default achieveController;