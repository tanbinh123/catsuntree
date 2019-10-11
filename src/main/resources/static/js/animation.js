$(function () {
    Index_opening();// The opening animation
    monitoringInputSpace();
    searchButton();
});

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
        $(this).addClass("fa-5x");
    });
    $(".fontAnimation i").mouseleave(function () {
        $(this).removeClass("fa-5x");
    });

    $("#history").mouseover(function () {
        $(this).addClass("fa-spin");
    });
    $("#history").mouseleave(function () {
        $(this).removeClass("fa-spin");
    });
}