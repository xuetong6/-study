'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _examModel = require('../models/examModel');

var _examModel2 = _interopRequireDefault(_examModel);

var _indexModel = require('../models/indexModel');

var _indexModel2 = _interopRequireDefault(_indexModel);

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const indexController = {
    getData() {
        return async (ctx, next) => {
            const examModelApp = new _examModel2.default(ctx);
            const examResult = await examModelApp.getScoreList();

            let levelNumber = 10;
            //英文数字
            let sarr = _config2.default.alphaNumeric;
            //阿利伯数字
            let idArr = _config2.default.aliberDigital;
            //课程icon
            let imgsrc = [];
            //考试ids
            let paperids = [];
            const userrole = ctx.session.userInfo['user_info']['role'] - 0;
            //小白班
            switch (userrole) {
                case 1:
                    levelNumber = _config2.default.advancedNumber;
                    imgsrc = _config2.default.advancedClassIcon;
                    paperids = _config2.default.advancedPaperids;
                    break;
                case 2:
                    levelNumber = _config2.default.basicsNumber;
                    imgsrc = _config2.default.basicsClassIcon;
                    paperids = _config2.default.basicsPaperids;
                    break;
            }

            //考试信息
            let examinfo = {};
            //课程信息
            let course = [];
            //获取考试分数
            let _scores = examResult.result.scores;

            console.log("_scores", _scores);
            //考试结果长度
            const scoresLen = _scores.length;
            for (let i = 0; i < scoresLen; i++) {
                const _currscore = parseInt(_scores[i].score, 10);
                const _key = sarr[i];
                const _nextkey = sarr[i + 1];
                examinfo[_key] = {};
                if (_currscore || _currscore == 0) {
                    examinfo[_key].score = _currscore;
                    examinfo[_key].paperid = "http://www.101test.com/cand/index?paperId=" + paperids[i];
                }
                examinfo[_key].index = i + 1;
                let tempdata = {};
                tempdata.videourl = '/video/' + _key + "online"; //预习课地址
                tempdata.classourl = '/video/' + _key + "offline"; //预习课地址
                tempdata.imgsrc = imgsrc[i];
                if (_currscore >= 10) {
                    //  实战项目地址
                    examinfo[_key].idurl = '/taskmore/' + idArr[i];
                }
                //检查尾部边界值&&处理下一章内容
                if (_currscore >= 80 && i < levelNumber - 1) {
                    examinfo[_nextkey] = {};
                    if (_currscore || _currscore == 0) {
                        examinfo[_nextkey].score = 0;
                        examinfo[_nextkey].paperid = "http://www.101test.com/cand/index?paperId=" + paperids[i + 1];
                    }
                    let stempdata = {};
                    stempdata.imgsrc = imgsrc[i + 1];
                    stempdata.videourl = '/video/' + _nextkey + "online"; //预习课地址
                    stempdata.classourl = '/video/' + _nextkey + "offline"; //预习课地址
                    course[i + 1] = stempdata;
                } else {
                    break;
                }
                course[i] = tempdata;
            }
            //补充剩余的置灰数据
            if (scoresLen < levelNumber) {
                for (let w = scoresLen; w < levelNumber; w++) {
                    const _key2 = sarr[w];
                    if (!examinfo[_key2]) {
                        examinfo[_key2] = {};
                        examinfo[_key2].score = 0;
                        examinfo[_key2].index = w + 1;
                    } else {
                        examinfo[_key2].index = w + 1;
                    }
                    let innercourse = {};
                    innercourse.videourl = ""; //预习课地址
                    innercourse.classourl = ""; //预习课地址
                    if (w == 0) {
                        innercourse.videourl = "/video/oneonline"; //预习课地址
                        innercourse.classourl = "/video/oneoffline"; //预习课地址
                    }
                    innercourse.imgsrc = imgsrc[w];
                    if (!course[w]) {
                        course[w] = innercourse;
                    }
                }
            }
            //检查头部边界值
            if (examinfo.one.paperid == undefined) {
                examinfo.one.paperid = "http://www.101test.com/cand/index?paperId=" + paperids[0];
            }
            if (course[0] == undefined) {
                const _key = sarr[0];
                let firstLession = {};
                firstLession.imgsrc = imgsrc[0];
                firstLession.videourl = '/video/' + _key + "online"; //预习课地址
                firstLession.classourl = '/video/' + _key + "offline"; //预习课地址
                firstLession.index = 1;
                course[0] = firstLession;
            }
            let _data = {
                title: "一灯学堂 学员学习系统",
                userinfo: ctx.session.userInfo.user_info,
                result: examinfo,
                course: course
            };
            ctx.body = {
                data: _data
            };
        };
    },
    index() {
        return async (ctx, next) => {
            const indexModelApp = new _indexModel2.default(ctx);
            const _tips = await indexModelApp.getNotice();
            ctx.body = await ctx.render('index/pages/index.html', {
                title: "一灯学堂 学员学习系统",
                userinfo: ctx.session.userInfo.user_info,
                notice: _tips.result.notice || "欢迎同学进入一灯学习系统。"
            });
        };
    }
};
exports.default = indexController;