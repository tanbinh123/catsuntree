$(function () {
    Index_opening();// The opening animation
    monitoringInputSpace();
    searchButton();
    hideOrShow_jdbcSpaceInput();
    showorHideJDBCboard();
    catVoice();
});
// ##############################################################################################################################
//The following functions are Not only html animation，it might be show in ajax events
function showJDBCsearchingStatus() {
    $("#search").hide();
    $("#searching").show();
}


// ##############################################################################################################################
// The opening animation
function Index_opening() {
    var clickCount = 3;
    $("body").click(function () {
        clickCount = clickCount - 1;
        if (clickCount <= 0) {
            $("#world").fadeOut(1000);
            setTimeout('Index_opening_next()', 2000);
        } else {
        }
    });
}

// The opening animation turn on index
function Index_opening_next() {
    $("#world").remove();
}

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
        $("#jdbcSpace").show();
        $("#jdbcSpace").addClass("layui-anim layui-anim-fadein");
        $("#JDBCBoardShow").hide();
        $("#JDBCBoardHide").show();
    });
}

// click and cat voice
function catVoice() {
    var voice = document.getElementById('voice'); //catVoice
    $('#iframeCat').mouseover(function () { //点击文字事件
        if (voice.paused) { //判断音乐是否在播放中，暂停状态
            voice.play(); //音乐播放
        } else { //播放状态
        }
    });
}

// ##############################################################################################################################

