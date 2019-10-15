package com.data.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.data.common.AwesomeUtils;
import com.data.common.JdbcUtils;
import com.data.entity.JdbcInputer;
import com.data.entity.WholeResulter;

import java.sql.Connection;
import java.util.Iterator;
import java.util.Map;

/**
 * 处理ztree数据获取相关业务
 */
public class ZtreeService {
    /**
     * 查询结果，收集信息
     */
    public static String dealZtreeData(String params) {
        WholeResulter wrr = new WholeResulter();
        JdbcInputer jdbcInputer = fillJdbcInputer(params);//获取jdbc实体类
        //（1)前端提交的信息一并记录
        wrr.setCommitInfo(jdbcInputer);
        Map<String, Object> ztreeDatas;
        try {
            ztreeDatas = getZtreeDatas(jdbcInputer);
            wrr.setResult(ztreeDatas);//数据库查询所得
            wrr.setStatus(1);//查询成功无报错则状态码=1
            wrr.setMsg("查询成功");//提示信息
        } catch (Exception e) {
            //e.printStackTrace();上线后不再打印
            wrr.setStatus(0);//出现异常则
            wrr.setMsg("查询失败");//提示信息
            wrr.setMsg(e.getMessage());//异常信息
            //无数据库资源返回。
        }
        wrr.setResultTime(AwesomeUtils.getCurrentDate(0));//记录返回时间
        return JSON.toJSONString(wrr);
    }

    //通过jdbc实体类查询数据库信息
    public static Map<String, Object> getZtreeDatas(JdbcInputer jdbcInputer) throws Exception {
        Connection connection = JdbcUtils.getConnectionByEntity(jdbcInputer);
        Map<String, Object> map = JdbcUtils.queryPro(connection, jdbcInputer);
        return map;
    }

    /**
     * 将前端传递的jdbc-json字符串处理成实体类
     *
     * @param params 前端json字符串
     * @return 实体类
     */
    public static JdbcInputer fillJdbcInputer(String params) {
        JdbcInputer jr = new JdbcInputer();
        JSONObject paramsObj = JSONObject.parseObject(params);//实际是个map
        Iterator<Map.Entry<String, Object>> iterator = paramsObj.entrySet().iterator();
        while (iterator.hasNext()) {
            Map.Entry<String, Object> next = iterator.next();
            String key = next.getKey();
            Object value = next.getValue();
            //将参数给到实体类
            if (key.equals("url")) {
                jr.setUrl(value.toString());
            }
            if (key.equals("dbname")) {
                jr.setDbname(value.toString());
            }
            if (key.equals("parameter")) {
                jr.setParameter(value.toString());
            }
            if (key.equals("username")) {
                jr.setUsername(value.toString());
            }
            if (key.equals("password")) {
                jr.setPassword(value.toString());
            }
            if (key.equals("sql")) {
                jr.setSql(value.toString());
            }
            if (key.equals("commitTime")) {
                jr.setCommitTime(value.toString());
            }
        }
        return jr;
    }


}
