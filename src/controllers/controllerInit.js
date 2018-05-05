'use strict';
import index from './indexController';
import video from './videoController';
import taskMore from './taskMoreController';
import bookDesk from './bookDeskController';
import book from './bookController';
import resume from './resumeController'
import studentResume from './studentResumeController'
import interestedcontroller from './interestedcontroller'

const controllerInit = {
    getAllrouters(app, router) {
        app.use(router(_ => {
            _.get('/', index.index());
            _.get('/index', index.index());
            _.get('/index.html', index.index());
            _.get('/index/index', index.index());
            _.get('/index/getdata', index.getData());
            _.get('/video/:action', video.index());
            _.get('/videoplayer/:action', video.getData());
            _.get('/taskMore/:action', taskMore.index());
            _.get('/taskMore/getData/:action', taskMore.getData());
            _.get('/bookDesk', bookDesk.index());
            _.get("/bookDesk/getData", bookDesk.getData());
            _.get('/book/:action', book.index());
            _.get('/book/getData/:action', book.getData());
            _.get('/student', resume.index()); //页面渲染接口  render接口
            _.post('/studentResume', studentResume.index()); //学生提交接口
            _.get('/student/getData', resume.getData()); //得到数据接口
            _.get('/interestedcontroller', interestedcontroller.index()); //获取学习求职意向接口
        }));
    }
};
export
default controllerInit;