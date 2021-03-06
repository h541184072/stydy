var page = page || {};
page.dom = page.dom || {};
//子函数1：处理文本
page.dom.Text = function() {
    this.insert = function(where) {
        var txt = document.createTextNode(this.url);
        where.appendChild(txt);
    };
};

//子函数2：处理链接
page.dom.Link = function() {
    this.insert = function(where) {
        var link = document.createElement('a');
        link.href = this.url;
        link.appendChild(document.createTextNode(this.url));
        where.appendChild(link);
    };
};

//子函数3：处理图片
page.dom.Image = function() {
    this.insert = function(where) {
        var im = document.createElement('img');
        im.src = this.url;
        where.appendChild(im);
    };
};

// 那么我们如何定义工厂处理函数呢？其实很简单：

page.dom.factory = function(type) {
    return new page.dom[type]();
};
// 使用方式如下：

var o = page.dom.factory('Link');
o.url = 'http://www.cnblogs.com';
o.insert(document.body);


// 什么时候使用工厂模式
//
// 以下几种情景下工厂模式特别有用：
//
// 对象的构建十分复杂
// 需要依赖具体环境创建不同实例
// 处理大量具有相同属性的小对象
// 什么时候不该用工厂模式
//
// 不滥用运用工厂模式，有时候仅仅只是给代码增加了不必要的复杂度，同时使得测试难以运行下去。
