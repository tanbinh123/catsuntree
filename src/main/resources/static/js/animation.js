$(function () {
    Index_opening();
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