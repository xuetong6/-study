/*
 *@Description 一灯学堂学员学习系统
 *@Author yuanzhijia@yidengxuetang.com
 *@Date 2016-05-06
 */
'use strict';
import Koa from 'koa';
import convert from 'koa-convert'; //koa1 转换器
import serve from 'koa-static';
import router from 'koa-simple-router';
import path from 'path';
import render from 'koa-swig';
import co from 'co';
import log4js from 'log4js';
import session from 'koa-session2';
import redisPool from "koa-redis-pool";
import fs from 'fs';
/*自定义文件包*/
import config from './config/config';
import Store from './libs/loginValidate';
import errorHandler from './meddlewares/errorHandler';
import controllers from './controllers/controllerInit';
import koaBody from 'koa-body';
const body = koaBody()
    // import webpackDevServer from 'koa-webpack-dev';
const app = new Koa();
app.use(body);
const RDS_PORT = config.RDS_PORT; //端口号
const RDS_HOST = config.RDS_HOST; //服务器IP
const RDS_PWD = config.RDS_PWD; //密码
const logDir = path.join(__dirname, 'logs') //配置目标路径 logs

app.use(convert(redisPool({
    host: RDS_HOST,
    port: RDS_PORT,
    max: 75,
    min: 1,
    timeout: 3000,
    log: false,
    password: RDS_PWD,
    db: 0
})));
app.use(session({
    key: "_yideng_learnid", //default "koa:sess"
}));

log4js.configure({
    appenders: { 
        index: { 
            type: 'dateFile', 
            filename: logDir + '/log4',
            "maxLogSize": 1024,
            "backups":3,
            "alwaysIncludePattern": true,
            "pattern": "-yyyy-MM-dd.log"
        }
    },
    categories: { 
        default: { 
            appenders: ['index'], 
            level: 'debug' 
        } 
    }
});
const logger = log4js.getLogger('index');
app.context.logger = logger;
logger.info('server started')
app.context.render = co.wrap(render({
    root: config.viewDir,
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html',
    varControls: ['[[', ']]'],
    writeBody: false
}));
app.use(async(ctx, next) => {
    //注入session
    const redisResult = (new Store(ctx)).get();
    await redisResult.then((res) => {
        ctx.session.userInfo = res;
    });
    await next();
});
errorHandler.error(app); //处理页面错误的处理句柄
// app.use(convert(webpackDevServer({
//     config: config.webpackConf
// })));
controllers.getAllrouters(app, router); //初始化controllers
app.use(serve(config.staticDir)); // 静态资源文件
//生成文件夹目录
try {
    fs.mkdirSync(logDir)
} catch (err) {
    if (err.code !== 'EEXIST') {
        console.error('Could not set up log directory, error was: ', err)
        process.exit(1)
    }
}
app.listen(config.port);
console.log('ydVueSystem listening on port %s', config.port);

module.exports = app;