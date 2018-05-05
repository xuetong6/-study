'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

var _safeRequest = require('../libs/safeRequest');

var _safeRequest2 = _interopRequireDefault(_safeRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class examModel {
    constructor(ctx) {
        this.ctx = ctx;
    }
    getScoreList() {
        const data = {
            // uid: ""
        };
        const safeRequestIns = new _safeRequest2.default(this.ctx, _config2.default.LearningSkills, data);
        return safeRequestIns.request();
    }
    getfowardCity() {
        const data = {
            // uid: ""
        };
        const safeRequestIns = new _safeRequest2.default(this.ctx, _config2.default.forwardCity, data);
        return safeRequestIns.request();
    }
    getsalary() {
        const data = {
            // uid: ""
        };
        const safeRequestIns = new _safeRequest2.default(this.ctx, _config2.default.salary, data);
        return safeRequestIns.request();
    }
}exports.default = examModel;
;