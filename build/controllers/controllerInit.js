'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _indexController = require('./indexController');

var _indexController2 = _interopRequireDefault(_indexController);

var _videoController = require('./videoController');

var _videoController2 = _interopRequireDefault(_videoController);

var _taskMoreController = require('./taskMoreController');

var _taskMoreController2 = _interopRequireDefault(_taskMoreController);

var _bookDeskController = require('./bookDeskController');

var _bookDeskController2 = _interopRequireDefault(_bookDeskController);

var _bookController = require('./bookController');

var _bookController2 = _interopRequireDefault(_bookController);

var _resumeController = require('./resumeController');

var _resumeController2 = _interopRequireDefault(_resumeController);

var _studentResumeController = require('./studentResumeController');

var _studentResumeController2 = _interopRequireDefault(_studentResumeController);

var _interestedcontroller = require('./interestedcontroller');

var _interestedcontroller2 = _interopRequireDefault(_interestedcontroller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const controllerInit = {
    getAllrouters(app, router) {
        app.use(router(_ => {
            _.get('/', _indexController2.default.index());
            _.get('/index', _indexController2.default.index());
            _.get('/index.html', _indexController2.default.index());
            _.get('/index/index', _indexController2.default.index());
            _.get('/index/getdata', _indexController2.default.getData());
            _.get('/video/:action', _videoController2.default.index());
            _.get('/videoplayer/:action', _videoController2.default.getData());
            _.get('/taskMore/:action', _taskMoreController2.default.index());
            _.get('/taskMore/getData/:action', _taskMoreController2.default.getData());
            _.get('/bookDesk', _bookDeskController2.default.index());
            _.get("/bookDesk/getData", _bookDeskController2.default.getData());
            _.get('/book/:action', _bookController2.default.index());
            _.get('/book/getData/:action', _bookController2.default.getData());
            _.get('/student', _resumeController2.default.index()); //页面渲染接口  render接口
            _.post('/studentResume', _studentResumeController2.default.index()); //学生提交接口
            _.get('/student/getData', _resumeController2.default.getData()); //得到数据接口
            _.get('/interestedcontroller', _interestedcontroller2.default.index()); //获取学习求职意向接口
        }));
    }
};
exports.default = controllerInit;