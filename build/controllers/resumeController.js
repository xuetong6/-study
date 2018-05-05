'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _resumeModel = require('../models/resumeModel');

var _resumeModel2 = _interopRequireDefault(_resumeModel);

var _examModel = require('../models/examModel');

var _examModel2 = _interopRequireDefault(_examModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const indexController = {
    getData() {

        return async (ctx, next) => {
            //获得考试成绩内容

            const _examresult = new _examModel2.default(ctx);

            const examResults = await _examresult.getScoreList();

            let _scores = examResults.result.scores;

            console.log("_scores", _scores.length);

            const studentScore = _scores.length;

            console.log("长度", studentScore);

            const examModelApp = new _resumeModel2.default(ctx);

            const forwardCityApp = new _resumeModel2.default(ctx);

            const salary = new _resumeModel2.default(ctx);

            const examResult = await examModelApp.getScoreList();

            const forwardCityResult = await forwardCityApp.getfowardCity();

            const salaryResult = await salary.getsalary();

            const MasterTheSkill = examResult.result.skills;

            const forwardCitys = forwardCityResult.result.place;

            console.log("forwardCitys城市", forwardCitys);

            const havescalay = salaryResult.result.place;

            if (MasterTheSkill && forwardCitys) {
                ctx.body = {
                    score: studentScore,
                    result: MasterTheSkill,
                    city: forwardCitys,
                    scalay: havescalay
                };
            } else {
                ctx.body = await ctx.render('error/pages/404.html', {});
            }
        };
    },
    index() {
        return async (ctx, next) => {
            ctx.body = await ctx.render('student/pages/student.html', {
                title: "一灯学堂学员学习系统 - 我的成就",
                userinfo: ctx.session.userInfo.user_info
            });
        };
    }
};
exports.default = indexController;