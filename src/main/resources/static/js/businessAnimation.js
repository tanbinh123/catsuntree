$(function () {
    useOrClearExampleJDBC();
    watchingIDBCSubmit();//监测JDBC提交事件
    openHistoryHtml();
});

// ##############################################################################################################################
// 提交JDBC信息的单击#search事件
function watchingIDBCSubmit() {
    $("#search").click(function () {
        //非提交中，可以提交
        if (jdbcCommitStatus.status == 0) {
            //对用户输入的信息进行简单的非空校验
            if (JDBCInputVerification()) {
                jdbcStatusSearching();//使JDBC提交按钮显示为提交中状态
                //准备需要往后端传递的参数
                var params = jdbcInput.all;//先把6个基本的jdbc参数拿到
                params.commitTime = getCurentTime();//将提交时间也一同传递
                // console.log(finalParams);
                //启动ajax,将JDBC信息提交到服务器以查询数据库
                $.ajax({
                    url: "/getTreeData",
                    Type: "post",
                    timeout: 15000,
                    data: {"params": JSON.stringify(params)},
                    dataType: "text",
                    success: function (data) {
                        jdbcCommitStatus.searchingSeen = false;
                        jdbcCommitStatus.searchSuccessSeen = true;//提示成功
                        setTimeout('jdbcStatusWaiting()', 2000);//2秒后才能进行下一次提交
                        // jdbcStatusWaiting();//使JDBC提交按钮显示为等待中状态
                        console.log("data=" + data);
                    },
                    complete: function (XMLHttpRequest, status) {
                        if (status == 'timeout') {//超时,status还有success,error等值的情况
                            jdbcStatusWaiting();//使JDBC提交按钮显示为等待中状态
                            LayerTips("timeout。可能原因:数据量过大查询超时(可减少字段测试)", "#jdbcCommitStatus", 4, "red", false);
                        } else if (status == 'error') {
                            jdbcStatusWaiting();//使JDBC提交按钮显示为等待中状态
                            LayerTips("error。服务器可能未开启", "#jdbcCommitStatus", 4, "red", false);
                        }
                    }
                });
            }
        }
    });
}

// ##############################################################################################################################
// 功能函数
function jdbcStatusSearching() {
    jdbcCommitStatus.status = 1;
    //vue+font-awesome控制显示/隐藏
    jdbcCommitStatus.searchSeen = false;//隐藏
    jdbcCommitStatus.searchingSeen = true;//显示
}

function jdbcStatusWaiting() {
    jdbcCommitStatus.status = 0;
    //vue+font-awesome控制显示/隐藏
    jdbcCommitStatus.searchingSeen = false;
    jdbcCommitStatus.searchSuccessSeen = false;
    jdbcCommitStatus.searchSeen = true;

}

// ##############################################################################################################################

// 使用或者清空JDBC示例
function useOrClearExampleJDBC() {
    // JDBC填充
    $("#useExampleJDBC").click(function () {
        jdbcInput.all.url = "jdbc:mysql://139.129.67.219:3306/";
        jdbcInput.all.dbname = "zhstjj";
        jdbcInput.all.parameter = "?serverTimezone=UTC";
        jdbcInput.all.username = "zhsdevelop";
        jdbcInput.all.password = "southnet";
        jdbcInput.all.sql = "select * from channel";
    });
    // JDBC清空
    $("#emptyJDBC").click(function () {
        jdbcInput.all.url = "";
        jdbcInput.all.dbname = "";
        jdbcInput.all.parameter = "";
        jdbcInput.all.username = "";
        jdbcInput.all.password = "";
        jdbcInput.all.sql = "";
    });
}

// ##############################################################################################################################
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

// ##############################################################################################################################

