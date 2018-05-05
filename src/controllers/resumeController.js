'use strict';
import examModel from '../models/resumeModel';

import Resultscores from '../models/examModel';


const indexController = {
    getData() {

        return async(ctx, next) => {
            //获得考试成绩内容

            const _examresult = new Resultscores(ctx);

            const examResults = await _examresult.getScoreList();

            let _scores = examResults.result.scores;

            console.log("_scores", _scores.length)

            const studentScore = _scores.length


            console.log("长度", studentScore)



            const examModelApp = new examModel(ctx);

            const forwardCityApp = new examModel(ctx);

            const salary = new examModel(ctx);

            const examResult = await examModelApp.getScoreList();

            const forwardCityResult = await forwardCityApp.getfowardCity();

            const salaryResult = await salary.getsalary();

            const MasterTheSkill = examResult.result.skills

            const forwardCitys = forwardCityResult.result.place

            console.log("forwardCitys城市", forwardCitys)

            const havescalay = salaryResult.result.place

            if (MasterTheSkill && forwardCitys) {
                ctx.body = {
                    score: studentScore,
                    result: MasterTheSkill,
                    city: forwardCitys,
                    scalay: havescalay,
                }
            } else {
                ctx.body = await ctx.render('error/pages/404.html', {});
            }

        }
    },
    index() {
        return async(ctx, next) => {
            ctx.body = await ctx.render('student/pages/student.html', {
                title: "一灯学堂学员学习系统 - 我的成就",
                userinfo: ctx.session.userInfo.user_info
            });
        }


    }
};
export
default indexController;