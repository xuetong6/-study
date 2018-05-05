'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

var _safeRequest = require('../libs/safeRequest');

var _safeRequest2 = _interopRequireDefault(_safeRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// console.log("*****" )
// console.log(safeRequest)
// console.log("*****" )
/*
 *@Description 获取考试接口
 *@Author yuanzhijia@yidengxuetang.com
 *@Date 2016-07-18
 */
class subMissions {
    constructor(ctx) {
        this.ctx = ctx;
    }
    getStudentMessage(list) {

        console.log("list参数", list);

        const safeRequestIns = new _safeRequest2.default(this.ctx, _config2.default.studentDetails, list);
        return safeRequestIns.request();
    }
    getScoreList() {
        const data = {
            uid: this.ctx.session.userInfo.uid
        };
        const safeRequestIns = new _safeRequest2.default(this.ctx, _config2.default.getStudentScoreList, data);
        return safeRequestIns.request();
    }
}exports.default = subMissions;
;