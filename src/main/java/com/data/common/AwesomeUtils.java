package com.data.common;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 常用工具合集,不受项目限制
 */
public class AwesomeUtils {
    //此方法只是在普通的System.out.println()方法基础上加上了系统时间
    public static void soutPro(String soutMsg) {
        System.out.println("[" + new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()) + "]" + "\t" + soutMsg);//合起来写
    }

    //获取当前系统时间并选择修饰类型
    public static String getCurrentDate(int type) {
        String format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
        switch (type) {
            case 0:
                //不做任何修饰
                break;
            case 1:
                format = "[" + format + "]";
                //前后加上中括号
                break;
        }
        return format;
    }
}
