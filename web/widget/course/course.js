import "./course.css";
import store from "../store";
const mapState = Vuex.mapState;

let course = {
    init() {
        new Vue({
            store,
            el: "#app",
            computed: mapState({
                datas: state => state.database.data,
                examine: state => state.database.examine,
            }),
            data: {
                course: true,
                results: true,
                isShow: false,
                msg: "课程大纲",
            },
            methods: {
                initpage: function() {
                    let me = this;
                    this.$store.dispatch("addInfo", {
                        me,
                    });
                },
            },
            mounted() {
                console.log(this.datas);
                if (this.datas) {
                    this.course = false;
                }
                if (this.examine) {
                    this.results = false;
                }
                this.initpage();
            },
        });
    },
};
export
default course;