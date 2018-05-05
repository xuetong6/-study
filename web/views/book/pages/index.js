module.exports = function(templateParams) {
    let _cssList = ["common", "book-index"];
    let webAssetsHelp = require("../../../webAssetsHelp.js")(templateParams, _cssList);
    let _html = "{% extends '../../bookcommon/pages/layout.html' %} " +
        "{% block title %}[[title]]{% endblock %}" +
        "{% block styles %} " +
        webAssetsHelp.styles +
        "{% endblock %}" +
        "{% block content %}" +
        "{% include \"../../../widget/book/book.html\" %} " +
        "{% endblock %}" +
        "{% block script%}" +
        webAssetsHelp.scripts +
        "{% endblock%}";
    return _html;
};