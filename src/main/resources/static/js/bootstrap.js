// #######################【本JavaScript记录全局变量、全局函数、初始化函数】##########################################
var jdbcInput_alls = [];//记录符合初步要求的jdbc提交，记录vue组件中jdbcInput的all属性的json数组(但不是记录jdbcInput.all)
// 监测当前鼠标所在元素的id、其祖先元素的id
// var DomIDWhenOnmouseover, DomAncestorsIDWhenOnmouseover, DomIDWhenOnclick, DomAncestorsIDWhenOnclick;
//###############################################################################################################################
$(function () {
    // getDomIDWhenOnmouseover();//监测
    // getDomIDWhenOnclick();//监测
    //layui监测
    layui.use(['element', 'form'], function () {
        var element = layui.element;
        var form = layui.form;
        //一些事件监听
        element.on('tab(demo)', function (data) {
            console.log(data);
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
