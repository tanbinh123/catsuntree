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