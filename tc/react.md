---
react基础
---

1.Hooks 的实现

-   [《使用 React Hooks 重构你的小程序》](https://mp.weixin.qq.com/s/j_5zruGxkH5f0RLuruQsxA)

```text
要实现 Hooks 最关键的问题在于两个:

    - 找到正在执行的 React 函数
    - 找到正在执行的 Hooks 的顺序。
```

2.Fiber 想要达到的目的,需要解决 2 个问题

-   [《手写 React 的 Fiber 架构，深入理解其原理》](https://juejin.im/post/5ef014e851882565ce7ee0ca?utm_source=gold_browser_extension)

```text
(1)新的任务调度,有高优先级任务的时候将浏览器让出来,等浏览器空了再继续执行
    - requestIdleCallback
(2)新的数据结构,可以随时中断,下次进来可以接着执行
    - Fiber可中断数据结构
        child: 父节点指向第一个子元素的指针。
        sibling：从第一个子元素往后，指向下一个兄弟元素。
        return：所有子元素都有的指向父元素的指针。

        有了这几个指针后，我们可以在任意一个元素中断遍历并恢复，比如在上图List处中断了，恢复的时候可以通过child找到他的子元素，
        也可以通过return找到他的父元素，如果他还有兄弟节点也可以用sibling找到。Fiber这个结构外形看着还是棵树，
        但是没有了指向所有子元素的指针，父节点只指向第一个子节点，然后子节点有指向其他子节点的指针，这其实是个链表。
    -实现Filber 深度优先遍历
    -统一commit DOM操作
        上面我们的performUnitOfWork一边构建Fiber结构一边操作DOMappendChild，这样如果某次更新好几个节点，操作了第一个节点之后就中断了，
        那我们可能只看到第一个节点渲染到了页面，后续几个节点等浏览器空了才陆续渲染。为了避免这种情况，我们应该将DOM操作都搜集起来，
        最后统一执行，这就是commit。为了能够记录位置，我们还需要一个全局变量workInProgressRoot来记录根节点，
        然后在workLoop检测如果任务执行完了，就commit:
    -reconcile调和(#) 老节点跟新节点拿来对比，对比逻辑如下:
```

```javascript
function workLoop(deadline) {
    while (nextUnitOfWork && deadline.timeRemaining() > 1) {
        // 这个while循环会在任务执行完或者时间到了的时候结束
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }

    // 任务做完后统一渲染
    if (!nextUnitOfWork && workInProgressRoot) {
        commitRoot();
    }

    // 如果任务还没完，但是时间到了，我们需要继续注册requestIdleCallback
    requestIdleCallback(workLoop);
}

// performUnitOfWork用来执行任务，参数是我们的当前fiber任务，返回值是下一个任务
function performUnitOfWork(fiber) {}
requestIdleCallback(workLoop);
```

-   我们写的 JSX 代码被 babel 转化成了 React.createElement。
-   React.createElement 返回的其实就是虚拟 DOM 结构。
-   ReactDOM.render 方法是将虚拟 DOM 渲染到页面的。
-   虚拟 DOM 的调和和渲染可以简单粗暴的递归，但是这个过程是同步的，如果需要处理的节点过多，可能会阻塞用户输入和动画播放，造成卡顿。
-   Fiber 是 16.x 引入的新特性，用处是将同步的调和变成异步的。
-   Fiber 改造了虚拟 DOM 的结构，具有父 -> 第一个子，子 -> 兄，子 -> 父这几个指针，有了这几个指针，可以从任意一个 Fiber 节点找到其他节点。
-   Fiber 将整棵树的同步任务拆分成了每个节点可以单独执行的异步执行结构。
-   Fiber 可以从任意一个节点开始遍历，遍历是深度优先遍历，顺序是父 -> 子 -> 兄 -> 父，也就是从上往下，从左往右。
-   Fiber 的调和阶段可以是异步的小任务，但是提交阶段(commit)必须是同步的。因为异步的 commit 可能让用户看到节点一个一个接连出现，体验不好。
-   函数组件其实就是这个节点的 type 是个函数，直接将 type 拿来运行就可以得到虚拟 DOM。
-   useState 是在 Fiber 节点上添加了一个数组，数组里面的每个值对应了一个 useState，useState 调用顺序必须和这个数组下标匹配，不然会报错。

3.react 的新生命周期,为什么

```text
因为调和阶段是有可能会打断的，因此该函数会重复调用。
凡是在调和阶段被调用的函数基本是不被建议使用的。

React 会根据任务的优先级去分配各自的 expirationTime，在过期时间到来之前先去处理更高优先级的任务，并且高优先级的任务还可以打断低优先级的任务（因此会造成某些生命周期函数多次被执行），从而实现在不影响用户体验的情况下去分段计算更新（也就是时间分片）。

```

4.react16.X 的 diff 算法

-   [《react 源码解析》](https://yuchengkai.cn/react/2019-08-05.html#%E8%B0%83%E5%92%8C%E5%AD%90%E7%BB%84%E4%BB%B6)_`外链`_

```text
以下内容是对于 diff 算法的详解，虽然有三次 for 循环，但是本质上只是遍历了一次整个 newChild。

#正餐开始，第一轮遍历
    第一轮遍历的核心逻辑是复用和当前节点索引一致的老节点，一旦出现不能复用的情况就跳出遍历。

    那么如何复用之前的节点呢？规则如下：

    - 新旧节点都为文本节点，可以直接复用，因为文本节点不需要 key
    - 其他类型节点一律通过判断 key 是否相同来复用或创建节点（可能类型不同但 key 相同）

#第二轮遍历
    当第一轮遍历结束后，会出现两种情况：

    - newChild 已经遍历完
    - 老的节点已经遍历完了

    当出现 newChild 已经遍历完的情况时只需要把所有剩余的老节点都删除即可。删除的逻辑也就是设置 effectTag 为 Deletion，另外还有几个 fiber 节点属性需要提及下。
    当出现需要在渲染阶段进行处理的节点时，会把这些节点放入父节点的 effect 链表中，比如需要被删除的节点就会把加入进链表。这个链表的作用是可以帮助我们在渲染阶段迅速找到需要更新的节点。
    当出现老的节点已经遍历完了的情况时，就会开始第二轮遍历。这轮遍历的逻辑很简单，只需要把剩余新的节点全部创建完毕即可。
    这轮遍历在我们的例子中是不会执行的，因为我们以上两种情况都不符合。

#第三轮遍历
    第三轮遍历的核心逻辑是找出可以复用的老节点并移动位置，不能复用的话就只能创建一个新的了。

    那么问题又再次回到了如何复用节点并移动位置上。首先我们会把所有剩余的老节点都丢到一个 map 中。
    在遍历的过程中会寻找新的节点的 key 是否存在于这个 map 中，存在即可复用，不存在就只能创建一个新的了。其实这部分的复用及创建的逻辑和第一轮中的是一模一样的，所以也就不再赘述了。

    那么如果复用成功，就应该把复用的 key 从 map 中删掉，并且给复用的节点移动位置。这里的移动依旧不涉及 DOM 操作，而是给 effectTag 赋值为 Placement。

    此轮遍历结束后，就把还存在于 map 中的所有老节点删除
```

5.React hooks 的优点

```text
高阶组件:多层嵌套
解耦
```

6.React 架构

```text
- Scheduler (调度器) - 调度任务的优先级,高优先级任务先进入Reconciler
- Reconciler (协调器) - 负责找出变化的组件
- Render( 渲染器) - 负责将变化的组件渲染到页面上

Scheduler (调度器) :requestIdleCallback
Reconciler(协调器): 可中断的循环操作 每次循环判断当前是否有剩余时间,为有变化的虚拟DOM打上 增/删/更新的标记
    class 组件的调和过程大致分为两个部分：
        生命周期函数的处理
        调和子组件，也就是 diff 算法的过程
```
