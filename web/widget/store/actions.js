import * as types from "./mutation-types.js";

export
const addInfo = ({
    commit,
}, {
    me,
}) => {
    me.$http.get("index/getdata").then(response => {
        let datas = response.body.data;
        commit(types.ADD_INFO, {
            datas,
        });
    }, response => {
        console.error(response);
    });

};


export
const getVideo = ({
    commit,
}, {
    me,
    targetUrl,
}) => {
    let apiUrl = "/videoplayer/" + targetUrl;
    me.$http.get(apiUrl).then(response => {
        let datas = response.body;
        commit(types.GET_VIDEO, {
            datas,
        });
    }, response => {
        console.error(response);
    });

};
//学生简历
//studentData
export
const studentdata = ({
    commit,
}, {
    me,
}) => {
    me.$http.get("/student/getData").then(response => {

        let studentData = {
            city: response.body.city,
            result: response.body.result,
            scalay: response.body.scalay,
            score: response.body.score,
        };



        commit(types.STUDENTDATA, {
            studentData,
        });
    }, response => {
        console.error(response);

    });
};

export const getBookTotalPage = ({
    commit,
}, {
    me,
    bookdata,
}) => {
    console.log(bookdata);
    me.$http.get("" + bookdata + "").then(response => {
        let datas = response.body.data;
        commit(types.GET_BOOK_TOTAL_PAGE, {
            datas,
        });

        me.booklength = datas - 2;
        me.bookSidePage = me.booklength - 1; //倒数第二页
        me.init(me);
    }, response => {
        console.error(response);

    });
};

export const getTaskList = ({
    commit,
}, {
    me,
    id,
}) => {
    // console.warn('系统id',id);
    me.$http.get("/taskMore/getData/" + id).then(response => {
        let datas = response.body.taskdata;
        commit(types.GET_TASK_INFO, {
            datas,
        });
    }, response => {
        console.error(response);
    });
};

export const getBookDescList = ({
    commit,
}, {
    me,
}) => {
    me.$http.get("/bookDesK/getData").then(response => {
        let datas = response.body;
        // console.log(datas);
        // console.log("*********************************");
        commit(types.GET_BOOKDESC_INFO, {
            datas,
        });
    }, response => {
        console.error(response);
        console.error("书籍列表模块");
    });
};