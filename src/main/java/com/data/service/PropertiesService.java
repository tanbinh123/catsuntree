package com.data.service;

import com.alibaba.fastjson.JSON;
import com.data.common.AwesomeUtils;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties;

public class PropertiesService {


    public static String getProperties() {
        Map<String, Object> propsmap = new HashMap<>();//装载配属性K-V
        String mapstring;//map最终转成JSON字符串
        //开始读取属性文件
        Properties props = new Properties();
        FileInputStream fi;
        try {
            fi = new FileInputStream("..\\config\\tree.properties");//加载的是外部属性文件
            props.load(fi);
            //迭代读取数据并存储
            Iterator<Map.Entry<Object, Object>> it = props.entrySet().iterator();
            while (it.hasNext()) {
                Map.Entry<Object, Object> entry = it.next();//每个entry包含一组K-V
                Object key = entry.getKey();
                Object value = entry.getValue();
                //将本组K-V存进容器
                if (key != null) {
                    propsmap.put(key.toString(), value == null ? "" : value.toString());
                }
            }

            AwesomeUtils.soutPro("已读取属性文件。lines=" + propsmap.size());
        } catch (FileNotFoundException e) {
            AwesomeUtils.soutPro("找不到属性文件。" + e.getMessage());
            //e.printStackTrace();
        } catch (IOException e) {
            //e.printStackTrace();
            AwesomeUtils.soutPro("加载属性文件时发生错误。" + e.getMessage());
        } finally {
        }
        //最终利用fastjson将map对象转JSON字符串
        mapstring = JSON.toJSONString(propsmap);
        return mapstring;
    }

}
