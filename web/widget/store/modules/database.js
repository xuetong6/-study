import * as types from "../mutation-types.js";
const state = {
    data: [],
    examine: {},
    bookTotalPage: {
        totalPage: "",
        lastPage: "",
    },
    taskData: {
        desc: "System missing parameters",
        explain_vid: "",
        standard_vid: "",
    },
    bookDescList: {
        booknamelist: "",
    },
    result: {},
    studentData: {

    },
};
// mutations
// 
const mutations = {
    [types.GET_BOOK_TOTAL_PAGE](state, {
        datas,
    }) {
        datas = parseInt(datas) - 2;
        state.bookTotalPage = {
            totalPage: "hard p" + datas,
            lastPage: "hard fixed back-side p" + (datas - 1),
        };
    },
    [types.STUDENTDATA](state, {
        studentData,
    }) {
        state.studentData = studentData;
        // console.log("    state.studentData", state.studentData)
    },
    [types.GET_BOOKDESC_INFO](state, {
        datas,
    }) {
        state.bookDescList = {
            booknamelist: datas.booknamelist,
        };
    },
    [types.ADD_INFO](state, {
        datas,
    }) {
        state.data = datas.course;
        state.examine = datas.result;
    },
    [types.GET_TASK_INFO](state, {
        datas,
    }) {
        // console.warn('接受到的变量',datas.explain_vid);
        state.taskData.desc = datas.desc;
        state.taskData.explain_vid = datas.explain_vid;
        state.taskData.standard_vid = datas.standard_vid;
    },
    [types.GET_VIDEO](state, {
        datas,
    }) {
        // console.log("datas",datas)
        state.result = {
            list: datas.coursedata.courselist,
            title: datas.title,
        };
    },

};

export
default {
    state,
    mutations,
};