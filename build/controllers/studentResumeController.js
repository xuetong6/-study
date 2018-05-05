'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _subMissions = require('../models/subMissions');

var _subMissions2 = _interopRequireDefault(_subMissions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const data = {
    title: "一灯学堂学员学习系统",
    content: "Hello World"
};
const indexController = {
    index() {
        return async (ctx, next) => {
            var list = await ctx.request.body;
            const student = await new _subMissions2.default(ctx);
            // list.result.uid=ctx.session.userInfo.user_info.uid
            //data数据内容
            const data = {};
            data.uid = ctx.session.userInfo.user_info.uid;
            data.skills = list.result.skills;
            data.space = list.result.space;
            data.salary = Number(list.result.salary);

            var list = list.result.description;
            data.description = decodeURIComponent(list);

            // console.log("list", decodeURIComponent(list))

            const examResult = await student.getStudentMessage(data);

            console.log("thisSSS", examResult);

            ctx.body = {
                error_code: examResult.error_code
            };
        };
    }
};
exports.default = indexController;