package com.data.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MyRunner implements CommandLineRunner {
    /**
     * 本机的google浏览器软件的启动地址：..../chrome.exe
     */
    @Value("${chrome.url}")
    private String url;
    @Value("${server.port}")
    private String port;


    @Override
    public void run(String... args) throws Exception {
        try {
            if (true) {
                String cmd = url + " " + "http://localhost:" + port;
                Runtime run = Runtime.getRuntime();
                run.exec(cmd);
                System.out.println("正在进入首页................");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
