import config from '../config/config';
import safeRequest from '../libs/safeRequest';

export
default class examModel {
    constructor(ctx) {
        this.ctx = ctx;
    }
    getScoreList() {
        const data = {
            // uid: ""
        };
        const safeRequestIns = new safeRequest(this.ctx, config.LearningSkills, data);
        return safeRequestIns.request();
    }
    getfowardCity() {
        const data = {
            // uid: ""
        }
        const safeRequestIns = new safeRequest(this.ctx, config.forwardCity, data);
        return safeRequestIns.request();
    }
    getsalary() {
        const data = {
            // uid: ""
        }
        const safeRequestIns = new safeRequest(this.ctx, config.salary, data);
        return safeRequestIns.request();
    }
};