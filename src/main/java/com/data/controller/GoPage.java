package com.data.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class GoPage {
    @RequestMapping("/go")
    public String GoWelcomePage() {
        return "index";
    }
}
