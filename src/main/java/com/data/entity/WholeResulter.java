package com.data.entity;

import java.util.Map;
import java.util.concurrent.PriorityBlockingQueue;

/**
 * 整合了前端传递的JDBC信息、数据库查询结果和过程信息等数据的实体类
 */
public class WholeResulter {
    public JdbcInputer commitInfo;//前端提交的信息
    public int status;//本次查询的状态码
    public String msg;//本次查询产生的信息
    public Map<String, Object> result;//本次查询所得的数据库资源
    public String resultTime;//返回结果时的系统时间

    public String getResultTime() {
        return resultTime;
    }

    public void setResultTime(String resultTime) {
        this.resultTime = resultTime;
    }

    public JdbcInputer getCommitInfo() {
        return commitInfo;
    }

    public void setCommitInfo(JdbcInputer commitInfo) {
        this.commitInfo = commitInfo;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Map<String, Object> getResult() {
        return result;
    }

    public void setResult(Map<String, Object> result) {
        this.result = result;
    }
}
