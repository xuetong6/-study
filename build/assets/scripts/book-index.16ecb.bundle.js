webpackJsonp([5],[function(t,e,o){t.exports=!o(3)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e){var o=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=o)},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e){var o=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=o)},function(t,e,o){var n=o(15),r=o(20),a=o(22),i=Object.defineProperty;e.f=o(0)?Object.defineProperty:function(t,e,o){if(n(t),e=a(e,!0),n(o),r)try{return i(t,e,o)}catch(t){}if("get"in o||"set"in o)throw TypeError("Accessors not supported!");return"value"in o&&(t[e]=o.value),t}},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.ADD_INFO="ADD_INFO";e.GET_BOOKDESC_INFO="GET_BOOKDESC_INFO";e.CHECKOUT_REQUEST="CHECKOUT_REQUEST";e.GET_TASK_INFO="GET_TASK_INFO";e.GET_VIDEO="GET_VIDEO";e.GET_BOOK_TOTAL_PAGE="GET_BOOK_TOTAL_PAGE";e.STUDENTDATA="STUDENTDATA"},,function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getBookDescList=e.getTaskList=e.getBookTotalPage=e.studentdata=e.getVideo=e.addInfo=void 0;var n=o(6),r=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e.default=t,e}(n);e.addInfo=function(t,e){var o=t.commit;e.me.$http.get("index/getdata").then(function(t){var e=t.body.data;o(r.ADD_INFO,{datas:e})},function(t){})},e.getVideo=function(t,e){var o=t.commit,n=e.me,a=e.targetUrl,i="/videoplayer/"+a;n.$http.get(i).then(function(t){var e=t.body;o(r.GET_VIDEO,{datas:e})},function(t){})},e.studentdata=function(t,e){var o=t.commit;e.me.$http.get("/student/getData").then(function(t){var e={city:t.body.city,result:t.body.result,scalay:t.body.scalay,score:t.body.score};o(r.STUDENTDATA,{studentData:e})},function(t){})},e.getBookTotalPage=function(t,e){var o=t.commit,n=e.me,a=e.bookdata;n.$http.get(""+a).then(function(t){var e=t.body.data;o(r.GET_BOOK_TOTAL_PAGE,{datas:e}),n.booklength=e-2,n.bookSidePage=n.booklength-1,n.init(n)},function(t){})},e.getTaskList=function(t,e){var o=t.commit,n=e.me,a=e.id;n.$http.get("/taskMore/getData/"+a).then(function(t){var e=t.body.taskdata;o(r.GET_TASK_INFO,{datas:e})},function(t){})},e.getBookDescList=function(t,e){var o=t.commit;e.me.$http.get("/bookDesK/getData").then(function(t){var e=t.body;o(r.GET_BOOKDESC_INFO,{datas:e})},function(t){})}},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o(8),r=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e.default=t,e}(n),a=o(10),i=function(t){return t&&t.__esModule?t:{default:t}}(a);e.default=new Vuex.Store({actions:r,modules:{database:i.default}})},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,r=o(12),a=function(t){return t&&t.__esModule?t:{default:t}}(r),i=o(6),s=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e.default=t,e}(i),u={data:[],examine:{},bookTotalPage:{totalPage:"",lastPage:""},taskData:{desc:"System missing parameters",explain_vid:"",standard_vid:""},bookDescList:{booknamelist:""},result:{},studentData:{}},c=(n={},(0,a.default)(n,s.GET_BOOK_TOTAL_PAGE,function(t,e){var o=e.datas;o=parseInt(o)-2,t.bookTotalPage={totalPage:"hard p"+o,lastPage:"hard fixed back-side p"+(o-1)}}),(0,a.default)(n,s.STUDENTDATA,function(t,e){var o=e.studentData;t.studentData=o}),(0,a.default)(n,s.GET_BOOKDESC_INFO,function(t,e){var o=e.datas;t.bookDescList={booknamelist:o.booknamelist}}),(0,a.default)(n,s.ADD_INFO,function(t,e){var o=e.datas;t.data=o.course,t.examine=o.result}),(0,a.default)(n,s.GET_TASK_INFO,function(t,e){var o=e.datas;t.taskData.desc=o.desc,t.taskData.explain_vid=o.explain_vid,t.taskData.standard_vid=o.standard_vid}),(0,a.default)(n,s.GET_VIDEO,function(t,e){var o=e.datas;t.result={list:o.coursedata.courselist,title:o.title}}),n);e.default={state:u,mutations:c}},function(t,e,o){t.exports={default:o(13),__esModule:!0}},function(t,e,o){"use strict";e.__esModule=!0;var n=o(11),r=function(t){return t&&t.__esModule?t:{default:t}}(n);e.default=function(t,e,o){return e in t?(0,r.default)(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}},function(t,e,o){o(23);var n=o(2).Object;t.exports=function(t,e,o){return n.defineProperty(t,e,o)}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,o){var n=o(1);t.exports=function(t){if(!n(t))throw TypeError(t+" is not an object!");return t}},function(t,e,o){var n=o(14);t.exports=function(t,e,o){if(n(t),void 0===e)return t;switch(o){case 1:return function(o){return t.call(e,o)};case 2:return function(o,n){return t.call(e,o,n)};case 3:return function(o,n,r){return t.call(e,o,n,r)}}return function(){return t.apply(e,arguments)}}},function(t,e,o){var n=o(1),r=o(4).document,a=n(r)&&n(r.createElement);t.exports=function(t){return a?r.createElement(t):{}}},function(t,e,o){var n=o(4),r=o(2),a=o(16),i=o(19),s=function(t,e,o){var u,c,d,l=t&s.F,f=t&s.G,p=t&s.S,b=t&s.P,v=t&s.B,g=t&s.W,h=f?r:r[e]||(r[e]={}),m=h.prototype,k=f?n:p?n[e]:(n[e]||{}).prototype;f&&(o=e);for(u in o)(c=!l&&k&&void 0!==k[u])&&u in h||(d=c?k[u]:o[u],h[u]=f&&"function"!=typeof k[u]?o[u]:v&&c?a(d,n):g&&k[u]==d?function(t){var e=function(e,o,n){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,o)}return new t(e,o,n)}return t.apply(this,arguments)};return e.prototype=t.prototype,e}(d):b&&"function"==typeof d?a(Function.call,d):d,b&&((h.virtual||(h.virtual={}))[u]=d,t&s.R&&m&&!m[u]&&i(m,u,d)))};s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,s.U=64,s.R=128,t.exports=s},function(t,e,o){var n=o(5),r=o(21);t.exports=o(0)?function(t,e,o){return n.f(t,e,r(1,o))}:function(t,e,o){return t[e]=o,t}},function(t,e,o){t.exports=!o(0)&&!o(3)(function(){return 7!=Object.defineProperty(o(17)("div"),"a",{get:function(){return 7}}).a})},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e,o){var n=o(1);t.exports=function(t,e){if(!n(t))return t;var o,r;if(e&&"function"==typeof(o=t.toString)&&!n(r=o.call(t)))return r;if("function"==typeof(o=t.valueOf)&&!n(r=o.call(t)))return r;if(!e&&"function"==typeof(o=t.toString)&&!n(r=o.call(t)))return r;throw TypeError("Can't convert object to primitive value")}},function(t,e,o){var n=o(18);n(n.S+n.F*!o(0),"Object",{defineProperty:o(5).f})},,,,,,,,,,,,,,function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),o(75);var n=o(9),r=function(t){return t&&t.__esModule?t:{default:t}}(n),a=Vuex.mapState,i={init:function(){new Vue({el:"#canvas",store:r.default,data:{dom:{},booklength:"",bookA:"",bookB:""},computed:a({totalPage:function(t){return t.database.bookTotalPage.totalPage},lastPage:function(t){return t.database.bookTotalPage.lastPage}}),created:function(){},updated:function(){},mounted:function(){var t=this;/^(\w+):\/\/([^\/:]*)(?::(\d+))?\/([^\/]*)(\/.*)/.exec(location.href);var e=RegExp.$5.split("#")[0].replace("/",""),o="/book/getData/"+e;this.$store.dispatch("getBookTotalPage",{me:t,bookdata:o})},methods:{init:function(t){function e(){var n=$(".sj-book");if(window._thumbPreview=null,0==n.width()||0==n.height())return void setTimeout(e,10);$("#book-zoom").mousewheel(function(t,e,o,n){var r=$(this).data(),a=$(".sj-book"),i=30*$("#slider").slider("value");void 0===r.scrollX&&(r.scrollX=i,r.scrollPage=a.turn("page")),r.scrollX=Math.min(30*$("#slider").slider("option","max"),Math.max(0,r.scrollX+o));var s=Math.round(r.scrollX/30),u=Math.min(a.turn("pages"),Math.max(1,2*s-2));-1==$.inArray(r.scrollPage,a.turn("view",u))&&(r.scrollPage=u,a.turn("page",u)),r.scrollTimer&&clearInterval(r.scrollTimer),r.scrollTimer=setTimeout(function(){r.scrollX=void 0,r.scrollPage=void 0,r.scrollTimer=void 0},1e3)}),$("#slider").slider({min:1,max:100,start:function(t,e){d(!1)},slide:function(t,e){},stop:function(){window._thumbPreview&&_thumbPreview.removeClass("show"),$(".sj-book").turn("page",Math.max(1,2*$(this).slider("value")-2))}}),Hash.on("^page/([0-9]*)$",{yep:function(t,e){var o=e[1];void 0!==o&&$(".sj-book").turn("is")&&$(".sj-book").turn("page",o)},nop:function(t){$(".sj-book").turn("is")&&$(".sj-book").turn("page",1)}}),$(document).keydown(function(t){switch(t.keyCode){case 37:$(".sj-book").turn("previous");break;case 39:$(".sj-book").turn("next")}}),n.bind($.isTouch?"touchend":"click",s);var u=Number(t.booklength),c=t.booklength,p=c-1;n.turn({elevation:50,acceleration:!l(),autoCenter:!0,gradients:!0,duration:1e3,pages:u,when:{turning:function(e,n,r){$(".sj-book  .p"+c).css("background-image","url(./pages/"+f+"/book.png)"),$(".sj-book  .p"+c).css("background-position"," -1481px 0 ");var a=$(this),i=a.turn("page"),s=a.turn("pages");if(i>3&&i<s-3){if(1==n)return a.turn("page",2).turn("stop").turn("page",n),void e.preventDefault();if(n==s)return a.turn("page",s-1).turn("stop").turn("page",n),void e.preventDefault()}else if(n>3&&n<s-3){if(1==i)return a.turn("page",2).turn("stop").turn("page",n),void e.preventDefault();if(i==s)return a.turn("page",s-1).turn("stop").turn("page",n),void e.preventDefault()}o(a,n),n>=2?$(".sj-book .p2").addClass("fixed"):$(".sj-book .p2").removeClass("fixed"),n<a.turn("pages")?$(".sj-book .p"+t.bookSidePage).addClass("fixed"):$(".sj-book .p"+t.bookSidePage).removeClass("fixed"),Hash.go("page/"+n).update()},turned:function(t,e,n){var r=$(this);2!=e&&3!=e||r.turn("peel","br"),o(r),$("#slider").slider("value",i(r,e)),r.turn("center"),$(".sj-book  .p"+p).css("background-image","url(./pages/"+f+"/book.png)"),$(".sj-book  .p"+p).css("background-position"," -998px 0 ")},start:function(t,e){d(!0)},end:function(t,e){var n=$(this);o(n),setTimeout(function(){$("#slider").slider("value",i(n))},1),d(!1)},missing:function(t,e){for(var o=0;o<e.length;o++)r(e[o],$(this))}}}),$("#slider").slider("option","max",a(n)),n.addClass("animated"),$("#canvas").css({visibility:""}),$(".sj-book .p1").css("background-image","url(./pages/"+f+"/book.png)"),$(".sj-book .p2").css("background-image","url(./pages/"+f+"/book.png)");t.booklength}function o(e,o){var n=e.turn("page"),r=e.turn("pages"),a=16*Math.min(1,2*n/r);o=o||n,o>3?$(".sj-book .p2 .depth").css({width:a,left:20-a}):$(".sj-book .p2 .depth").css({width:0}),a=16*Math.min(1,2*(r-n)/r),o<r-3?$(".sj-book .p"+t.bookSidePage+" .depth").css({width:a,right:20-a}):$(".sj-book .p"+t.bookSidePage+" .depth").css({width:0})}function n(t){$.ajax({url:"pages/"+f+"/page"+t+".html"}).done(function(e){$(".sj-book .p"+t).html(e.replace("samples/steve-jobs/",""))})}function r(t,e){e.turn("pages");if(!e.turn("hasPage",t)){var o=$("<div />",{class:"own-size",css:{width:460,height:582}}).html('<div class="loader"></div>');e.turn("addPage",o,t)&&n(t)}}function a(t){return t.turn("pages")/2+1}function i(t,e){return parseInt((e||t.turn("page"))/2+1,10)}function s(t){$(".sj-book").data().zoomIn?c():t.target&&$(t.target).hasClass("zoom-this")&&u($(t.target))}function u(t){var e,o,n=$("<div />",{class:"zoom-pic"}),r=$.cssTransitionEnd(),a=$("<img />"),i=$("#book-zoom").width()/2,s=$("#book-zoom").height()/2,u=$("#book-zoom").offset(),d={left:t.offset().left-u.left,top:t.offset().top-u.top},l=function(){$("#book-zoom").unbind(r),$(".sj-book").data().zoomIn&&(n.appendTo($("body")),a.css({margin:e.top+"px "+e.left+"px"}).appendTo(n).fadeOut(0).fadeIn(500))};$(".sj-book").data().zoomIn=!0,$(".sj-book").turn("disable",!0),$(window).resize(c),n.click(c),a.load(function(){var n=$(this)[0].width,a=$(this)[0].height,c=n/t.width(),f={top:(d.top-s)*c+s+u.top,left:(d.left-i)*c+i+u.left};e={top:($(window).height()-a)/2,left:($(window).width()-n)/2},o={top:e.top-f.top,left:e.left-f.left},$(".samples .bar").css({visibility:"hidden"}),$("#slider-bar").hide(),$("#book-zoom").transform("translate("+o.left+"px, "+o.top+"px)scale("+c+", "+c+")"),r?$("#book-zoom").bind(r,l):setTimeout(l,1e3)}),a.attr("src",t.attr("src"))}function c(){var t=$.cssTransitionEnd(),e=function(e){$("#book-zoom").unbind(t),$(".sj-book").turn("disable",!1),d(!1)};$(".sj-book").data().zoomIn=!1,$(window).unbind("resize",c),d(!0),$(".zoom-pic").remove(),$("#book-zoom").transform("scale(1, 1)"),$(".samples .bar").css({visibility:"visible"}),$("#slider-bar").show(),t?$("#book-zoom").bind(t,e):setTimeout(e,1e3)}function d(t){Modernizr&&Modernizr.csstransforms&&$("#slider .ui-slider-handle").css({zIndex:t?-1:1e4})}function l(){return-1!=navigator.userAgent.indexOf("Chrome")}/^(\w+):\/\/([^\/:]*)(?::(\d+))?\/([^\/]*)(\/.*)/.exec(location.href);var f=RegExp.$5.split("#")[0].replace("/","");$("#canvas").css({visibility:"hidden"}),yepnope({test:Modernizr.csstransforms,yep:["./lib/turn.min.js"],nope:["./lib/turn.html4.min.js","./css/jquery.ui.html4.css"],both:["css/jquery.ui.css"],complete:e}),$(".sj-book .hard").css("width","469px")}}})}};e.default=i},,,,,,,,,,,,,,,,,,,,,,,,,function(t,e,o){"use strict";var n=o(37);(function(t){return t&&t.__esModule?t:{default:t}})(n).default.init()},,,,,,,,,,,,,function(t,e){}],[62]);