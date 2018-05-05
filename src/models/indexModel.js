import examModel from './examModel';
import config from '../config/config';
import safeRequest from '../libs/safeRequest';
export default class indexModel {
	constructor(ctx, next) {
			this.ctx = ctx;
		} //获取公告接口
	getNotice() {
		const safeRequestIns = new safeRequest(this.ctx, config.getTgetLastNotice, {});
		return safeRequestIns.request();
	}
};