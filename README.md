# CATSUNTREE #
    With this application, you can build a category tree from any database data, if the data meets the requirements.
    Tips:It is more convenient to use the configuration file.
**Let's begin!**

![test](http://m.qpic.cn/psb?/V12x3UMs3ekTkH/gURaVTnHf0aoRNLEQ4VlO*x8Z1RQ6f10x9DrUL7mRPU!/b/dE0BAAAAAAAA&bo=0wDBAAAAAAADFyA!&rf=viewer_4&t=5)
> **通常，你会经历以下三个步骤：**

1. ~~撸猫~~
2. ~~吸猫~~
3. ~~吸撸猫~~

:) It should be like this:
##### [Step01] 输入数据库连接所需信息 #####
    Input Some Database connection information
当前版本提供了以下三种方式：   
1. 动态加载服务器下所有的库和表
2. 选取预设的连接信息
3. 直接手写
#####
    以上三种方式最终都会展现在预览区,你可以在最终提交前检查并灵活修改.
##### [Step02] 选择你想展示的节点信息 #####
    通过选取节点ID、节点的父ID、节点名称三者分别对应的字段名称，来构建你的CATSUNTREE，相应的值会展示。    
##### [Step03] 查看你的CATSUNTREE #####
    你可以使用以下功能:
* 展开全部节点
* 收回全部节点
* 节点名称同时展示节点ID
* 恢复最近种的树
* 销毁当前的树
- - - 
下面我们来看看具体的使用细节：
> [step01] **动态加载服务器下所有的库和表**
>>(1.1.1) 动态加载服务器下所有的库和表(也是最推荐的使用方式).
>>
>>首先在在tree.properties文件中添加配置(请注意properties文件是单行模式).
>>~~~
>>services=[{
>>  	"servicename": "219",
>>  	"url": "jdbc:mysql://139.129.67.219:3306/",
>>  	"dbname": "mysql",
>>  	"parameter": "?serverTimezone=UTC",
>>  	"username": "zhsdevelop",
>>  	"password": "yourPassword",
>>  	"sql": "SHOW DATABASES"
>>  }, {
>>  	"servicename": "157",
>>  	"url": "jdbc:mysql://192.168.43.157:3306/",
>>  	"dbname": "mysql",
>>  	"parameter": "?serverTimezone=UTC",
>>  	"username": "root",
>>  	"password": "yourPassword",
>>  	"sql": "SHOW DATABASES"
>>  }, {
>>  	"servicename": "localhost",
>>  	"url": "jdbc:mysql://localhost:3306/",
>>  	"dbname": "mysql",
>>  	"parameter": "?serverTimezone=UTC",
>>  	"username": "root",
>>  	"password": "yourPassword",
>>  	"sql": "SHOW DATABASES"
>>}]
>>~~~
>>可以看到这里设置了“219”、“157”、“localhost”三组配置，那么页面上只需要直接选取即可，系统会首先把服务器上所有数据库加载出来：
>>
>>![chooseDB](http://m.qpic.cn/psb?/V12x3UMs3ekTkH/wOZH05lvtetOL*wo*7IRSTVDoiq*SpEjCgrnz3.5i1g!/b/dLgAAAAAAAAA&bo=*gH6AQAAAAADFzY!&rf=viewer_4&t=5)
>>细心的你应该发现预览区的信息也动态更新了。
>>
>>同理，然后选取某个数据库，程序会将其下所有的tables加载处来，选择你的目标并最终在预览区总览：
>>
>>![SEESEE](http://m.qpic.cn/psb?/V12x3UMs3ekTkH/h.lrTiu5r88v0uqOJaiV*GgCH15zOM1SrjNJT8gUc6Y!/b/dMQAAAAAAAAA&bo=9wGAAQAAAAADF0U!&rf=viewer_4&t=5)
>>
>>点击查询：
>>![success](http://m.qpic.cn/psb?/V12x3UMs3ekTkH/yIDNsXXZzO6vDiSA3saB9UfULedIj9N5TDuJHXllt00!/b/dE0BAAAAAAAA&bo=jwBeAAAAAAADF.M!&rf=viewer_4&t=5)
>>
>>(1.1.2)通过预设的元素随意组合
>>
>>首先你可以通过顶部按钮切换模式
>>![qiehuan](http://m.qpic.cn/psb?/V12x3UMs3ekTkH/1QPIBIbuPk4XcfT1vtMm*eeeLCF3oVogAad06PwHkcQ!/b/dE0BAAAAAAAA&bo=9wE3AAAAAAADF*M!&rf=viewer_4&t=5)
>>
>>然后选择你所需的元素随意组合，当然，这些信息来源于你的tree.properties文件：
>>
>>![chooseTwo](http://m.qpic.cn/psb?/V12x3UMs3ekTkH/fM92L.X0rn1aAssFNGjjNjfNnbgoGDNQra.yll.LqLg!/b/dLsAAAAAAAAA&bo=wgZaAQAAAAADF60!&rf=viewer_4&t=5)
>>
>>(1.1.3)第三种方式：直接在预览区的书写区手写。
>>
>>另外，当前版本还添加了历史提交快速填充的功能，方便你重新查询。
>>![history](http://m.qpic.cn/psb?/V12x3UMs3ekTkH/FqrOFeeAHLOfUA*g.qw4TTIy6NDpENyPJYXhCQq*ISg!/b/dFIBAAAAAAAA&bo=ZAwhBAAAAAADF38!&rf=viewer_4&t=5)
>>
>>至此，三种方式介绍完毕。
- - - 
>[step02] 查看返回信息，选择你的目标
>>
>>(2.1)查看,因返回数据量一般比较多，这里可以在控制台打印：
>>
>>![check](http://m.qpic.cn/psb?/V12x3UMs3ekTkH/pXsSfUsyDYXYdaKzFwmiUcSKlB8536A5YHRc5ck5udc!/b/dAQBAAAAAAAA&bo=9QFkAQAAAAADF6M!&rf=viewer_4&t=5)
>>
>>(2.2)选择：
>>
>>![chooseTress](http://m.qpic.cn/psb?/V12x3UMs3ekTkH/Ka6wfpKFA88s9V81nRKjl*ylDQGWRuVhfc0NCxSV4CY!/b/dMMAAAAAAAAA&bo=4QFBAgAAAAADF5E!&rf=viewer_4&t=5)
>>
>>最终得到我们的结果：
>>
>>![result](http://m.qpic.cn/psb?/V12x3UMs3ekTkH/6wi1Iw6WN76ytqFwrCgvwdYQTRuHfSZD.vuO0jIwGQU!/b/dE8BAAAAAAAA&bo=LgM.AS4DPgEDJwI!&rf=viewer_4&t=5)
>>
>>左侧的功能按钮包括展开全部、节点名称同时展示ID等等，后续版本会根据实际情况更新。

###
    by the way，If you have better suggestions or comments, please send them to my email(2414566866@qq.com)，Thanks!
    By another way,The ownership of the cat belongs to the original author,Invasion and deletion.        
![all](http://m.qpic.cn/psb?/V12x3UMs3ekTkH/edy6qWSEc4nhtQgTqSSVnoauzqfhTvB63bf3XKGspCY!/b/dL8AAAAAAAAA&bo=gAepA4AHqQMDR2I!&rf=viewer_4&t=5)
### Finally,Enjoy yourself !