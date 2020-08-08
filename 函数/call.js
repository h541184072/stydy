Function.prototype.call = function (context) {
    context = context ? Object(context) : window;
    context.fn = this;

    let args = [...arguments].slice(1);
    let result = context.fn(...args);

    delete context.fn
    return result;
}


// ES5
Function.prototype.call = function (context) {
    context = context ? Object(context) : window;
    context.fn = this;

    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }
    var result = eval('context.fn(' + args +')');

    delete context.fn
    return result;
}

