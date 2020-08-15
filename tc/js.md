---
js基础
---

5.类数组的转换

```javascript
const arrayLike = {
    0: 'Java',
    1: 'Python',
    2: 'JavaScript',
    length: 3,
};
// const arr4 = [...arrayLike]; // 不行 arguments可以 没有迭代器
const arr5 = Array.from(arrayLike);
const arr1 = [].slice.call(arrayLike);
const arr2 = Array.prototype.slice.call(arrayLike);
const arr3 = Array.prototype.splice.call(arrayLike, 0); // 改变了arrayLike
```

7.判断 this 的绑定对象。

```text
1. 由 new 调用？绑定到新创建的对象。
2. 由 call 或者 apply（或者 bind）调用？绑定到指定的对象。
3. 由上下文对象调用？绑定到那个上下文对象。
4. 默认：在严格模式下绑定到 undefined，否则绑定到全局对象。
```

8.in,hasOwnProperty,Object.keys(..),Object.getOwnPropertyNames(..)

```text
in操作符会检查属性是否在对象及其 [[Prototype]] 原型链中 (enumerable false也可以  for in false不可以)
hasOwnProperty(..)只会检查属性是否在myObject对象中，不会检查[[Prototype]]链 ((enumerable false也可以)
Object.keys(..)会返回一个数组，包含所有可枚举属性 (enumerable:true)
Object.getOwnPropertyNames(..)会返回一个数组，包含所有属性，无论它们是否可枚举。

in和hasOwnProperty(..)的区别在于是否查找[[Prototype]]链，然而,
Object.keys(..),Object.getOwnPropertyNames(..)都只会查找对象直接包含的属性。
```

9.CommonJS 和 esMoudle

```text
1.CommonJS 运行时加载 导致完全没办法在编译时做“静态优化”。
2.ES6 模块而是通过export命令显式指定输出的代码，再通过import命令输入。
这种加载称为“编译时加载”或者静态加载，即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。
由于 ES6 模块是编译时加载，使得静态分析成为可能。有了它，就能进一步拓宽 JavaScript 的语法，比如引入宏（macro）和类型检验（type system）这些只能靠静态分析实现的功能。
    其他好处
-不再需要UMD模块格式了，将来服务器和浏览器都会支持 ES6 模块格式。目前，通过各种工具库，其实已经做到了这一点。
-将来浏览器的新 API 就能用模块格式提供，不再必须做成全局变量或者navigator对象的属性。
-不再需要对象作为命名空间（比如Math对象），未来这些功能可以通过模块提供。

```

14.如何进行首屏加载优化

```text
CDN
lazy
代码混淆压缩
gzip
http3
SSR等
```

15.作用域 作用域链

```text
作用域： 作用域是定义变量的区域，它有一套访问变量的规则，这套规则来管理浏览器引擎如何在当前作用域以及嵌套的作用域中根据变量（标识符）进行变量查找。
作用域链： 作用域链的作用是保证对执行环境有权访问的所有变量和函数的有序访问，通过作用域链，我们可以访问到外层环境的变量和函数。
```

17.js 运行机制

-   [event loop](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/7)

```text
(macro)task->渲染->(macro)task->...

执行一个宏任务（栈中没有就从事件队列中获取）
执行过程中如果遇到微任务，就将它添加到微任务的任务队列中
宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）
当前宏任务执行完毕，开始检查渲染，然后GUI线程接管渲染
渲染完毕后，JS线程继续接管，开始下一个宏任务（从事件队列中获取）
```

![image](https://camo.githubusercontent.com/47479c8773d91e8eef4a359eca57bb1361183b9e/68747470733a2f2f692e6c6f6c692e6e65742f323031392f30322f30382f356335643661353238626461662e6a7067)

18. V8 引擎的垃圾回收机制

```text
v8 的垃圾回收机制基于分代回收机制，这个机制又基于世代假说，这个假说有两个特点，一是新生的对象容易早死，另一个是不死的对象会活得更久。基于这个假说，v8 引擎将内存分为了新生代和老生代。

新创建的对象或者只经历过一次的垃圾回收的对象被称为新生代。经历过多次垃圾回收的对象被称为老生代。

新生代被分为 From 和 To 两个空间，To 一般是闲置的。当 From 空间满了的时候会执行 Scavenge 算法进行垃圾回收。当我们执行垃圾回收算法的时候应用逻辑将会停止，等垃圾回收结束后再继续执行。这个算法分为三步：

（1）首先检查 From 空间的存活对象，如果对象存活则判断对象是否满足晋升到老生代的条件，如果满足条件则晋升到老生代。如果不满足条件则移动 To 空间。

（2）如果对象不存活，则释放对象的空间。

（3）最后将 From 空间和 To 空间角色进行交换。

新生代对象晋升到老生代有两个条件：

（1）第一个是判断是对象否已经经过一次 Scavenge 回收。若经历过，则将对象从 From 空间复制到老生代中；若没有经历，则复制到 To 空间。

（2）第二个是 To 空间的内存使用占比是否超过限制。当对象从 From 空间复制到 To 空间时，若 To 空间使用超过 25%，则对象直接晋升到老生代中。设置 25% 的原因主要是因为算法结束后，两个空间结束后会交换位置，如果 To 空间的内存太小，会影响后续的内存分配。

老生代采用了标记清除法和标记压缩法。标记清除法首先会对内存中存活的对象进行标记，标记结束后清除掉那些没有标记的对象。由于标记清除后会造成很多的内存碎片，不便于后面的内存分配。所以了解决内存碎片的问题引入了标记压缩法。

由于在进行垃圾回收的时候会暂停应用的逻辑，对于新生代方法由于内存小，每次停顿的时间不会太长，但对于老生代来说每次垃圾回收的时间长，停顿会造成很大的影响。
为了解决这个问题 V8 引入了增量标记的方法，将一次停顿进行的过程分为了多步，每次执行完一小步就让运行逻辑执行一会，就这样交替运行
```

19.哪些操作会造成内存泄漏？

```text
1.意外的全局变量 // use strict 解决
2.被遗忘的计时器或回调函数
3.脱离 DOM 的引用
4.闭包
```

21.执行上下文(EC) 执行栈 后进先出

```text
执行上下文可以简单理解为一个对象:

它包含三个部分:

    this指向
    作用域链(词法作用域)
    变量对象(VO)

代码执行过程:

    创建 全局上下文 (global EC)
    全局执行上下文 (caller) 逐行 自上而下 执行。遇到函数时，函数执行上下文 (callee) 被push到 执行栈 顶层
    函数执行上下文被激活，成为 active EC, 开始执行函数中的代码，caller 被挂起
    函数执行完后，callee 被pop移除出执行栈，控制权交还全局上下文 (caller)，继续执行

let a = 20;
const b = 30;
var c;

function multiply(e, f) {
 var g = 20;
 return e * f * g;
}

c = multiply(20, 30);
// 在 ES6 中，词法 环境和 变量 环境的区别在于前者用于存储**函数声明和变量（ let 和 const ）绑定，而后者仅用于存储变量（ var ）**绑定。

1.创建阶段
GlobalExectionContext = {  // 全局执行上下文
 ThisBinding: <Global Object>,  // 1.1确定this
 LexicalEnvironment: {    	  // 1.2词法环境
    EnvironmentRecord: {   		// 1.2.1环境记录
      Type: "Object",      		   // 1.2.1.1全局环境  windows
      // 标识符绑定在这里
      a: < uninitialized >,
      b: < uninitialized >,
      multiply: < func >
  },
     outer: <null>  	   		   // 1.2.2对外部环境的引用

 }
 VariableEnvironment: {   // 1.3变量环境
     EnvironmentRecord: {
       Type: "Object",
       // 标识符绑定在这里
       c: undefined,
     }
     outer: <null>
   }


FunctionExectionContext = { // 函数执行上下文
 ThisBinding: <Global Object>,     // 确定this
 LexicalEnvironment: {  	  // 词法环境
    EnvironmentRecord: {  		// 环境记录
      Type: "Declarative",  	   // 1.2.1.2函数环境 arguments
      // 标识符绑定在这里
      Arguments: {0: 20, 1: 30, length: 2},
    }
    outer: <Global or outer function environment reference>    // 对外部环境的引用
  }
 VariableEnvironment: {
     EnvironmentRecord: {
       Type: "Declarative",
       // 标识符绑定在这里
       g: undefined
     },
     outer: <GlobalLexicalEnvironment>
   }
}

```

22. ES5/ES6 的继承除了写法以外还有什么区别？

```text
问题是继承的差异。

class Super {}
class Sub extends Super {}

const sub = new Sub();

Sub.__proto__ === Super;
子类可以直接通过 __proto__ 寻址到父类。

function Super() {}
function Sub() {}

Sub.prototype = new Super();
Sub.prototype.constructor = Sub;

var sub = new Sub();

Sub.__proto__ === Function.prototype;


es5 先创建子的this ,call 复制
es6先新建父类的实例对象this。然后再用子类的构造函数修改this

```

23.input 搜索如何防抖，如何处理中文输入 - 参考 elementui compositionstart

```text
 function jeiliu(timeout){
        var timer;
        function input(e){
        if(e.target.composing){
            return ;
        }
        if(timer){
           clearTimeout(timer);
        }
        timer = setTimeout(() => {
               console.log(e.target.value);
               timer = null;
           }, timeout);
        }
        return input;
    }

    function onCompositionStart(e){
        e.target.composing = true;
    }
    function onCompositionEnd(e){
        //console.log(e.target)
        e.target.composing = false;
        var event = document.createEvent('HTMLEvents');
        event.initEvent('input');
        e.target.dispatchEvent(event);
    }
    var input_dom = document.getElementById('myinput');
    input_dom.addEventListener('input',jeiliu(1000));
    input_dom.addEventListener('compositionstart',onCompositionStart);
    input_dom.addEventListener('compositionend',onCompositionEnd);
```
