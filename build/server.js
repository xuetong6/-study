/*
 *@Description 一灯学堂学员学习系统
 *@Author yuanzhijia@yidengxuetang.com
 *@Date 2016-05-06
 */
'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaConvert = require('koa-convert');

var _koaConvert2 = _interopRequireDefault(_koaConvert);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaSimpleRouter = require('koa-simple-router');

var _koaSimpleRouter2 = _interopRequireDefault(_koaSimpleRouter);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _koaSwig = require('koa-swig');

var _koaSwig2 = _interopRequireDefault(_koaSwig);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _log4js = require('log4js');

var _log4js2 = _interopRequireDefault(_log4js);

var _koaSession = require('koa-session2');

var _koaSession2 = _interopRequireDefault(_koaSession);

var _koaRedisPool = require('koa-redis-pool');

var _koaRedisPool2 = _interopRequireDefault(_koaRedisPool);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _config = require('./config/config');

var _config2 = _interopRequireDefault(_config);

var _loginValidate = require('./libs/loginValidate');

var _loginValidate2 = _interopRequireDefault(_loginValidate);

var _errorHandler = require('./meddlewares/errorHandler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

var _controllerInit = require('./controllers/controllerInit');

var _controllerInit2 = _interopRequireDefault(_controllerInit);

var _koaBody = require('koa-body');

var _koaBody2 = _interopRequireDefault(_koaBody);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//koa1 转换器
const body = (0, _koaBody2.default)();
// import webpackDevServer from 'koa-webpack-dev';

/*自定义文件包*/
const app = new _koa2.default();
app.use(body);
const RDS_PORT = _config2.default.RDS_PORT; //端口号
const RDS_HOST = _config2.default.RDS_HOST; //服务器IP
const RDS_PWD = _config2.default.RDS_PWD; //密码
const logDir = _path2.default.join(__dirname, 'logs'); //配置目标路径 logs

app.use((0, _koaConvert2.default)((0, _koaRedisPool2.default)({
    host: RDS_HOST,
    port: RDS_PORT,
    max: 75,
    min: 1,
    timeout: 3000,
    log: false,
    password: RDS_PWD,
    db: 0
})));
app.use((0, _koaSession2.default)({
    key: "_yideng_learnid" //default "koa:sess"
}));

_log4js2.default.configure({
    appenders: {
        index: {
            type: 'dateFile',
            filename: logDir + '/log4',
            "maxLogSize": 1024,
            "backups": 3,
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
const logger = _log4js2.default.getLogger('index');
app.context.logger = logger;
logger.info('server started');
app.context.render = _co2.default.wrap((0, _koaSwig2.default)({
    root: _config2.default.viewDir,
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html',
    varControls: ['[[', ']]'],
    writeBody: false
}));
app.use(async (ctx, next) => {
    //注入session
    const redisResult = new _loginValidate2.default(ctx).get();
    await redisResult.then(res => {
        ctx.session.userInfo = res;
    });
    await next();
});
_errorHandler2.default.error(app); //处理页面错误的处理句柄
// app.use(convert(webpackDevServer({
//     config: config.webpackConf
// })));
_controllerInit2.default.getAllrouters(app, _koaSimpleRouter2.default); //初始化controllers
app.use((0, _koaStatic2.default)(_config2.default.staticDir)); // 静态资源文件
//生成文件夹目录
try {
    _fs2.default.mkdirSync(logDir);
} catch (err) {
    if (err.code !== 'EEXIST') {
        console.error('Could not set up log directory, error was: ', err);
        process.exit(1);
    }
}
app.listen(_config2.default.port);
console.log('ydVueSystem listening on port %s', _config2.default.port);

module.exports = app;