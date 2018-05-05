module.exports = function(templateParams) {
    let _cssList = ["common", "student-index"];
    let webAssetsHelp = require("../../../webAssetsHelp.js")(templateParams, _cssList);
    let _html = "{% extends '../../studentsResume/pages/layout.html' %} " +
        "{% block title %}[[title]]{% endblock %}" +
        "{% block styles %} " +
        webAssetsHelp.styles +
        "{% endblock %}" +
        "{% block content %}  {% include \"../../../widget/student/student.html\" %} {% endblock %}" +
        "{% block script%}" +
        webAssetsHelp.scripts +
        "{% endblock%}";
    return _html;
};