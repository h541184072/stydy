首先先简单了解下 Webpack 构建过程：
-- 根据配置，识别入口文件；
-- 逐层识别模块依赖（包括 Commonjs、AMD、或 ES6 的 import 等，都会被识别和分析）；
-- Webpack 主要工作内容就是分析代码，转换代码，编译代码，最后输出代码；
-- 输出最后打包后的代码。

@babel/parser : 用于分析通过 fs.readFileSync  读取的文件内容，并返回 AST (抽象语法树) ；
@babel/traverse : 用于遍历 AST, 获取必要的数据；
@babel/core : babel 核心模块，提供 transformFromAst 方法，用于将 AST 转化为浏览器可运行的代码；
@babel/preset-env : 将转换后代码转化成 ES5 代码；

1.webpack 常用插件
 **优化   :webpack编译速度优化
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
    pathinfo: true //输入代码添加额外的路径注释，提高代码可读性
  },
  devtools: "eval", //sourceMap为eval类型
  plugins: [
    //默认添加NODE_ENV为development
    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
  ],
  optimization: {
    namedModules: true, //取代插件中的 new webpack.NamedModulesPlugin()
    namedChunks: true
  }
}
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
    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") })
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
    noEmitOnErrors: true
  }
}
```

代码分析
```text
1.tapable 核心库
```

entry


