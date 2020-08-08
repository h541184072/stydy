// 而反柯里化，从字面讲，意义和用法跟函数柯里化相比正好相反，扩大适用范围，创建一个应用范围更广的函数。
// 使本来只有特定对象才适用的方法，扩展到更多的对象。
//
// https://www.cnblogs.com/dupd/p/8449711.html
// https://github.com/mqyqingfeng/Blog/issues/11

Function.prototype.unCurrying = function() {
    const self = this
    return function(...rest) {
        return Function.prototype.call.apply(self, rest)
    }
}

Function.prototype.uncurrying = function() {
    var self = this;
    return function() {
        return Function.prototype.call.apply(self,arguments)
    };
}

Function.prototype.unCurrying = function() {
    return this.call.bind(this)
}

Function.prototype.uncurrying = function() {
    var self = this;
    return function() {
        var obj = Array.prototype.shift.call(arguments);
        return self.apply(obj, arguments);
    };
};

function unCurrying(fn) {
    return function(tar, ...argu) {
        return fn.apply(tar, argu)
    }
}

const push = Array.prototype.push.unCurrying()

~function(...rest) {       // rest:[1,2,3]
    push(rest, 4)
    console.log(rest)    // [1, 2, 3, 4]
}(1, 2, 3)


const obj = { a: '嘻嘻' }
push(obj, '呵呵', '哈哈', '嘿嘿')
console.log(obj)   // { '0': '呵呵', '1': '哈哈', '2': '嘿嘿', a: '嘻嘻', length: 3 }
