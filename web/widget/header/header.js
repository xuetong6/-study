import "./header.css";
let header = {
    init() {
        // console.log('header init');
        const _logo = require("./images/logo.png");
        const _greentree = require("./images/greentree.png");
        document.getElementById("logo").src = _logo;
        document.getElementById("js-greentree").src = _greentree;
    },
};
export
default header;