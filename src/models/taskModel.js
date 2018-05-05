/*
 *@Description 获取实战详细信息
 *@author zhangning@yidengxuetang.com
 *@Date 2017-1-20
 */
import config from '../config/config';
import safeRequest from '../libs/safeRequest';
export
default class courseModel {
    constructor(ctx) {
        this.ctx = ctx;
    }
    getTaskDetail(ckey) {
        const data = {
            unit_id: ckey - 0, //任务ID
            uid: this.ctx.session.userInfo.uid
        };

        const safeRequestIns = new safeRequest(this.ctx, config.getTaskDetail, data);
        return safeRequestIns.request();
    }
};