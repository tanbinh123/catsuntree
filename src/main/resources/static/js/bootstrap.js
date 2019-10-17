// #######################【本JavaScript记录全局变量、全局函数、初始化函数】##########################################
var jdbcInput_alls = [];//记录符合初步要求的jdbc提交，记录vue组件中jdbcInput的all属性的json数组(但不是记录jdbcInput.all)
// 监测当前鼠标所在元素的id、其祖先元素的id
// var DomIDWhenOnmouseover, DomAncestorsIDWhenOnmouseover, DomIDWhenOnclick, DomAncestorsIDWhenOnclick;
var globalClickCount = 2;//记录点击
var propertiesLoaded = false;
//###############################################################################################################################
$(function () {
    //layui监测
    layui.use(['element', 'form'], function () {
        var element = layui.element;
        var form = layui.form;
        //一些事件监听
        element.on('tab(demo)', function (data) {
            console.log(data);
        });
        //监测数据库select
        form.on('select(FilterServices)', function (data) {
            $("#databases").empty();
            $("#databases").append('<option value=""></option>');
            layui.use('form', function () {
                var form = layui.form;
                form.render('select', 'formDB'); //刷新select选择框渲染
            });
            LayerTips("waiting.....", "#jdbcPreset_Tips", 4, "#837aff", false);
            var value = data.value;
            var services = jdbcAssemble_7.services;
            for (var i = 0; i < services.length; i++) {
                if (services[i].servicename == value) {
                    var map = {
                        url: services[i].url,
                        dbname: services[i].dbname,
                        parameter: services[i].parameter,
                        username: services[i].username,
                        password: services[i].password,
                        sql: services[i].sql
                    };
                    //同时通过vue双向绑定原理刷新JDBC预览区的相关《《《《《《《《《《《《《《《《《
                    jdbcInput.all.url = services[i].url;
                    jdbcInput.all.parameter = services[i].parameter;
                    jdbcInput.all.username = services[i].username;
                    jdbcInput.all.password = services[i].password;
                    $.ajax({
                        url: "/getTreeData",
                        type: "post",
                        timeout: 3000,
                        data: {"params": JSON.stringify(map)},
                        dataType: "json",
                        success: function (data) {
                            if (data.status == 1) {
                                var list = data.result.list;
                                $("#databases").empty();
                                $("#databases").append('<option value=""></option>');
                                for (var j = 0; j < list.length; j++) {
                                    var dbname = list[j].Database;
                                    $("#databases").append('<option value="' + dbname + '">' + dbname + '</option>');
                                }
                                layui.use('form', function () {
                                    var form = layui.form;
                                    form.render('select', 'formDB'); //刷新select选择框渲染
                                });
                                LayerTips("加载完成", "#databases_Tips", 4, "#837aff", false);
                            } else if (data.status == 0) {
                                LayerTips(data.msg, "#jdbcPreset_Tips", 4, "#ff848c", false);
                            }
                        },
                        complete: function (XMLHttpRequest, status) {
                            if (status == 'timeout') {//超时,status还有success,error等值的情况
                                $("#databases").empty();
                                $("#databases").append('<option value=""></option>');
                                layui.use('form', function () {
                                    var form = layui.form;
                                    form.render('select', 'formDB'); //刷新select选择框渲染
                                });
                                LayerTips("timeout", "#jdbcPreset_Tips", 4, "#ff848c", false);
                            } else if (status == 'error') {
                                $("#databases").empty();
                                $("#databases").append('<option value=""></option>');
                                layui.use('form', function () {
                                    var form = layui.form;
                                    form.render('select', 'formDB'); //刷新select选择框渲染
                                });
                                LayerTips("error", "#jdbcPreset_Tips", 4, "#ff848c", false);
                            }
                        }
                    });
                }
            }
        });
        //监测表select
        form.on('select(FilterDatabases)', function (data) {
            $("#tables").empty();
            $("#tables").append('<option value=""></option>');
            layui.use('form', function () {
                var form = layui.form;
                form.render('select', 'formDB'); //刷新select选择框渲染
            });
            LayerTips("waiting.....", "#databases_Tips", 4, "#837aff", false);
            var dbname = data.value;
            var serviceCurrentName = $("#jdbcPreset option:selected").val();
            var services = jdbcAssemble_7.services;
            for (var i = 0; i < services.length; i++) {
                if (services[i].servicename == serviceCurrentName) {
                    var map = {
                        url: services[i].url,
                        dbname: dbname,
                        parameter: services[i].parameter,
                        username: services[i].username,
                        password: services[i].password,
                        sql: "select table_name from information_schema.tables where table_schema=" + "'" + dbname + "'"
                    };
                    //同时通过vue双向绑定原理刷新JDBC预览区的dbname
                    jdbcInput.all.dbname = dbname;
                    $.ajax({
                        url: "/getTreeData",
                        type: "post",
                        timeout: 3000,
                        data: {"params": JSON.stringify(map)},
                        dataType: "json",
                        success: function (data) {
                            if (data.status == 1) {
                                var list = data.result.list;
                                $("#tables").empty();
                                $("#tables").append('<option value=""></option>');
                                for (var j = 0; j < list.length; j++) {
                                    var TempTableName = list[j].table_name;
                                    $("#tables").append('<option value="' + TempTableName + '">' + TempTableName + '</option>');
                                }
                                layui.use('form', function () {
                                    var form = layui.form;
                                    form.render('select', 'formDB'); //刷新select选择框渲染
                                });
                                LayerTips("加载完成", "#tables_Tips", 4, "#837aff", false);
                            } else if (data.status == 0) {
                                LayerTips(data.msg, "#databases_Tips", 4, "#ff848c", false);
                            }
                        },
                        complete: function (XMLHttpRequest, status) {
                            if (status == 'timeout') {//超时,status还有success,error等值的情况
                                $("#tables").empty();
                                $("#tables").append('<option value=""></option>');
                                layui.use('form', function () {
                                    var form = layui.form;
                                    form.render('select', 'formDB'); //刷新select选择框渲染
                                });
                                LayerTips("timeout", "#databases_Tips", 4, "#ff848c", false);
                            } else if (status == 'error') {
                                $("#tables").empty();
                                $("#tables").append('<option value=""></option>');
                                layui.use('form', function () {
                                    var form = layui.form;
                                    form.render('select', 'formDB'); //刷新select选择框渲染
                                });
                                LayerTips("error", "#databases_Tips", 4, "#ff848c", false);
                            }
                        }
                    });
                }
            }
        });
        //监测表选中
        form.on('select(FilterTables)', function (data) {
            var tableName = data.value;
            jdbcInput.all.sql = "select * from " + tableName;
            LayerTips("Great! Now check and commit.", "#jdbcPram06", 4, "#48baff", true);
            setTimeout('tips_commitTimeout()', 555);
        });
        //监测方式一中的六个选择框
        form.on('select(wayOne01)', function (data) {
            var tempValue = data.value;
            jdbcInput.all.url = tempValue;
            LayerTips("updated!", "#jdbcPram01", 4, "#837aff", true);
        });
        form.on('select(wayOne02)', function (data) {
            var tempValue = data.value;
            jdbcInput.all.dbname = tempValue;
            LayerTips("updated!", "#jdbcPram02", 4, "#837aff", true);
        });
        form.on('select(wayOne03)', function (data) {
            var tempValue = data.value;
            jdbcInput.all.parameter = tempValue;
            LayerTips("updated!", "#jdbcPram03", 4, "#837aff", true);
        });
        form.on('select(wayOne04)', function (data) {
            var tempValue = data.value;
            jdbcInput.all.username = tempValue;
            LayerTips("updated!", "#jdbcPram04", 4, "#837aff", true);

        });
        form.on('select(wayOne05)', function (data) {
            var tempValue = data.value;
            jdbcInput.all.password = tempValue;
            LayerTips("updated!", "#jdbcPram05", 4, "#837aff", true);

        });
        form.on('select(wayOne06)', function (data) {
            var tempValue = data.value;
            jdbcInput.all.sql = tempValue;
            LayerTips("updated!", "#jdbcPram06", 4, "#837aff", true);

        });
    });
});
//###############################################################################################################################
//监测鼠标移动事件时，当前鼠标所在的元素的祖先元素是在body下的哪个元素，将其祖先元素的ID储存在全局变量中
/*function getDomIDWhenOnmouseover() {
    //前提：<body></body>给id="body"
    window.document.body.onmouseover = function (event) {
        var currentDOM = window.document.body;
        var currentDOM_ID;
        var fatherDOM;
        var fatherDOM_ID;
        //第一次
        currentDOM = event.target;//事件目标赋值
        currentDOM_ID = currentDOM.getAttribute("id");
        DomIDWhenOnmouseover = currentDOM_ID;//存进全局变量
        fatherDOM = currentDOM.parentNode;
        fatherDOM_ID = fatherDOM == null ? null : fatherDOM.getAttribute("id");
        //判断,如果当前就是在body
        if (currentDOM_ID == 'body') {
            DomAncestorsIDWhenOnmouseover = 'body';//当前就是在body
            // console.clear();
            // console.log("当前就是在body", "DomIDWhenOnmouseover=" + DomIDWhenOnmouseover);
            // console.log("当前就是在body", "DomAncestorsIDWhenOnmouseover=" + DomAncestorsIDWhenOnmouseover);
            return;//结束
        }
        //如果当前不是在body下，通过递归向上检查父元素的id是否是body
        if (fatherDOM_ID == 'body') {
            // 如果上一级就是body了，则其本身就是其的祖先元素
            DomAncestorsIDWhenOnmouseover = currentDOM_ID;
        } else {
            // 如果上一级还不是body，则继续往上找
            while (fatherDOM_ID != 'body') {
                currentDOM = fatherDOM;
                currentDOM_ID = currentDOM.getAttribute("id");
                fatherDOM = currentDOM.parentNode;
                fatherDOM_ID = fatherDOM == null ? null : fatherDOM.getAttribute("id");
            }
            DomAncestorsIDWhenOnmouseover = currentDOM_ID;
        }
        // console.clear();
        // console.log("DomIDWhenOnmouseover=" + DomIDWhenOnmouseover);
        // console.log("DomAncestorsIDWhenOnmouseover=" + DomAncestorsIDWhenOnmouseover);
    }
}*/

//###############################################################################################################################
//监测鼠标点击事件时，当前鼠标所在的元素的祖先元素是在body下的哪个元素，将其祖先元素的ID储存在全局变量中
/*function getDomIDWhenOnclick() {
    //前提：<body></body>给id="body"
    window.document.body.onclick = function (event) {
        var currentDOM = window.document.body;
        var currentDOM_ID;
        var fatherDOM;
        var fatherDOM_ID;
        //第一次
        currentDOM = event.target;//事件目标赋值
        currentDOM_ID = currentDOM.getAttribute("id");
        DomIDWhenOnclick = currentDOM_ID;//存进全局变量
        fatherDOM = currentDOM.parentNode;
        fatherDOM_ID = fatherDOM == null ? null : fatherDOM.getAttribute("id");
        //判断,如果当前就是在body
        if (currentDOM_ID == 'body') {
            DomAncestorsIDWhenOnclick = 'body';//当前就是在body
            // console.clear();
            // console.log("当前就是在body", "DomIDWhenOnclick=" + DomIDWhenOnclick);
            // console.log("当前就是在body", "DomAncestorsIDWhenOnclick=" + DomAncestorsIDWhenOnclick);
            return;//结束
        }
        //如果当前不是在body下，通过递归向上检查父元素的id是否是body
        if (fatherDOM_ID == 'body') {
            // 如果上一级就是body了，则其本身就是其的祖先元素
            DomAncestorsIDWhenOnclick = currentDOM_ID;
        } else {
            // 如果上一级还不是body，则继续往上找
            while (fatherDOM_ID != 'body') {
                currentDOM = fatherDOM;
                currentDOM_ID = currentDOM.getAttribute("id");
                fatherDOM = currentDOM.parentNode;
                fatherDOM_ID = fatherDOM == null ? null : fatherDOM.getAttribute("id");
            }
            DomAncestorsIDWhenOnclick = currentDOM_ID;
        }
        // console.clear();
        // console.log("DomIDWhenOnclick = " + DomIDWhenOnclick);
        // console.log("DomAncestorsIDWhenOnclick=" + DomAncestorsIDWhenOnclick);
    }
}*/

//###############################################################################################################################
//一个简单的获取当前系统时间并格式化的函数
function getCurentTime() {
    var now = new Date();
    var year = now.getFullYear(); //年
    var month = now.getMonth() + 1; //月
    var day = now.getDate(); //日
    var hh = now.getHours(); //时
    var mm = now.getMinutes(); //分
    var ss = now.getUTCSeconds();//秒
    var clock = year + "-";
    if (month < 10)
        clock += "0";
    clock += month + "-";
    if (day < 10)
        clock += "0";
    clock += day + " ";
    if (hh < 10)
        clock += "0";
    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm + ":";
    if (ss < 10) {
        clock += '0'
    }
    clock += ss;
    return (clock);
}

//###############################################################################################################################
