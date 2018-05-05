module.exports = function(templateParams) {
    let _cssList = ["common", "video-index"];
    let webAssetsHelp = require("../../../webAssetsHelp.js")(templateParams, _cssList);
    let _html = "{% extends '../../common/pages/layout.html' %} " +
        "{% block title %}[[title]]{% endblock %}" +
        "{% block styles %} " +
        webAssetsHelp.styles +
        "{% endblock %}" +
        "{% block content %}" +
        "{% include \"../../../widget/player/player.html\" %} " +
        "{% endblock %}" +
        "{% block script%}" +
        webAssetsHelp.scripts +
        "{% endblock%}";
    return _html;
};