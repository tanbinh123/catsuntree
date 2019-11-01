$(function () {
    Index_opening();// The opening animation ! allStart in this
    monitoringInputSpace();
    searchButton();
    hideOrShow_jdbcSpaceInput();
    showorHideJDBCboard();
    catVoice();
    treeFunctionButton();//树功能按钮
    backToTop();
});
// ##############################################################################################################################
// The opening animation 需要动画的情况下
function Index_opening() {
    index_first();
    Index_opening_next();
    forJDBCBoardShow();//特殊：直接展示需要的界面。此方法也可以注释掉
}

//加载配置函数
function index_first() {
    $.ajax({
        url: "/getProperties",
        type: "post",
        timeout: 15000,
        data: {},
        dataType: "json",
        success: function (data) {
            tryFillProperties(jdbcAssemble_1, data);//尝试组装
            tryFillProperties(jdbcAssemble_2, data);//尝试组装
            tryFillProperties(jdbcAssemble_3, data);//尝试组装
            tryFillProperties(jdbcAssemble_4, data);//尝试组装
            tryFillProperties(jdbcAssemble_5, data);//尝试组装
            tryFillProperties(jdbcAssemble_6, data);//尝试组装
            tryFillProperties(jdbcAssemble_7, data);//尝试组装
        }
    });
}


// The opening animation turn on index，不需要动画的情况下，直接调用此方法
function Index_opening_next() {
    $("#world").remove();
    //show all we need
    $("#iframeCat").fadeIn(1000);
    LayerTips("喵~", "#iframeCat", 4, "black", true);
    var voice = document.getElementById('voice'); //catVoice
    if (voice.paused) { //判断音乐是否在播放中，暂停状态
        voice.play(); //音乐播放
    } else { //播放状态
    }
    $("#JDBCBoardShow").fadeIn(1500);
    setTimeout('Index_opening_next_next()', 1500);
}

function Index_opening_next_next() {
    if ($("#JDBCBoardShow").length > 0) {
        LayerTips(" ! ", "#JDBCBoardShow", 4, "#ff2433", true);
    }
}

// ##############################################################################################################################

//monitoring inputSpace
function monitoringInputSpace() {
    $("#useSelect").click(function () {
        $("#jdbcFormInputSpace").show();
        $("#jdbcExploreSpace").hide();
    });
    $("#useConnection").click(function () {
        $("#jdbcFormInputSpace").hide();
        $("#jdbcExploreSpace").show();
    });
}

//图标互动
function searchButton() {
    /*    $("#JDBCBoardShow").mouseover(function () {
            $("#JDBCBoardShow>i").eq(0).removeClass("fa-3x");
            $("#JDBCBoardShow>i").eq(0).addClass("fa-5x");
        });
        $("#JDBCBoardShow").mouseleave(function () {
            $("#JDBCBoardShow>i").eq(0).removeClass("fa-5x");
            $("#JDBCBoardShow>i").eq(0).addClass("fa-3x");
        });*/

    $("#search").mouseover(function () {
        // 大小
        $("#search").removeClass("fa-3x");
        $("#search").addClass("fa-5x");
        //图标
        $("#search").removeClass("fa-search");
        $("#search").addClass("fa-search-plus");
        //颜色
        $("#search").css("color", "black");
    });
    $("#search").mouseleave(function () {
        // 大小
        $("#search").addClass("fa-3x");
        $("#search").removeClass("fa-5x");
        //图标
        $("#search").addClass("fa-search");
        $("#search").removeClass("fa-search-plus");
        //颜色
        $("#search").css("color", "blue");
    });

    $(".fontAnimation i").mouseover(function () {
        $(this).addClass("fa-4x");
    });
    $(".fontAnimation i").mouseleave(function () {
        $(this).removeClass("fa-4x");
    });

    $("#history").mouseover(function () {
        $("#history>i").eq(0).addClass("fa-spin");
    });
    $("#history").mouseleave(function () {
        $("#history>i").eq(0).removeClass("fa-spin");
    });
}

// 展示/隐藏输入区
function hideOrShow_jdbcSpaceInput() {
    $("#hideOrShow").click(function () {
        $("#jdbcSpaceInput").toggle("fast");
    });
}

// show or hide jdbcSpace
function showorHideJDBCboard() {
    $("#JDBCBoardHide").click(function () {
        $("#jdbcSpace").hide();
        $("#JDBCBoardHide").hide();
        $("#JDBCBoardShow").show();
    });
    $("#JDBCBoardShow").click(function () {
        forJDBCBoardShow();
    });
}

//为了跳过动画，将这些动作抽调成函数方便调用
function forJDBCBoardShow() {
    $("#jdbcSpace").show();
    $("#jdbcSpace").addClass("layui-anim layui-anim-fadein");
    $("#JDBCBoardShow").hide();
    $("#JDBCBoardHide").show();
    $("#share").show();
    $("#treeButtons").show();
    $("#treeSpace").show();
}

// click and cat voice
function catVoice() {
    var voice = document.getElementById('voice'); //catVoice
    $('#iframeCat').mouseover(function () { //点击文字事件
        if (voice.paused) { //判断音乐是否在播放中，暂停状态
            voice.play(); //音乐播放
            LayerTips("喵~", "#iframeCat", 4, "black", true);
        } else { //播放状态
        }
    });
}

// ##############################################################################################################################

//对用户输入的jdbc进行简单校验
function JDBCInputVerification() {
    var allIsOk = true;
    if (jdbcInput.all.url == null || jdbcInput.all.url.trim() == "") {
        LayerTips("不能为空", "#jdbcPram01", 4, "#75baaa", true);
        allIsOk = false;
    }
    if (jdbcInput.all.dbname == null || jdbcInput.all.dbname.trim() == "") {
        LayerTips("不能为空", "#jdbcPram02", 4, "#78BA32", true);
        allIsOk = false;
    }
    // if (jdbcInput.all.parameter == null || jdbcInput.all.parameter.trim() == "") {
    //     LayerTips("不能为空", "#jdbcPram03", 4, "#78BA32",true);
    //     allIsOk = false;
    // }
    if (jdbcInput.all.username == null || jdbcInput.all.username.trim() == "") {
        LayerTips("不能为空", "#jdbcPram04", 4, "#dbcf17", true);
        allIsOk = false;
    }
    if (jdbcInput.all.password == null || jdbcInput.all.password.trim() == "") {
        LayerTips("不能为空", "#jdbcPram05", 4, "#4938ba", true);
        allIsOk = false;
    }
    if (jdbcInput.all.sql == null || jdbcInput.all.sql.trim() == "") {
        LayerTips("不能为空", "#jdbcPram06", 4, "#ff75a7", true);
        allIsOk = false;
    }

    return allIsOk;
}

// ###########################################【  Layui抽方法 ↓   】##############################################################
//四个方向的tips层
function LayerTips(msg, selector, position, color, tipsMore) {
    layui.use('layer', function () {
        var layer = layui.layer;
        layer.tips(msg, selector, {
            tips: [position, color],
            tipsMore: tipsMore
        });
    });
}

//alert提示层
function LayerAlert(msg, skin, closeBtn, anim) {
    layui.use('layer', function () {
        var layer = layui.layer;
        layer.alert(msg, {
            skin: skin
            , closeBtn: closeBtn
            , anim: anim //动画类型
        });
    });
}

function LayerMsg(msg) {
    layui.use('layer', function () {
        var layer = layui.layer;
        layer.msg(msg);
    });
}

// ###########################################【  Layui抽方法 ↑   】##############################################################
//尝试将读取的属性文件赋值给vue组件
function tryFillProperties(obj, data) {
    // openAnimation: 1,
    //     services: [],
    //     urlArray: [], dbnameArray: [], parameterArray: [], usernameArray: [], passwordArray: [], sqlArray: [],
    //     status: 0
    obj.openAnimation = data.openAnimation;
    try {
        var tempString = data.services;
        obj.services = eval("(" + tempString + ")");
    } catch (e) {
    }
    try {
        var tempString = data.urlArray;
        obj.urlArray = eval("(" + tempString + ")");
    } catch (e) {
    }
    try {
        var tempString = data.dbnameArray;
        obj.dbnameArray = eval("(" + tempString + ")");
    } catch (e) {
    }
    try {
        var tempString = data.parameterArray;
        obj.parameterArray = eval("(" + tempString + ")");
    } catch (e) {
    }
    try {
        var tempString = data.usernameArray;
        obj.usernameArray = eval("(" + tempString + ")");
    } catch (e) {
    }
    try {
        var tempString = data.passwordArray;
        obj.passwordArray = eval("(" + tempString + ")");
    } catch (e) {
    }
    try {
        var tempString = data.sqlArray;
        obj.sqlArray = eval("(" + tempString + ")");
    } catch (e) {
    }
}


// ##############################################################################################################################
//树功能按钮，基本原理是利用treeObj逆向拿到数据，进行相关操作
function treeFunctionButton() {
    $("#expandAll").click(function () {
        var zTreeObj = $.fn.zTree.getZTreeObj("mainTree");
        if (zTreeObj != null) {
            zTreeObj.expandAll(true);//展开全部
        } else {
            layui.use('layer', function () {
                var layer = layui.layer;
                layer.tips('No trees are being planted ！', '#expandAll');
            });
        }
    });
    $("#closeAll").click(function () {
        var zTreeObj = $.fn.zTree.getZTreeObj("mainTree");
        if (zTreeObj != null) {
            zTreeObj.expandAll(false);//收起全部
        } else {
            layui.use('layer', function () {
                var layer = layui.layer;
                layer.tips('No trees are being planted ！', '#closeAll');
            });
        }
    });
    $("#showCategoryID").click(function () {
        var zTreeObj = $.fn.zTree.getZTreeObj("mainTree");
        if (zTreeObj != null) {
            $.fn.zTree.destroy("mainTree");//先销毁 #treemain 的 zTree
            var setting = zTreeObj.setting;
            var cid_fieldName = setting.data.simpleData.idKey;
            var pcid_fieldName = setting.data.simpleData.pIdKey;
            var cname_fieldName = setting.data.key.name;
            //重新组装数据
            var newList = [];
            var datasListJSON = RESULTS_02.all.result.list;
            for (var i = 0; i < datasListJSON.length; i++) {
                var tempvalue_cid = datasListJSON[i][cid_fieldName];
                var tempvalue_pcid = datasListJSON[i][pcid_fieldName];
                var tempvalue_cname = datasListJSON[i][cname_fieldName] + "-" + tempvalue_cid;//将展示名称=cname+cid
                var tempJSON = {};
                tempJSON[cid_fieldName] = tempvalue_cid;
                tempJSON[pcid_fieldName] = tempvalue_pcid;
                tempJSON[cname_fieldName] = tempvalue_cname;
                newList.push(tempJSON);
            }
            //新拿到的newList重新种树
            $.fn.zTree.destroy("mainTree");//销毁 #treemain 的 zTree
            $.fn.zTree.init($("#mainTree"), setting, newList);//树重新初始化
        }
    });
    $("#treeInit").click(function () {
        treeBuildAction();
    });
    $("#cutTree").click(function () {

        $.fn.zTree.destroy("mainTree");//销毁 #treemain 的 zTree
    });

}

// ##############################################################################################################################
function backToTop() {
    //快速回到顶部功能按钮
    $("#backTop").click(function () {
        if ($('html').scrollTop()) {
            $('html').animate({scrollTop: 0}, 100);//动画效果
            return false;
        }
        $('body').animate({scrollTop: 0}, 100);
        return false;
    });
    //“快速回到顶部”的按钮出现和隐藏
    $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
            $("#backTop").fadeIn(800);
        } else {
            $("#backTop").fadeOut(1000);
        }
    });
}

// ##############################################################################################################################
function tips_commitTimeout() {
    LayerTips("Commit when you ready .", "#search", 4, "#494eff", true);
}