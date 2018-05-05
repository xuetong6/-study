import "./taskMore.css";
import store from "../store";
const mapState = Vuex.mapState;
let taskMore = {
    init() {
        const _write = require("./images/doc.png");
        document.getElementById("write").src = _write;
        new Vue({
            store,
            el: "#taskinfos",
            computed: mapState({
                desc: state => state.database.taskData.desc,
                explain_vid: state => state.database.taskData.explain_vid,
                standard_vid: state => state.database.taskData.standard_vid,
            }),
            mounted() {
                this.init();
            },
            beforeUpdate() {
                const me = this;
                console.log("me.explain_vid", me.explain_vid);
                const explainPlayer = new CloudVodPlayer();
                explainPlayer.init({
                    "uu": "eromwdg8vf",
                    "vu": me.explain_vid,
                    "pu": "F00E494D54",
                    "auto_play": 0,
                    "gpcflag": 1,
                    "width": "100%",
                    "height": 600,
                    "lang": "zh_CN",
                }, "explain");
                const standardPlayer = new CloudVodPlayer();
                standardPlayer.init({
                    "uu": "eromwdg8vf",
                    "vu": me.standard_vid,
                    "pu": "F00E494D54",
                    "auto_play": 0,
                    "gpcflag": 1,
                    "width": "100%",
                    "height": 600,
                    "lang": "zh_CN",
                }, "standard");
            },
            methods: {
                init() {
                    const me = this;
                    const id = window.location.href.match(/\/taskmore\/(\d+)/)[1];
                    if (!id) {
                        console.log("异常调用");
                        return;
                    }
                    this.$store.dispatch("getTaskList", {
                        me,
                        id,
                    });
                },
            },
        });
    },
};
export
default taskMore;