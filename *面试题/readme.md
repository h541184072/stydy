1.  hash chunkhash contenthash  的区别
```text
hash 
    一个变了 别的都变
chunkhash  
    它根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的哈希值。
    但还如果一个js里引入了css 他们的hash值是一样的 js改变了css也会改变 所以也不行
contenthash
    是针对文件内容级别的，只有你自己模块的内容变了，那么hash值才改变
    new extractTextPlugin('../css/bundle.[name].[contenthash].css')

ETag 里的hash   last-modify + content-length
```

2.标记清除 怎么判断被引用了

(引用计数有一个致命的问题，那就是循环引用) -- 现在浏览器不在使用这个算法

```text
JavaScript 的内存生命周期是
1、分配你所需要的内存
2、使用分配到的内存（读、写）
3、不需要时将其释放、归还
JavaScript 有自动垃圾收集机制，最常用的是通过标记清除的算法来找到哪些对象是不再继续使用的，
使用 a = null 其实仅仅只是做了一个释放引用的操作，让 a 原本对应的值失去引用，脱离执行环境，这个值会在下一次垃圾收集器执行操作时被找到并释放。

闭包中的变量并不保存中栈内存中，而是保存在堆内存中，这也就解释了函数之后之后为什么闭包还能引用到函数内的变量。

标记清除法:
    标记清除算法将“不再使用的对象”定义为“无法到达的对象”。即从根部（在JS中就是全局对象）出发定时扫描内存中的对象，凡是能从根部到达的对象，保留。
那些从根部出发无法触及到的对象被标记为不再使用，稍后进行回收。
    无法触及的对象包含了没有引用的对象这个概念，但反之未必成立。

常用垃圾回收算法叫做**标记清除 （Mark-and-sweep） **，算法由以下几步组成：

    1、垃圾回收器创建了一个“roots”列表。roots 通常是代码中全局变量的引用。JavaScript 中，“window” 对象是一个全局变量，被当作 root 。window 对象总是存在，因此垃圾回收器可以检查它和它的所有子对象是否存在（即不是垃圾）；
    2、所有的 roots 被检查和标记为激活（即不是垃圾）。所有的子对象也被递归地检查。从 root 开始的所有对象如果是可达的，它就不被当作垃圾。
    3、所有未被标记的内存会被当做垃圾，收集器现在可以释放内存，归还给操作系统了。
    现代的垃圾回收器改良了算法，但是本质是相同的：可达内存被标记，其余的被当作垃圾回收。
```

3.什么情况用 tostring 什么情况用 valueof

5.history 是如何监听的

1:str= ‘sdfsd{{}}123123{}’，判断花括号是否成对出现

```javascript
const str = 'sdfsd{{}}123123{}{{}}';
function fn(str) {
    if (!str) return false;

    const stack = [];
    let cur = '';
    let i = 0;
    while ((cur = str[i])) {
        if (cur === '{') {
            stack.push(cur);
        }

        if (cur === '}') {
            if (stack.length === 0) return false;
            stack.pop();
        }
        i++;
    }
    return stack.length === 0;
}
console.log(fn(str));
```

2:js 有哪些作用域

```text
全局
函数
eval
catch
块级作用域
```

3:简述 fiber 算法。 react-2,4 题

```text
React16架构可以分为三层：

    Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入Reconciler
    Reconciler（协调器）—— 负责找出变化的组件
    Renderer（渲染器）—— 负责将变化的组件渲染到页面上

实现 requestIdleCallback 函数的核心只有一点，如何多次在浏览器空闲时且是渲染后才调用回调方法？
    到这里为止，requestAnimationFrame + 计算帧时间及下一帧时间 + MessageChannel 就是我们实现 requestIdleCallback 的三个关键点了。
调度的流程
    -首先每个任务都会有各自的优先级，通过当前时间加上优先级所对应的常量我们可以计算出 expirationTime，高优先级的任务会打断低优先级任务
    -在调度之前，判断当前任务是否过期，过期的话无须调度，直接调用 port.postMessage(undefined)，这样就能在渲染后马上执行过期任务了
    -如果任务没有过期，就通过 requestAnimationFrame 启动定时器，在重绘前调用回调方法
    -在回调方法中我们首先需要计算每一帧的时间以及下一帧的时间，然后执行 port.postMessage(undefined)
    -channel.port1.onmessage 会在渲染后被调用，在这个过程中我们首先需要去判断当前时间是否小于下一帧时间。
    如果小于的话就代表我们尚有空余时间去执行任务；如果大于的话就代表当前帧已经没有空闲时间了，这时候我们需要去判断是否有任务过期，
    过期的话不管三七二十一还是得去执行这个任务。如果没有过期的话，那就只能把这个任务丢到下一帧看能不能执行了
```

4:箭头函数为什么不能作为构造函数

```text
1、函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。

2、不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

3、不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。

4、不可以使用 new 命令，因为：

没有自己的 this，无法调用 call，apply。
没有 prototype 属性 ，而 new 命令在执行时需要将构造函数的 prototype 赋值给新的对象的 __proto__

```

5:http2.0 对比 http1.1 升级了什么，内部如何实现的

```text
HTTP/2的多路复用就是为了解决上述的两个性能问题。 在 HTTP/2 中，有两个非常重要的概念，分别是帧（frame）和流（stream）。 
帧代表着最小的数据单位，每个帧会标识出该帧属于哪个流，流也就是多个帧组成的数据流。 多路复用，就是在一个 TCP 连接中可以存在多条流。
换句话说，也就是可以发送多个请求，对端可以通过帧中的标识知道属于哪个请求。通过这个技术，可以避免 HTTP 旧版本中的队头阻塞问题，极大的提高传输性能。

头部压缩(字典) 服务端推送 二进制传输
```

7:var obj = {name:2}使用 alert(obj)，返回 1. -:toString

8：数组跟链表的优缺点，查询跟插入的复杂度。 -\*\*

9:http 缓存机制

10:简述 LRU // 0146.LRU缓存机制.js

11:js 声明一个变量，最少占用多少字节 -:8?

12:简述 webpack 内部原理，画出时序图

13:写过 loader 或者 plugin 吗

14:使用 promise.all，如果中间有一个失败了，但是还是想要拿到已经成功的值，怎么做。 -: allSettled Promise.reject(2).catch(err=>err)

15:async 比 generator 有哪些好处。 -:同步的写法,代码自执行

16:懒加载的原理。 -: 动态script onload

17：ISO 有哪七层，tcp/ip 在哪一层 -: 传输层 网络层

18:CORS 怎么配置 -:Access-Control-Allow-Origin:\*

19:什么时候会发送 options 请求。 -:跨域的非简单请求

20:一个树结构，求任意两个节点的最近的父节点。 -:二叉树
