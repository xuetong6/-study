webpackJsonp([0],[
/* 0 */
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
/* 1 */
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
/* 2 */
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
/* 3 */
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
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

__webpack_require__(26);

var _store = __webpack_require__(2);

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapState = Vuex.mapState;

var course = {
    init: function init() {
        var vm = new Vue({
            store: _store2.default,
            el: '#app',
            computed: mapState({
                datas: function datas(state) {
                    return state.database.data;
                },
                examine: function examine(state) {
                    return state.database.examine;
                }
            }),
            data: {
                isShow: false,
                msg: '课程大纲'
            },
            methods: {
                initpage: function initpage() {
                    var me = this;
                    this.$store.dispatch('addInfo', {
                        me: me
                    });
                }
            },
            mounted: function mounted() {
                this.initpage();
            }
        });
    }
};
exports.default = course;

/***/ }),
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

__webpack_require__(29);

var tools = {
    init: function init() {
        // console.log('tools init');
    }
};
exports.default = tools;

/***/ }),
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _course = __webpack_require__(12);

var _course2 = _interopRequireDefault(_course);

var _tools = __webpack_require__(15);

var _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tools2.default.init();
_course2.default.init();

/***/ }),
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 27 */,
/* 28 */,
/* 29 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
],[21]);