import './bookdesk.css';
import store from '../store';
const  mapState = Vuex.mapState;

let bookDesk = {
    init() {
        new Vue({
            el: '#bookdesc-app',
            store,
            data: {
                seenmsg: '',
                msg:'text',
                lenBool: "",
            },
            computed: mapState({
                booknamelist: state => state.database.bookDescList.booknamelist,
            }),
            created(){
                this.getData();
                this.init();
            },
            // updated() {
            //     // var doms=document.getElementById("test").getElementsByTagName("ul")
            //     // for(let i=0;i<doms.length;i++){
            //     //     doms[i].style.display="block"
            //     // }

            //     // this.lenBool = (this.list.length == 0);
            // },
            // mounted() {
            //     //this.init();
            // },
            methods: {
                init() {
                    yepnope({
                        test: Modernizr.csstransforms,
                        nope: ['lib/turn.html4.min.js', 'css/jquery.ui.css'],
                    });
                    let _gaq = _gaq || [];
                    _gaq.push(['_setAccount', 'UA-28960832-1']);
                    _gaq.push(['_trackPageview']);

                },
                getData() {
                    let me = this;
                    this.$store.dispatch('getBookDescList', {
                        me,
                    });
                },
            },
        });
    },
};
export
default bookDesk;
