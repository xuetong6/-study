'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _taskModel = require('../models/taskModel');

var _taskModel2 = _interopRequireDefault(_taskModel);

var _examModel = require('../models/examModel');

var _examModel2 = _interopRequireDefault(_examModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const data = {
    title: "一灯学堂学员学习系统",
    content: "Hello World"
};
let taskMoreController = {
    index() {
        return async (ctx, next) => {
            const examModelApp = new _examModel2.default(ctx);

            const examResult = await examModelApp.getScoreList();

            let _scores = examResult.result.scores;

            var exameArrary = [];

            for (var key in _scores) {
                exameArrary.push(_scores[key].unit_id);
            }

            const taskmoreModelIns = new _taskModel2.default(ctx);
            const _taskdata = await taskmoreModelIns.getTaskDetail(ctx.params.action);

            console.log("_taskdata", _taskdata);

            const action = Number(ctx.params.action);

            if (exameArrary.indexOf(action) != -1) {
                if (_taskdata['error_code'] == 0) {
                    ctx.body = await ctx.render('taskMore/pages/taskMore.html', {
                        title: "一灯学堂学员学习系统 - 实战",
                        userinfo: ctx.session.userInfo.user_info,
                        taskdata: _taskdata.result || {
                            tasklist: []
                        }
                    });
                } else {
                    ctx.body = await ctx.render('error/pages/404.html', {});
                }
            } else {
                ctx.body = await ctx.render('error/pages/404.html', {});
            }
        };
    },
    getData() {
        return async (ctx, next) => {
            const taskmoreModelIns = new _taskModel2.default(ctx);
            const _taskdata = await taskmoreModelIns.getTaskDetail(ctx.params.action);
            if (_taskdata['error_code'] == 0) {
                ctx.body = {
                    taskdata: _taskdata.result || {
                        tasklist: []
                    }
                };
            } else {
                ctx.body = await ctx.render('error/pages/404.html', {});
            }
        };
    }
};
exports.default = taskMoreController;