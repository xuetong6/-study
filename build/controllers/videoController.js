'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _courseModel = require('../models/courseModel');

var _courseModel2 = _interopRequireDefault(_courseModel);

var _examModel = require('../models/examModel');

var _examModel2 = _interopRequireDefault(_examModel);

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const data = {
    title: "一灯学堂学员学习系统",
    content: "Hello World"
};
let videoController = {
    index() {
        return async (ctx, next) => {
            const examModelApp = new _examModel2.default(ctx);

            const examResult = await examModelApp.getScoreList();

            console.log("examResult", examResult.result);

            const courseDigital = new _courseModel2.default(ctx);
            const digital = await courseDigital.handleAliber(ctx.params.action);

            const actions = Number(digital.unitid);

            // console.log("对比2", examResult.result)

            const _coursedata = await courseDigital.getCourseList(ctx.params.action);
            const courseKey = _coursedata.result.courselist;

            for (let i = 0; i < courseKey.length; i++) {
                courseKey[i].key = i;
                courseKey[i].keys = data[i];
            }
            if (actions >= 0) {
                var act;
                if (actions > 0) {
                    act = Number(actions) - 2;
                    console.log("看这把", act);
                }
                if (actions == 1) {
                    if (_coursedata.result.title) {
                        ctx.body = await ctx.render('video/pages/video.html', {
                            title: "一灯学堂学员学习系统 - 预习课",
                            userinfo: ctx.session.userInfo.user_info
                        });
                    }
                } else if (examResult.result.scores[act] != undefined) {
                    var score = examResult.result.scores[act].score;
                    if (score >= 80) {
                        if (_coursedata.result.title) {
                            ctx.body = await ctx.render('video/pages/video.html', {
                                title: "一灯学堂学员学习系统 - 预习课",
                                userinfo: ctx.session.userInfo.user_info
                            });
                        }
                    } else {
                        ctx.body = await ctx.render('error/pages/404.html', {});
                    }
                }
            }
        };
    },
    getData() {
        return async (ctx, next) => {

            const courseModelIns = new _courseModel2.default(ctx);
            const _coursedata = await courseModelIns.getCourseList(ctx.params.action);
            const courseKey = _coursedata.result.courselist;

            for (let i = 0; i < courseKey.length; i++) {
                courseKey[i].key = i;
                courseKey[i].keys = data[i];
            }

            if (_coursedata.result.title) {
                ctx.body = {
                    title: "一灯学堂学员学习系统 - 预习课",
                    userinfo: ctx.session.userInfo.user_info,
                    coursedata: _coursedata.result || {
                        courselist: []
                    }
                };
            }
        };
    }
};
exports.default = videoController;