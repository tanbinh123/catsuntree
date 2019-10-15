$(function () {
    useOrClearExampleJDBC();
    watchingIDBCSubmit();//监测JDBC提交事件
    openHistoryHtml();//监测打开历史页面事件
    showInConsole();//数据量较大的情况下可打印在控制台
    watchFormSelect();//监测layui的表单需要重新渲染事件
    buildTree();//监测种树请求事件
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
                params.commitTime = getCurentTime();//更新commitTime的值
                recordJDBCWhenCommit(params);//记录即将提交的JDBC详情(No matter commit successful)
                //启动ajax,将JDBC信息提交到服务器以查询数据库
                $.ajax({
                    url: "/getTreeData",
                    type: "post",
                    timeout: 15000,
                    data: {"params": JSON.stringify(params)},
                    dataType: "json",
                    success: function (data) {
                        console.log("You Can also check info in console:");
                        console.log(data);
                        //完成ajax后按照状态码有不同的操作
                        if (data.status == 1) {
                            updateResults(data);//只有查询成功才更新面板数据？！
                            jdbcCommitStatus.searchingSeen = false;
                            jdbcCommitStatus.searchSuccessSeen = true;//提示成功
                            setTimeout('jdbcStatusWaiting()', 2000);//2秒后才能进行下一次提交
                            LayerTips("Query completed ! ", "#accordionPart1", 2, "#009688", true);
                            LayerTips("Choose What your want !", "#accordionPart3", 2, "#009688", true);
                        } else if (data.status == 0) {
                            jdbcCommitStatus.searchingSeen = false;
                            jdbcCommitStatus.searchWarningSeen = true;//提示警告：虽然成功但服务器反馈信息错误
                            setTimeout('jdbcStatusWaiting()', 2000);//2秒后才能进行下一次提交
                            // LayerAlert(data.msg, 'layui-layer-molv', 0, 4);//重点提示错误信息
                            layui.use('layer', function () {
                                layer.alert(data.msg, {
                                    skin: 'layui-layer-molv' //样式类名
                                    , closeBtn: 0
                                });
                            });
                        }
                    },
                    complete: function (XMLHttpRequest, status) {
                        if (status == 'timeout') {//超时,status还有success,error等值的情况
                            jdbcStatusWaiting();//使JDBC提交按钮显示为等待中状态
                            LayerTips("[timeout]可能原因:数据量过大导致查询超时", "#jdbcCommitStatus", 4, "red", false);
                        } else if (status == 'error') {
                            jdbcStatusWaiting();//使JDBC提交按钮显示为等待中状态
                            LayerTips("[error]服务器可能未开启或其他原因", "#jdbcCommitStatus", 4, "red", false);
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
    jdbcCommitStatus.searchWarningSeen = false;
    jdbcCommitStatus.searchSeen = true;

}

// ##############################################################################################################################

// 使用或者清空JDBC示例，利用vue双向绑定
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
    // JDBC清空，利用vue双向绑定
    $("#emptyJDBC").click(function () {
        jdbcInput.all.url = "";
        jdbcInput.all.dbname = "";
        jdbcInput.all.parameter = "";
        jdbcInput.all.username = "";
        jdbcInput.all.password = "";
        jdbcInput.all.sql = "";
        LayerTips("已清空", "#emptyJDBC", 3, true);
    });
}

// ##############################################################################################################################
//当JDBC非空验证通过、点击提交时，将其记录下来(无论服务器是否响应)。特别注意其中不能直接传变量，需要把数据拿出来
function recordJDBCWhenCommit(params) {
    //向json数组中添加一个新建的json数据，会位于末尾，下标最大
    jdbcInput_alls.push({
        url: params.url,
        dbname: params.dbname,
        parameter: params.parameter,
        username: params.username,
        password: params.password,
        sql: params.sql,
        commitTime: params.commitTime
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
                content: '/goJdbcHistoryPage', //iframe的url
                //打开成功的情况下
                success: function (layero, index) {
                    var iframeWin = window[layero.find('iframe')[0]['name']];
                    var tempJSONlist = jdbcInput_alls;
                    iframeWin.historyList.AllLists = tempJSONlist;//倒序后传递给vue
                }
            });
        });

    });
}

// ##############################################################################################################################
//历史数据填充面板
function filljdbcSpacePrepareSpace(params) {
    //收到数据后，利用vue双向绑定原理
    jdbcInput.all.url = params.url;
    jdbcInput.all.dbname = params.dbname;
    jdbcInput.all.parameter = params.parameter;
    jdbcInput.all.username = params.username;
    jdbcInput.all.password = params.password;
    jdbcInput.all.sql = params.sql;
}

// <############################################################################################################################>
// layui的form下的select需要手动渲染，所以需要Vue检查RESULTS_03的属性值变化时，调取layui的渲染函数
function watchFormSelect() {
    RESULTS_03.$watch('all.result.columnFields', function (newv, oldv) {
        layui.use('form', function () {
            var form = layui.form;
            form.render('select', "columnForm");//lay-filter="columnForm"
        });
    });
}

// <############################################################################################################################>
//因查询的数据量一般较大，不易页面展示，#showInConsole提供控制台打印功能
function showInConsole() {
    $("#showInConsole").click(function () {
        try {
            var list = RESULTS_02.all.result.list;
            if (list != null) {
                $("#showInConsole_i").html("&nbsp;Done");
                $("#showInConsole_i").removeClass("fa-print");
                $("#showInConsole_i").addClass("fa-check");
                $("#showInConsole").addClass("layui-bg-blue");//换颜色
                setTimeout('showInConsole_next()', 1000);
                console.log(JSON.stringify(list));
            }
        } catch (e) {
            $("#showInConsole").addClass("layui-bg-red");//换颜色
            $("#showInConsole_i").html("&nbsp;Nothing to Print ! ");
            setTimeout('showInConsole_next()', 1000);
        }


    });
}

function showInConsole_next() {
    $("#showInConsole_i").html("&nbsp;console.log");
    if (!$("#showInConsole_i").hasClass("fa-print")) {
        $("#showInConsole_i").addClass("fa-print");
    }
    if ($("#showInConsole_i").hasClass("fa-check")) {
        $("#showInConsole_i").removeClass("fa-check");
    }
    if ($("#showInConsole").hasClass("layui-bg-blue")) {
        $("#showInConsole").removeClass("layui-bg-blue");//换颜色
    }
    if ($("#showInConsole").hasClass("layui-bg-red")) {
        $("#showInConsole").removeClass("layui-bg-red");//换颜色
    }
}

// <############################################################################################################################>
//由于layui的框架问题，导致Vue对象要被拆分成多个副本，数据被人都一样，取出不同
function updateResults(data) {
    RESULTS_01.all = data;//vue组件维护#result_path01下的信息展示
    RESULTS_02.all = data;//vue组件维护#result_path02下的信息展示
    RESULTS_03.all = data;//vue组件维护#result_path03下的信息展示
}


// <############################################################################################################################>
//点击种树事件
function buildTree() {
    $("#buildTree").click(function () {
        try {
            var columnCount = RESULTS_02.all.result.columnCount;
            if (columnCount >= 3) {
                var cid = $("#selectCid").find("option:selected").val();
                var pcid = $("#selectPCid").find("option:selected").val();
                var cname = $("#selectCname").find("option:selected").val();
                var allSelected = true;
                if (cid == "" || cid == null) {
                    LayerTips("必须项", "#selectCid_forTips", 2, "#ff5722", true);
                    allSelected = false;
                }
                if (pcid == "" || pcid == null) {
                    LayerTips("必须项", "#selectPCid_forTips", 2, "#ff5722", true);
                    allSelected = false;
                }
                if (cname == "" || cname == null) {
                    LayerTips("必须项", "#selectCname_forTips", 2, "#ff5722", true);
                    allSelected = false;
                }
                if (allSelected) {
                    //种树
                    var setting = {
                        "async": {"enable": false},
                        "check": {"enable": false, "autoCheckTrigger": true},
                        "data": {"simpleData": {"enable": true, "idKey": cid, "pIdKey": pcid}, "key": {"name": cname}},
                        "callback": {"onClick": ""}
                    };
                    var treeList = RESULTS_02.all.result.list;
                    $.fn.zTree.init($("#mainTree"), setting, treeList);//树重新初始化
                }

            } else {
                LayerTips("字段数不足3列，你可能得不到期望的结果", "#buildTree", 2, "#009688", true);
            }
        } catch (e) {
            LayerTips("字段要求不符", "#buildTree", 2, "#009688", true);
        }
    });
}