$(function () {
    useOrClearExampleJDBC();
    watchingIDBCSubmit();//监测JDBC提交事件
    openHistoryHtml();
});

// ##############################################################################################################################
// 提交JDBC信息的单击#search事件
function watchingIDBCSubmit() {
    $("#search").click(function () {
        showJDBCsearchingStatus();
    });
}


// 使用或者清空JDBC示例
function useOrClearExampleJDBC() {
    // JDBC填充
    $("#useExampleJDBC").click(function () {
        $("#jdbcPram01").val("jdbc:mysql://139.129.67.219:3306/");
        $("#jdbcPram02").val("zhstjj");
        $("#jdbcPram03").val("?serverTimezone=UTC");
        $("#jdbcPram04").val("zhsdevelop");
        $("#jdbcPram05").val("southnet");
        $("#jdbcPram06").val("select * from channel");
    });
    // JDBC清空
    $("#emptyJDBC").click(function () {
        $("#jdbcPram01").val("");
        $("#jdbcPram02").val("");
        $("#jdbcPram03").val("");
        $("#jdbcPram04").val("");
        $("#jdbcPram05").val("");
        $("#jdbcPram06").val("");
    });
}

//打开jdbc提交历史的时间线页面
function openHistoryHtml() {
    $("#history").click(function () {
        layui.use('layer', function () {
            var layer = layui.layer;
            layer.open({
                type: 2,
                title: '查看或者使用历史JDBC信息',
                shadeClose: true,
                shade: 0.8,
                area: ['380px', '90%'],
                content: '/goJdbcHistoryPage' //iframe的url
            });
        });

    });
}