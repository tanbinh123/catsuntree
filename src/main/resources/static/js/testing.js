$(function () {
    $("#world").remove();
    // $("#iframeCat").remove();
    // fillJDBC();
    console.clear();
});

function fillJDBC() {
    $("#jdbcPram01").val("jdbc:mysql://139.129.67.219:3306/");
    $("#jdbcPram02").val("zhstjj");
    $("#jdbcPram03").val("?serverTimezone=UTC");
    $("#jdbcPram04").val("zhsdevelop");
    $("#jdbcPram05").val("southnet");
    $("#jdbcPram06").val("select * from channel");
}