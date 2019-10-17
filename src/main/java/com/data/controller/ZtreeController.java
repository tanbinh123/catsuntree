package com.data.controller;

import com.alibaba.fastjson.JSONObject;
import com.data.service.PropertiesService;
import com.data.service.ZtreeService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.sql.SQLException;

/**
 * 处理关于ztree相关的请求
 */
@Controller
public class ZtreeController {

    /**
     * @param params 前端传递的json字符串
     * @return 处理之后的json字符串
     */
    @RequestMapping("/getTreeData")
    @ResponseBody
    public String getZtreeDatas(String params) {
        return ZtreeService.dealZtreeData(params);//controller不处理异常，请在方法内部处理
    }

    @RequestMapping("/getProperties")
    @ResponseBody
    public String getProperties() {
        return PropertiesService.getProperties();
    }

}
