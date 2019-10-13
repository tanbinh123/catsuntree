package com.data.controller;

import com.alibaba.fastjson.JSONObject;
import com.data.service.ZtreeService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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
        return ZtreeService.getZtreeDatas(params);
    }
}
