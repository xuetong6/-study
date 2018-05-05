import config from '../config/config';
import safeRequest from '../libs/safeRequest';
export default class interestedModel {
	constructor(ctx, next) {
		this.ctx = ctx;
	}
	getStundentData() {
		const data = {
			uid: this.ctx.session.userInfo.uid
		};
		const safeRequestIns = new safeRequest(this.ctx, config.getStudentsInterested, data);

		return safeRequestIns.request();
	}
};