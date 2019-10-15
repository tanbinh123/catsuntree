package com.data.common;

import com.data.entity.JdbcInputer;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 三大基本：获取/关闭连接、查询数据库
 */
public class JdbcUtils {

    //查询数据库,将相关信息封装map返回
    public static Map<String, Object> queryPro(Connection connection, JdbcInputer jir) throws SQLException {
        Map<String, Object> resultsReturn = new HashMap<>();//all in one and return
        String tableName;
        int columnCount;
        List<String> columnFields = new ArrayList<>();//fields
        List<Map<String, Object>> list = new ArrayList<>();//data
        //EveryThings begin with connection and sql
        PreparedStatement preparedStatement = connection.prepareStatement(jir.getSql());
        preparedStatement.setQueryTimeout(600);
        ResultSet resultSet = preparedStatement.executeQuery();//all data from database
        ResultSetMetaData metaData = resultSet.getMetaData();
        tableName = metaData.getTableName(1);
        columnCount = metaData.getColumnCount();
        for (int i = 1; i <= columnCount; i++) {
            columnFields.add(metaData.getColumnLabel(i));
        }
        while (resultSet.next()) {
            Map<String, Object> oneLine = new HashMap<>();
            for (int i = 1; i <= columnCount; i++) {
                oneLine.put(metaData.getColumnLabel(i), resultSet.getObject(i));
            }
            list.add(oneLine);
        }
        //put everything into one map and return
        resultsReturn.put("tableName", tableName);
        resultsReturn.put("columnCount", columnCount);
        resultsReturn.put("columnFields", columnFields);
        resultsReturn.put("list", list);
        resultsReturn.put("queryFinishDate", AwesomeUtils.getCurrentDate(1));//ext:record date
        //finally return
        return resultsReturn;
    }


    //通过JDBC实体类获取数据库连接
    public static Connection getConnectionByEntity(JdbcInputer jir) throws Exception {
        Connection conn = null;
        Class.forName("com.mysql.cj.jdbc.Driver");//反射
        conn = DriverManager.getConnection(jir.getUrl() + jir.getDbname() + jir.getParameter(), jir.getUsername(), jir.getPassword());
        return conn;
    }

    //关流
    public static void close(Connection conn, PreparedStatement ps, ResultSet rs) {
        if (conn != null) {
            try {
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if (ps != null) {
            try {
                ps.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if (rs != null) {
            try {
                rs.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
