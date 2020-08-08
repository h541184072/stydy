function sub_curry(fn) {
    const args = [].slice.call(arguments, 1);
    return function() {
        return fn.apply(this, args.concat([].slice.call(arguments)));
    };
}

function curry(fun, length) {
    length = length || fun.length;
    const slice = Array.prototype.slice;
    return function() {
        if (arguments.length < length) {
            const combined = [fun].concat(slice.call(arguments));
            return curry(sub_curry.apply(this, combined), length - arguments.length);
        } else {
            return fun.apply(this, slice.call(arguments));
        }
    };
}

var fn = curry(function(a, b, c) {
    return [a, b, c];
});

console.log(fn('a')('b', 'c'));

const curry2 = (fn, ...arg) => {
    let all = arg || [],
        length = fn.length;
    return (...rest) => {
        let _args = all.slice(0); //拷贝新的all，避免改动公有的all属性，导致多次调用_args.length出错
        _args.push(...rest);
        if (_args.length < length) {
            return curry2.call(this, fn, ..._args);
        } else {
            return fn.apply(this, _args);
        }
    };
};

const curry3 = function(fn, ...args) {
    return fn.length <= args.length ? fn(...args) : curry3.bind(null, fn, ...args);
};
