'use strict';
let bookDeskController = {
    index() {
        return async(ctx, next) => {
            ctx.body = await ctx.render('bookDesk/pages/bookDesk.html', {
                title: "一灯学堂学员学习系统 - 我的成就",
                userinfo: ctx.session.userInfo.user_info
            });
        }
    },
    getData() {
        return async(ctx, next) => {
            ctx.body = {
                booknamelist: [
                    [{
                        link: "/book/travis",
                        imgUrl: "/book/images/travisci.png"
                    }, {
                        link: "/book/jenkins",
                        imgUrl: "/book/images/jenkins.png"
                    }, {
                        link: "/book/webpack",
                        imgUrl: "/book/images/webpack.png"
                    }, {
                        link: "/book/yeoman",
                        imgUrl: "/book/images/yeoman.png"
                    }, {
                        link: "/book/svn",
                        imgUrl: "/book/images/svn.png"
                    }, {
                        link: "/book/github",
                        imgUrl: "/book/images/github.png"
                    }]
                ]
            };
        }
    }
};
export
default bookDeskController;