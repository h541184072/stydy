25.severless 演变
[微保 Serverless 实践之架构演进](https://mp.weixin.qq.com/s/kaUVf-dgXWZs7-MU14iZTg)
![image](https://mmbiz.qpic.cn/mmbiz_png/iaGw4pBC4YzetiawhB3Mhia1mNKh3ibxialxxVtAjqIYlOfcEqSECUXRiajibPRLteaLyBoOOKj8CCvBprXCg0RJLd5GA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)
![image](https://mmbiz.qpic.cn/mmbiz_png/iaGw4pBC4YzetiawhB3Mhia1mNKh3ibxialxx8ziaQs4SG7UmaclI4v0U6g9nonOXhLspKVyNmFhicHjU10q2237icRT4Q/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

```text
1. 前后端分离 开始可能调5个接口 , 代码量大
2. node中间层
    渲染层对后端的服务进行聚合，减少页面请求
    中间层对数据进行加工，大大减少小程序端的逻辑代码量

中间层的应用部署在2台CVM机器上，有其先天的一些不足：

    (1)应对尖峰流量的冲击能力差,微保经常会有一些运营和投放需求，这些事件都会导致瞬间的大流量打入，CVM的扩容相对滞后。
    (2)App级别的部署与发布,中间层不断积累业务代码，整个应用线性增长，每次部署与发布都是巨石应用的发布，部署效率低、风险高。
    (3)前端开发人员在开发、测试环境中需要自己在机器上查阅日志和服务操作，提高了普及的门槛
3.我们在前端引入云函数，架构进一步调整
    C端的请求发至云函数API网关，网关转发请求至相应的云函数实例，云函数再向后请求服务的网关。整个链条上最大的变化是将云函数取代了node app，成为中间层的技术形态。
好处:
    (1)自动扩缩容
    (2)函数级别的开发与部署
       一个云函数对应一个gitlab的项目，函数开发与发布都是围绕单个项目进行CI/CD，高效、安全。 
    (3)按需收费
    (4)简单的运维管理
        开发者不需要在服务器上自己维护服务和查阅日志，通过云函数的配套工具轻松管理函数、查阅日志，也可以根据自己的诉求设置告警机制。
```
