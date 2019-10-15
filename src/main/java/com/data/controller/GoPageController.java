package com.data.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class GoPageController {
    @RequestMapping("/go")
    public String GoWelcomePage() {
        return "index";
    }

    @RequestMapping("/goJdbcHistoryPage")
    public String GoJdbcHistoryPage() {
        return "jdbcHistory";
    }

    @RequestMapping("/cat")
    public String catsInMyHouse() {
        return "catsInMyHouse";
    }
}
