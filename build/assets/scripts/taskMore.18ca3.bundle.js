webpackJsonp([1],{

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const ADD_INFO = 'ADD_INFO';
/* harmony export (immutable) */ __webpack_exports__["c"] = ADD_INFO;

const GET_BOOKDESC_INFO = "GET_BOOKDESC_INFO";
/* harmony export (immutable) */ __webpack_exports__["b"] = GET_BOOKDESC_INFO;

const CHECKOUT_REQUEST = "CHECKOUT_REQUEST";
/* unused harmony export CHECKOUT_REQUEST */

const GET_TASK_INFO = 'GET_TASK_INFO';
/* harmony export (immutable) */ __webpack_exports__["d"] = GET_TASK_INFO;

const GET_VIDEO = "GET_VIDEO";
/* harmony export (immutable) */ __webpack_exports__["e"] = GET_VIDEO;

const GET_BOOK_TOTAL_PAGE = "GET_BOOK_TOTAL_PAGE";
/* harmony export (immutable) */ __webpack_exports__["a"] = GET_BOOK_TOTAL_PAGE;



/***/ }),

/***/ 1:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutation_types_js__ = __webpack_require__(0);


const addInfo = ({
    commit
}, {
    me
}) => {
    me.$http.get('index/getdata').then(response => {
        var datas = response.body.data;
        // console.log("得到的", datas)
        commit(__WEBPACK_IMPORTED_MODULE_0__mutation_types_js__["c" /* ADD_INFO */], {
            datas
        })
    }, response => {
        console.error(response);
    });

}
/* harmony export (immutable) */ __webpack_exports__["addInfo"] = addInfo;



const getVideo = ({
    commit
}, {
    me,
    targetUrl
}) => {
    var apiUrl = '/videoplayer/' + targetUrl;
    me.$http.get(apiUrl).then(response => {
        var datas = response.body;
        commit(__WEBPACK_IMPORTED_MODULE_0__mutation_types_js__["e" /* GET_VIDEO */], {
            datas
        })
    }, response => {
        console.error(response);
    });

};
/* harmony export (immutable) */ __webpack_exports__["getVideo"] = getVideo;


const getBookTotalPage = ({
    commit
}, {
    me,
    bookdata
}) => {
    console.log(bookdata);
    me.$http.get("" + bookdata + "").then(response => {
        var datas = response.body.data;
        commit(__WEBPACK_IMPORTED_MODULE_0__mutation_types_js__["a" /* GET_BOOK_TOTAL_PAGE */], {
            datas
        });

        me.booklength = datas - 2;
        me.bookSidePage = me.booklength - 1; //倒数第二页
        me.init(me);
    }, response => {
        console.error(response);

    });
}
/* harmony export (immutable) */ __webpack_exports__["getBookTotalPage"] = getBookTotalPage;


const getTaskList = ({
    commit
}, {
    me,
    id
}) => {
    // console.warn('系统id',id);
    me.$http.get('/taskMore/getData/' + id).then(response => {
        var datas = response.body.taskdata;
        console.log(datas);
        commit(__WEBPACK_IMPORTED_MODULE_0__mutation_types_js__["d" /* GET_TASK_INFO */], {
            datas
        })
    }, response => {
        console.error(response);
    });
};
/* harmony export (immutable) */ __webpack_exports__["getTaskList"] = getTaskList;


const getBookDescList = ({commit}, {me}) => {
    me.$http.get("/bookDesK/getData").then(response => {
        var datas = response.body;
        // console.log(datas);
        // console.log("*********************************");
        commit(__WEBPACK_IMPORTED_MODULE_0__mutation_types_js__["b" /* GET_BOOKDESC_INFO */], {
            datas
        });
    }, response => {
        console.error(response);
        console.error("书籍列表模块");
    });
};
/* harmony export (immutable) */ __webpack_exports__["getBookDescList"] = getBookDescList;


/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

__webpack_require__(28);

var _store = __webpack_require__(2);

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapState = Vuex.mapState;
var taskMore = {
    init: function init() {
        var _write = __webpack_require__(30);
        document.getElementById('write').src = _write;
        var vm = new Vue({
            store: _store2.default,
            el: '#taskinfos',
            computed: mapState({
                desc: function desc(state) {
                    return state.database.taskData.desc;
                },
                explain_vid: function explain_vid(state) {
                    return state.database.taskData.explain_vid;
                },
                standard_vid: function standard_vid(state) {
                    return state.database.taskData.standard_vid;
                }
            }),
            mounted: function mounted() {
                this.init();
            },
            beforeUpdate: function beforeUpdate() {
                var me = this;
                var explainPlayer = new CloudVodPlayer();
                explainPlayer.init({
                    "uu": "eromwdg8vf",
                    "vu": me.explain_vid,
                    "pu": "F00E494D54",
                    "auto_play": 0,
                    "gpcflag": 1,
                    "width": '100%',
                    "height": 600,
                    "lang": "zh_CN"
                }, "explain");
                var standardPlayer = new CloudVodPlayer();
                standardPlayer.init({
                    "uu": "eromwdg8vf",
                    "vu": me.standard_vid,
                    "pu": "F00E494D54",
                    "auto_play": 0,
                    "gpcflag": 1,
                    "width": '100%',
                    "height": 600,
                    "lang": "zh_CN"
                }, "standard");
            },

            methods: {
                init: function init() {
                    var me = this;
                    var id = window.location.href.match(/\/taskmore\/(\d+)/)[1];
                    if (!id) {
                        console.log("异常调用");
                        return;
                    }
                    this.$store.dispatch('getTaskList', {
                        me: me,
                        id: id
                    });
                }
            }
        });
    }
};
exports.default = taskMore;

/***/ }),

/***/ 2:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_database__ = __webpack_require__(3);


/* harmony default export */ __webpack_exports__["default"] = (new Vuex.Store({
    actions: __WEBPACK_IMPORTED_MODULE_0__actions__,
    modules: {
        database: __WEBPACK_IMPORTED_MODULE_1__modules_database__["a" /* default */]
    }
}));

/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _taskMore = __webpack_require__(14);

var _taskMore2 = _interopRequireDefault(_taskMore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_taskMore2.default.init();

/***/ }),

/***/ 28:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 3:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutation_types_js__ = __webpack_require__(0);

const state = {
        data: [],
        examine: {},
        bookTotalPage: {
            totalPage: "",
            lastPage: ""
        },
        taskData: {
            desc: "System missing parameters",
            explain_vid: "",
            standard_vid: ""
        },
        bookDescList: {
            booknamelist: ""
        },
        result: {}
    }
    // mutations
const mutations = {
    [__WEBPACK_IMPORTED_MODULE_0__mutation_types_js__["a" /* GET_BOOK_TOTAL_PAGE */]](state, {
        datas
    }) {

        datas = parseInt(datas) - 2;
        state.bookTotalPage = {
            totalPage: "hard p" + datas,
            lastPage: "hard fixed back-side p" + (datas - 1)
        }
    },
    [__WEBPACK_IMPORTED_MODULE_0__mutation_types_js__["b" /* GET_BOOKDESC_INFO */]](state, {
        datas
    }) {
        state.bookDescList = {
            booknamelist: datas.booknamelist
        }
    },
    [__WEBPACK_IMPORTED_MODULE_0__mutation_types_js__["c" /* ADD_INFO */]](state, {
        datas
    }) {
        state.data = datas.course;
        state.examine = datas.result;
    },
    [__WEBPACK_IMPORTED_MODULE_0__mutation_types_js__["d" /* GET_TASK_INFO */]](state, {
        datas
    }) {
        // console.warn('接受到的变量',datas.explain_vid);
        state.taskData.desc = datas.desc;
        state.taskData.explain_vid = datas.explain_vid;
        state.taskData.standard_vid = datas.standard_vid;
    },
    [__WEBPACK_IMPORTED_MODULE_0__mutation_types_js__["e" /* GET_VIDEO */]](state, {
        datas
    }) {
        // console.log("datas",datas)
        state.result = {
            list: datas.coursedata.courselist,
            title: datas.title
        }
    }

}

/* harmony default export */ __webpack_exports__["a"] = ({
    state,
    mutations
});


/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/images/doc.78440.png";

/***/ })

},[22]);