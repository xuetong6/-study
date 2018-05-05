'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

var _safeRequest = require('../libs/safeRequest');

var _safeRequest2 = _interopRequireDefault(_safeRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 *@Description 获取实战详细信息
 *@author zhangning@yidengxuetang.com
 *@Date 2017-1-20
 */
class courseModel {
    constructor(ctx) {
        this.ctx = ctx;
    }
    getTaskDetail(ckey) {
        const data = {
            unit_id: ckey - 0, //任务ID
            uid: this.ctx.session.userInfo.uid
        };

        const safeRequestIns = new _safeRequest2.default(this.ctx, _config2.default.getTaskDetail, data);
        return safeRequestIns.request();
    }
}exports.default = courseModel;
;