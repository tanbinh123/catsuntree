package com.data;

import com.data.common.AwesomeUtils;
import com.data.service.ZtreeService;
import jdk.management.resource.internal.inst.SocketOutputStreamRMHooks;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.sql.SQLException;
import java.util.Map;

@RunWith(SpringRunner.class)
@SpringBootTest
public class FunctionTests {

    @Test
    public void justTest() throws Exception {
        String params = "{\"url\":\"jdbc:mysql://139.129.67.219:3306/\",\"dbname\":\"zhstjj\",\"parameter\":\"?serverTimezone=UTC\",\"username\":\"zhsdevelop\",\"password\":\"southnet\",\"sql\":\"select * from channel\",\"commitTime\":\"2019-10-14 12:51\"}";
        String s = ZtreeService.dealZtreeData(params);
        System.out.println(s);
    }

    @Test
    public void justAnotherTest() {
        System.out.println(AwesomeUtils.getCurrentDate(1));
    }
}