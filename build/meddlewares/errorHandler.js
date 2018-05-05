/*
 *@Description 学习系统出错页
 *@Author yuanzhijia@yidengxuetang.com
 *@Date 2015-5-26
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const errorHandler = {
    error(app) {
        app.use(async (ctx, next) => {
            try {
                // console.log('500监听');
                await next();
            } catch (err) {
                console.error(err);
                ctx.logger.error(err);
                ctx.status = err.status || 500;
                // console.log('出错信息', err);
                ctx.body = await ctx.render('error/pages/500');
            }
        });
        app.use(async (ctx, next) => {
            // console.log('404监听');
            await next();
            if (404 != ctx.status) return;
            //console.log(ctx.url, '404页面');
            ctx.status = 404;
            // console.log('404监听结束');
            ctx.body = await ctx.render('error/pages/404');
        });
    }
};
exports.default = errorHandler;