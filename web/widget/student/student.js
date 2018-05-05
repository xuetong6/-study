import "./student.less";
import qe from "./qe.js";
import axios from "axios";
import store from "../store";
const mapState = Vuex.mapState;

qe();

let student = {
    init() {

        new Vue({
            store,
            el: "#students",
            computed: mapState({
                result: state => state.database.studentData.result,
                city: state => state.database.studentData.city,
                scalay: state => state.database.studentData.scalay,
                score: state => state.database.studentData.score,
            }),
            data() {
                return {
                    _result: "",
                    _city: "",
                    _scalay: "",
                    description: "自我描述",
                    study: false,
                };
            },
            created() {
                this.$http.get("/interestedcontroller").then(response => {

                    this._result = response.body.skills;
                    this._city = response.body.space;
                    this._scalay = response.body.salary;
                    this.description = response.body.description;


                }, response => {
                    console.error(response);
                });
            },
            methods: {
                studentData() {
                    let me = this;
                    this.$store.dispatch("studentdata", {
                        me,
                    });
                },
                body() {
                    // Custom a toolbar icon



                },
            },
            mounted() {
                this.body();
                this.studentData();



            },
            beforeUpdate() {
                let me = this;

                me.$nextTick(function() {
                    $("#post_body").qeditor({});

                    let toolbar = $("#post_body").parent().find(".qeditor_toolbar");
                    let link = $("<a href='#'><span class='icon-smile' title='smile'></span></a>");
                    console.log("link", link);
                    link.click(function() {

                        alert("Put you custom toolbar event in here.");
                        return false;
                    });
                    toolbar.append(link);

                    // Custom Insert Image icon event
                    // function changeInsertImageIconWithCustomEvent() {
                    //     var link = toolbar.find("a.qe-image");
                    //     link.attr("data-action", "");
                    //     link.click(function(e) {
                    //         alert("New insert image event");
                    //         return false;
                    //     });
                    //     alert("Image icon event has changed, you can click it to test");
                    //     return false;
                    // }


                    if (this.score > 6) {
                        this.study = false;
                    } else if (this.score < 6) {
                        this.study = true;
                    }
                    $("#submits").click(function() {
                        let kills = []; //掌握技能
                        let citys = []; //期望城市
                        // var scalay = [];
                        let list = []; //薪资


                        $("input:checkbox[name='result']:checked").each(function() { // 遍历name=test的多选框
                            // var p = document.getElementById("killData");
                            // var c = p.getElementsByTagName("li");

                            let ResultValues = parseInt($(this).val()); // 每一个被选中项的值

                            // var order = Number(ResultValues) - 1;
                            // kills.push({id:ResultValues,value:c[order].innerText})
                            if (kills.indexOf(ResultValues) == -1) {
                                kills.push(ResultValues);
                            }
                        });

                        $("input:checkbox[name='city']:checked").each(function() { // 遍历name=test的多选框
                            // var p = document.getElementById("cityData");
                            // var c = p.getElementsByTagName("li");


                            let CityValues = parseInt($(this).val()); // 每一个被选中项的值
                            // var orders = Number(CityValues) - 1;
                            // citys.push({id:CityValues,value:c[orders].innerText})
                            // 
                            if (citys.indexOf(CityValues) == -1) {
                                citys.push(CityValues);
                            }


                        });


                        // var wageData = document.getElementById("wageData");
                        // var _wageData = wageData.getElementsByTagName("span");

                        let wageOrder = $("input:radio[name=\"salary\"]:checked").val();



                        if (wageOrder != undefined) {
                            list.push(wageOrder);
                        }

                        //** ** ** ** ** ** ** ** ** ** 请选择掌握技能 ** ** ** ** ** ** ** ** ** ** *
                        if (kills.length == 0) {

                            $("#skillsTip").text("请选择掌握技能");
                            if (citys.length == 0) {
                                $("#locationTip").text("请选择期望地点");
                            } else {
                                $("#locationTip").text("");
                            }
                            if (list.length == undefined || list.length == 0) {
                                $("#salaryTip").text("请选择期望薪资");
                            } else {
                                $("#salaryTip").text("");
                            }
                            return false;
                        } else {
                            $("#skillsTip").text("");
                        }
                        //** ** ** ** ** ** ** ** ** ** 请选择掌期望地点 ** ** ** ** ** ** ** ** ** ** *
                        if (citys.length == 0) {

                            $("#locationTip").text("请选择期望地点");

                            if (list.length == undefined || list.length == 0) {
                                $("#salaryTip").text("请选择期望薪资");
                            } else {
                                $("#salaryTip").text("");
                            }
                            return false;

                        } else {
                            $("#locationTip").text("");
                        }
                        //** ** ** ** ** ** ** ** ** ** 请选择期望月薪 ** ** ** ** ** ** ** ** ** ** *

                        if (list.length == undefined || list.length == 0) {
                            $("#salaryTip").text("请选择期望薪资");
                            return false;
                        } else {
                            $("#salaryTip").text("");
                        }



                        let text = $("#post_body").val();



                        let result = {
                            uid: 123,
                            skills: kills,
                            space: citys,
                            salary: wageOrder,
                            description: encodeURIComponent(text),
                        };
                        console.log("result", result);


                        axios.post("/studentResume", {
                            result: result,
                            error_code: 0,
                            msg: "success.",
                        })
                            .then(function(response) {
                                if (response.status == 200) {
                                    alert("成功提交");
                                }
                            }).catch(function(error) {
                                console.log(error);
                            });
                    });

                    if (me._result != "" && me._result != undefined) {
                        // console.log("me._result", me._result)
                        me._result.map((list) => {
                            let key = list.id - 1;
                            me.$refs.keys[key].checked = true;
                        });
                    }
                    if (me._city != "" && me._city != undefined) {
                        me._city.map((list) => {
                            let key = list.id - 1;
                            me.$refs.city[key].checked = true;
                        });
                    }

                    if (me._scalay != "" && me._scalay != undefined) {
                        let Keys = me._scalay;
                        me.$refs.scalay[Keys].checked = true;
                    }



                    $(".qeditor_preview").html(this.description);
                });


            },



        });

    },

};
export
default student;