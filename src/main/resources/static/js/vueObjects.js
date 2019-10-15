// Vue实例组件维护
// <############################################################################################################################>
//jdbcInput：记录用户各种方式获取、最终预览的JDBC区域的元素
var jdbcInput = new Vue({
    el: "#jdbcSpacePrepare",
    //其中commitTime不直接展示在JDBC面板
    data: {all: {url: "", dbname: "", parameter: "", username: "", password: "", sql: "", commitTime: ""}}
});

// <############################################################################################################################>
// jdbcCommitStatus:记录jdbc当前是否正在提交
var jdbcCommitStatus = new Vue({
    el: "#jdbcCommitStatus",
    data: {status: 0, searchSeen: true, searchingSeen: false, searchSuccessSeen: false, searchWarningSeen: false}
});
// <############################################################################################################################>
//results：记录整个生命流程(由服务器返回的信息构成),由于Layui框架的问题，需要将一个vue拆成3个，内容都一样，取出不一样
var RESULTS_01 = new Vue({
    el: "#result_path01",
    data: {
        all: {}
    }
});
var RESULTS_02 = new Vue({
    el: "#result_path02",
    data: {
        all: {}
    }
});
var RESULTS_03 = new Vue({
    el: "#result_path03",
    data: {
        all: {}
    }
});
// 其中根据服务端的设计，all的结构如下:
// all: {
//     commitInfo: {commitTime: "", dbname: "", parameter: "", password: "", sql: "", url: "", username: ""},
//     msg: "",
//     result: {columnCount: -99, columnFields: [], list: [], queryFinishDate: "", tableName: ""},
//     resultTime: "",
//         status: -99
// }
// <############################################################################################################################>

// <############################################################################################################################>
