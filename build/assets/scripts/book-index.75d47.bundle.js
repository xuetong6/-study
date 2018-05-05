webpackJsonp([6],{

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

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

__webpack_require__(24);

var _store = __webpack_require__(2);

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapState = Vuex.mapState;

var book = {
    init: function init() {
        var app = new Vue({
            el: '#canvas',
            store: _store2.default,
            data: {
                dom: {},
                booklength: "",
                bookA: "",
                bookB: ""

            },
            computed: mapState({
                totalPage: function totalPage(state) {
                    return state.database.bookTotalPage.totalPage;
                },
                lastPage: function lastPage(state) {
                    return state.database.bookTotalPage.lastPage;
                }
            }),
            created: function created() {},
            updated: function updated() {
                //this.init(this);
            },
            mounted: function mounted() {
                var me = this;

                // / book / getData
                var temReg = /^(\w+):\/\/([^\/:]*)(?::(\d+))?\/([^\/]*)(\/.*)/;
                temReg.exec(location.href);
                var bookListName = RegExp.$5.split("#")[0].replace("/", "");
                var bookdata = '/book/getData/' + bookListName;

                this.$store.dispatch('getBookTotalPage', {
                    me: me,
                    bookdata: bookdata
                });
            },

            methods: {
                init: function init(me) {
                    //解析url，获取请求的book目录
                    var temReg = /^(\w+):\/\/([^\/:]*)(?::(\d+))?\/([^\/]*)(\/.*)/;
                    temReg.exec(location.href);
                    var bookListName = RegExp.$5.split("#")[0].replace("/", "");

                    function loadApp() {

                        var flipbook = $('.sj-book');
                        window._thumbPreview = null;

                        // Check if the CSS was already loaded

                        if (flipbook.width() == 0 || flipbook.height() == 0) {
                            setTimeout(loadApp, 10);
                            return;
                        }

                        // Mousewheel

                        $('#book-zoom').mousewheel(function (event, delta, deltaX, deltaY) {

                            var data = $(this).data(),
                                step = 30,
                                flipbook = $('.sj-book'),
                                actualPos = $('#slider').slider('value') * step;

                            if (typeof data.scrollX === 'undefined') {
                                data.scrollX = actualPos;
                                data.scrollPage = flipbook.turn('page');
                            }

                            data.scrollX = Math.min($("#slider").slider('option', 'max') * step, Math.max(0, data.scrollX + deltaX));

                            var actualView = Math.round(data.scrollX / step),
                                page = Math.min(flipbook.turn('pages'), Math.max(1, actualView * 2 - 2));

                            if ($.inArray(data.scrollPage, flipbook.turn('view', page)) == -1) {
                                data.scrollPage = page;
                                flipbook.turn('page', page);
                            }

                            if (data.scrollTimer) clearInterval(data.scrollTimer);

                            data.scrollTimer = setTimeout(function () {
                                data.scrollX = undefined;
                                data.scrollPage = undefined;
                                data.scrollTimer = undefined;
                            }, 1000);
                        });

                        // Slider

                        $("#slider").slider({
                            min: 1,
                            max: 100,

                            start: function start(event, ui) {
                                moveBar(false);
                            },

                            slide: function slide(event, ui) {

                                //setPreview(ui.value);

                            },

                            stop: function stop() {

                                if (window._thumbPreview) _thumbPreview.removeClass('show');

                                $('.sj-book').turn('page', Math.max(1, $(this).slider('value') * 2 - 2));
                            }
                        });

                        // URIs

                        Hash.on('^page\/([0-9]*)$', {
                            yep: function yep(path, parts) {

                                var page = parts[1];

                                if (page !== undefined) {
                                    if ($('.sj-book').turn('is')) $('.sj-book').turn('page', page);
                                }
                            },
                            nop: function nop(path) {

                                if ($('.sj-book').turn('is')) $('.sj-book').turn('page', 1);
                            }
                        });

                        // Arrows

                        $(document).keydown(function (e) {

                            var previous = 37,
                                next = 39;

                            switch (e.keyCode) {
                                case previous:

                                    $('.sj-book').turn('previous');

                                    break;
                                case next:

                                    $('.sj-book').turn('next');

                                    break;
                            }
                        });

                        // Flipbook

                        flipbook.bind($.isTouch ? 'touchend' : 'click', zoomHandle);

                        var ThisBook = Number(me.booklength);
                        var endPage = me.booklength; //12
                        var twoPage = endPage - 1; //11   

                        flipbook.turn({
                            elevation: 50,
                            acceleration: !isChrome(),
                            autoCenter: true,
                            gradients: true,
                            duration: 1000,
                            pages: ThisBook,
                            when: {
                                turning: function turning(e, page, view) {

                                    $(".sj-book  .p" + ("" + endPage + "")).css("background-image", 'url(./pages/' + bookListName + '/book.png)');
                                    $(".sj-book  .p" + ("" + endPage + "")).css("background-position", ' -1481px 0 ');
                                    var book = $(this),
                                        currentPage = book.turn('page'),
                                        pages = book.turn('pages');

                                    if (currentPage > 3 && currentPage < pages - 3) {

                                        if (page == 1) {
                                            book.turn('page', 2).turn('stop').turn('page', page);
                                            e.preventDefault();
                                            return;
                                        } else if (page == pages) {
                                            book.turn('page', pages - 1).turn('stop').turn('page', page);
                                            e.preventDefault();
                                            return;
                                        }
                                    } else if (page > 3 && page < pages - 3) {
                                        if (currentPage == 1) {
                                            book.turn('page', 2).turn('stop').turn('page', page);
                                            e.preventDefault();
                                            return;
                                        } else if (currentPage == pages) {
                                            book.turn('page', pages - 1).turn('stop').turn('page', page);
                                            e.preventDefault();
                                            return;
                                        }
                                    }

                                    updateDepth(book, page);

                                    if (page >= 2) $('.sj-book .p2').addClass('fixed');else $('.sj-book .p2').removeClass('fixed');

                                    if (page < book.turn('pages')) $('.sj-book .p' + me.bookSidePage).addClass('fixed');else $('.sj-book .p' + me.bookSidePage).removeClass('fixed');

                                    Hash.go('page/' + page).update();
                                },

                                turned: function turned(e, page, view) {

                                    var book = $(this);

                                    if (page == 2 || page == 3) {
                                        book.turn('peel', 'br');
                                    }

                                    updateDepth(book);

                                    $('#slider').slider('value', getViewNumber(book, page));

                                    book.turn('center');

                                    //var endPage = me.booklength //12
                                    //var twoPage = endPage - 1 //11

                                    $(".sj-book  .p" + ("" + twoPage + "")).css("background-image", 'url(./pages/' + bookListName + '/book.png)');
                                    //$(".sj-book  .p" + ("" + endPage + "")).css("background-image", 'url(./pages/' + bookListName + '/book.png)');


                                    $(".sj-book  .p" + ("" + twoPage + "")).css("background-position", ' -998px 0 ');
                                    //$(".sj-book  .p" + ("" + endPage + "")).css("background-position", ' -1412px 0 ');
                                },

                                start: function start(e, pageObj) {

                                    moveBar(true);
                                },

                                end: function end(e, pageObj) {

                                    var book = $(this);

                                    updateDepth(book);

                                    setTimeout(function () {

                                        $('#slider').slider('value', getViewNumber(book));
                                    }, 1);

                                    moveBar(false);
                                },

                                missing: function missing(e, pages) {

                                    for (var i = 0; i < pages.length; i++) {
                                        addPage(pages[i], $(this));
                                    }
                                }
                            }
                        });

                        $('#slider').slider('option', 'max', numberOfViews(flipbook));

                        flipbook.addClass('animated');

                        // Show canvas

                        $('#canvas').css({
                            visibility: ''
                        });

                        $(".sj-book .p1").css("background-image", 'url(./pages/' + bookListName + '/book.png)');
                        $(".sj-book .p2").css("background-image", 'url(./pages/' + bookListName + '/book.png)');

                        var domA = ".p" + me.booklength;
                        // '" + domA + "'"
                        // $(".sj-book .p111").css("background-image", 'url(./pages/' + bookListName + '/book.png)');

                    }

                    $('#canvas').css({
                        visibility: 'hidden'
                    });
                    yepnope({
                        test: Modernizr.csstransforms,
                        yep: ['./lib/turn.min.js'],
                        nope: ['./lib/turn.html4.min.js', './css/jquery.ui.html4.css'],
                        both: ['css/jquery.ui.css'],

                        complete: loadApp
                    });

                    /**************************/
                    /**************************/
                    /**************************/
                    /**************************/
                    /**************************/
                    /* Steve jobs' book */

                    function updateDepth(book, newPage) {

                        var page = book.turn('page'),
                            pages = book.turn('pages'),
                            depthWidth = 16 * Math.min(1, page * 2 / pages);

                        newPage = newPage || page;
                        if (newPage > 3) $('.sj-book .p2 .depth').css({
                            width: depthWidth,
                            left: 20 - depthWidth
                        });else $('.sj-book .p2 .depth').css({
                            width: 0
                        });

                        depthWidth = 16 * Math.min(1, (pages - page) * 2 / pages);

                        if (newPage < pages - 3) $('.sj-book .p' + me.bookSidePage + ' .depth').css({
                            width: depthWidth,
                            right: 20 - depthWidth
                        });else $('.sj-book .p' + me.bookSidePage + ' .depth').css({
                            width: 0
                        });
                    }

                    function loadPage(page) {

                        // $.ajax({
                        //     url: 'pages/page' + page + '.html'
                        // }).
                        // done(function(pageHtml) {
                        //     $('.sj-book .p' + page).html("哇哈哈");
                        // });

                        $.ajax({
                            url: 'pages/' + bookListName + '/page' + page + '.html'
                        }).done(function (pageHtml) {

                            // var pageLength = Number(me.booklength) - 3

                            // if (page == pageLength) {
                            //     console.log("这是page", page)
                            //     $(".sj-book  .p" + (page + 2)).css("background-image", 'url(./pages/' + bookListName + '/book.png)');
                            //     $(".sj-book  .p" + (page + 3)).css("background-image", 'url(./pages/' + bookListName + '/book.png)');
                            // }


                            $('.sj-book .p' + page).html(pageHtml.replace('samples/steve-jobs/', ''));
                        });
                    }

                    function addPage(page, book) {

                        var id,
                            pages = book.turn('pages');

                        if (!book.turn('hasPage', page)) {

                            var element = $('<div />', {
                                'class': 'own-size',
                                css: {
                                    width: 460,
                                    height: 582
                                }
                            }).html('<div class="loader"></div>');

                            if (book.turn('addPage', element, page)) {
                                loadPage(page);
                            }
                        }
                    }

                    function numberOfViews(book) {

                        return book.turn('pages') / 2 + 1;
                    }

                    function getViewNumber(book, page) {

                        return parseInt((page || book.turn('page')) / 2 + 1, 10);
                    }

                    function zoomHandle(e) {

                        if ($('.sj-book').data().zoomIn) zoomOut();else if (e.target && $(e.target).hasClass('zoom-this')) {
                            zoomThis($(e.target));
                        }
                    }

                    function zoomThis(pic) {

                        var position,
                            translate,
                            tmpContainer = $('<div />', {
                            'class': 'zoom-pic'
                        }),
                            transitionEnd = $.cssTransitionEnd(),
                            tmpPic = $('<img />'),
                            zCenterX = $('#book-zoom').width() / 2,
                            zCenterY = $('#book-zoom').height() / 2,
                            bookPos = $('#book-zoom').offset(),
                            picPos = {
                            left: pic.offset().left - bookPos.left,
                            top: pic.offset().top - bookPos.top
                        },
                            completeTransition = function completeTransition() {
                            $('#book-zoom').unbind(transitionEnd);

                            if ($('.sj-book').data().zoomIn) {
                                tmpContainer.appendTo($('body'));

                                tmpPic.css({
                                    margin: position.top + 'px ' + position.left + 'px'
                                }).appendTo(tmpContainer).fadeOut(0).fadeIn(500);
                            }
                        };

                        $('.sj-book').data().zoomIn = true;

                        $('.sj-book').turn('disable', true);

                        $(window).resize(zoomOut);

                        tmpContainer.click(zoomOut);

                        tmpPic.load(function () {
                            var realWidth = $(this)[0].width,
                                realHeight = $(this)[0].height,
                                zoomFactor = realWidth / pic.width(),
                                picPosition = {
                                top: (picPos.top - zCenterY) * zoomFactor + zCenterY + bookPos.top,
                                left: (picPos.left - zCenterX) * zoomFactor + zCenterX + bookPos.left
                            };

                            position = {
                                top: ($(window).height() - realHeight) / 2,
                                left: ($(window).width() - realWidth) / 2
                            };

                            translate = {
                                top: position.top - picPosition.top,
                                left: position.left - picPosition.left
                            };

                            $('.samples .bar').css({
                                visibility: 'hidden'
                            });
                            $('#slider-bar').hide();

                            $('#book-zoom').transform('translate(' + translate.left + 'px, ' + translate.top + 'px)' + 'scale(' + zoomFactor + ', ' + zoomFactor + ')');

                            if (transitionEnd) $('#book-zoom').bind(transitionEnd, completeTransition);else setTimeout(completeTransition, 1000);
                        });

                        tmpPic.attr('src', pic.attr('src'));
                    }

                    function zoomOut() {

                        var transitionEnd = $.cssTransitionEnd(),
                            completeTransition = function completeTransition(e) {
                            $('#book-zoom').unbind(transitionEnd);
                            $('.sj-book').turn('disable', false);

                            moveBar(false);
                        };

                        $('.sj-book').data().zoomIn = false;

                        $(window).unbind('resize', zoomOut);

                        moveBar(true);

                        $('.zoom-pic').remove();
                        $('#book-zoom').transform('scale(1, 1)');
                        $('.samples .bar').css({
                            visibility: 'visible'
                        });
                        $('#slider-bar').show();

                        if (transitionEnd) $('#book-zoom').bind(transitionEnd, completeTransition);else setTimeout(completeTransition, 1000);
                    }

                    function moveBar(yes) {
                        if (Modernizr && Modernizr.csstransforms) {
                            $('#slider .ui-slider-handle').css({
                                zIndex: yes ? -1 : 10000
                            });
                        }
                    }

                    function setPreview(view) {

                        var previewWidth = 115,
                            previewHeight = 73,

                        // previewSrc = './images/preview.png',
                        preview = $(_thumbPreview.children(':first')),
                            numPages = view == 1 || view == $('#slider').slider('option', 'max') ? 1 : 2,
                            width = numPages == 1 ? previewWidth / 2 : previewWidth;

                        _thumbPreview.addClass('no-transition').css({
                            width: width + 15,
                            height: previewHeight + 15,
                            top: -previewHeight - 30,
                            left: ($($('#slider').children(':first')).width() - width - 15) / 2
                        });

                        preview.css({
                            width: width,
                            height: previewHeight
                        });

                        if (preview.css('background-image') === '' || preview.css('background-image') == 'none') {

                            preview.css({
                                backgroundImage: 'url(' + previewSrc + ')'
                            });

                            setTimeout(function () {
                                _thumbPreview.removeClass('no-transition');
                            }, 0);
                        }

                        preview.css({
                            backgroundPosition: '0px -' + (view - 1) * previewHeight + 'px'
                        });
                    }

                    function isChrome() {

                        // Chrome's unsolved bug
                        // http://code.google.com/p/chromium/issues/detail?id=128488

                        return navigator.userAgent.indexOf('Chrome') != -1;
                    }
                    $(".sj-book .hard").css("width", "469px");
                }
            }
        });
    }
};
exports.default = book;

/***/ }),

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _book = __webpack_require__(10);

var _book2 = _interopRequireDefault(_book);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_book2.default.init();

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

/***/ 24:
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


/***/ })

},[16]);