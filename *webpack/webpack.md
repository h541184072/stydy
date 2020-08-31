首先先简单了解下 Webpack 构建过程：
-- 根据配置，识别入口文件；
-- 逐层识别模块依赖（包括 Commonjs、AMD、或 ES6 的 import 等，都会被识别和分析）；
-- Webpack 主要工作内容就是分析代码，转换代码，编译代码，最后输出代码；
-- 输出最后打包后的代码。

@babel/parser : 用于分析通过 fs.readFileSync 读取的文件内容，并返回 AST (抽象语法树) ；
@babel/traverse : 用于遍历 AST, 获取必要的数据；
@babel/core : babel 核心模块，提供 transformFromAst 方法，用于将 AST 转化为浏览器可运行的代码；
@babel/preset-env : 将转换后代码转化成 ES5 代码；

1.webpack 常用插件
\*\*优化 :webpack 编译速度优化

```text
css
    less-loader 用less转换成css
    style-loader  creteElmenet() innerHTml pannd
    css-loader  css里面的图片路径

    autoprefixer // 自动添加前缀
    mini-css-extract-plugin  抽取css成单独文件
    optimize-css-assets-webpack-plugin 压缩css
js
    babel-plugin-import 按需引入
    uglifyjs-webpack-plugin 多进程压缩js
    @babel/plugin-syntax-dynamic-import import() 懒加载
    eslint eslint-loader
    babel-loader    cacheDirectory: true     **优化
    @babel/preset-env es6=>es5
    @ babel / plugin-transform-runtime  代码抽离 generator
    @babel/runtime 配合上面的 生产下
    @babel/polyfill api
    @babel/core
html
    html-webpack-plugin  输出html 还可以splitChunk 移除注释等
img
    file-loader 路径问题 字体
    image-webpack-loader 压缩优化
    url-loader 小图base64 包含file-loader 的功能
other
    clean-webpack-plugin
    merge-webpack
    HappyPack 多进程 ParallelUglifyPlugin 压缩js    !作者不维护  **优化
    thread-loader 多进程   推荐  **优化
    lint-staged // 提交校验
------
expose-loader 暴露全局
new webpack.ProvidePlugin:{  // 模块里引入 不需要require, window.$ 没有
    jquery:'$'
}
外部拓展CDN
module.exports = {
    module:{
noParse:/jQuery/, 不解析jQuery 里的依赖项   **优化
rules:[
{
    include:'', **优化
    exclude:'' **优化
}]
}
+ externals: {
+   jquery: 'jQuery'
+ },
}
----------
// 全局变量
webpack.DefinePlugin({
    DEV:'"dev"'
})
// 代码优化
new webpack.IgnorePlugin(/\.\/local/,/moment/)  // 忽略moment语言包 只有自己按需引入

-----------
跨域
1.proxy
2.before钩子
3.webpack-dev-middle
 let compiler  = webpack(config)
express().use(middle(compiler))
-------

```

2.webpack mode:'development',''production'区别
默认添加一些插件 比如说 'production' 会添加 UglifyJsPlugin tree shaking

development，开发环境下的默认配置

```javascript
module.exports = {
    //开发环境下默认启用cache，在内存中对已经构建的部分进行缓存
    //避免其他模块修改，但是该模块未修改时候，重新构建，能够更快的进行增量构建
    //属于空间换时间的做法
    cache: true,
    output: {
        pathinfo: true, //输入代码添加额外的路径注释，提高代码可读性
    },
    devtools: 'eval', //sourceMap为eval类型
    plugins: [
        //默认添加NODE_ENV为development
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    ],
    optimization: {
        namedModules: true, //取代插件中的 new webpack.NamedModulesPlugin()
        namedChunks: true,
    },
};
```

production，生产环境下的默认配置

```javascript
module.exports = {
    performance: {
        hints: 'warning',
        maxAssetSize: 250000, //单文件超过250k，命令行告警
        maxEntrypointSize: 250000, //首次加载文件总和超过250k，命令行告警
    },
    plugins: [
        //默认添加NODE_ENV为production
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    ],
    optimization: {
        minimize: true, //取代 new UglifyJsPlugin(/* ... */)
        providedExports: true,
        usedExports: true,
        //识别package.json中的sideEffects以剔除无用的模块，用来做tree-shake
        //依赖于optimization.providedExports和optimization.usedExports
        sideEffects: true,
        //取代 new webpack.optimize.ModuleConcatenationPlugin()
        concatenateModules: true,
        //取代 new webpack.NoEmitOnErrorsPlugin()，编译错误时不打印输出资源。
        noEmitOnErrors: true,
    },
};
```

代码分析

```text
1.tapable 核心库
```

1.HRM
[小姐姐问我webpack热更新原理，我跟她说了一小时](https://mp.weixin.qq.com/s/gG_FwVGHiJGjQOvt5rZheA)
```text
1.整个流程分为客户端和服务端
2.通过websocket建立起 浏览器端和服务端之间的通信
3.服务端主要分为四个关键点
    (1)通过webpack创建compiler实例，webpack在watch模式下编译
       (1.1)compiler实例：监听本地文件的变化、文件改变自动编译、编译输出
       (1.2)更改config中的entry属性：将lib/client/index.js、lib/client/hot/dev-server.js注入到打包输出的chunk文件中
       (1.3)往compiler.hooks.done钩子（webpack编译完成后触发）注册事件：里面会向客户端发射hash和ok事件
    (2)调用webpack-dev-middleware：启动编译、设置文件为内存文件系统、里面有一个中间件负责返回编译的文件
    (3)创建webserver静态服务器：让浏览器可以请求编译生成的静态资源
    (4)创建websocket服务：建立本地服务和浏览器的双向通信；每当有新的编译，立马告知浏览器执行热更新逻辑
4.客户端主要分为两个关键点
    (1)创建一个 websocket客户端 连接 websocket服务端，websocket客户端监听 hash 和 ok 事件
    (2)主要的热更新客户端实现逻辑，浏览器会接收服务器端推送的消息，
        如果需要热更新，浏览器发起http请求去服务器端获取新的模块资源解析并局部刷新页面

webpack-dev-server 主要包含了三个部分：
1.webpack: 负责编译代码
2.webpack-dev-middleware: 主要负责构建内存文件系统，同时作为Express的中间件拦截请求，从内存文件系统中把结果拿出来。
3.express：负责搭建请求路由服务。

其次，介绍工作流程:
1.启动dev-server，webpack开始构建，在编译期间会向 entry 文件注入热更新代码；
2.Client 首次打开后，Server 和 Client 基于Socket建立通讯渠道；
3.修改文件，Server 端监听文件发送变动，webpack开始编译，直到编译完成会触发"Done"事件；
4.Server通过socket 发送消息告知 Client；
5.Client根据Server的消息（hash值和state状态），通过ajax请求获取 Server 的manifest描述文件；
6.Client对比当前 modules tree ，再次发请求到 Server 端获取新的JS模块；
7.Client获取到新的JS模块后，会更新 modules tree并替换掉现有的模块；
8.最后调用 module.hot.accept() 完成热更新；
```

1.webpack 中 loader 和 plugin 的区别是什么
```text
loader，它是一个转换器，将A文件进行编译成B文件，比如：将A.less转换为A.css，单纯的文件转换过程。

plugin是一个扩展器，它丰富了webpack本身，针对是loader结束后，webpack打包的整个过程，它并不直接操作文件，
而是基于事件机制工作，会监听webpack打包过程中的某些节点，执行广泛的任务
```
