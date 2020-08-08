Function.prototype.before = function(beforeFun) {
    const _self = this;

    return function() {
        beforeFun.apply(this, arguments);
        return _self.apply(this, arguments);
    };
};

Function.prototype.after = function(afterFun) {
    const _self = this;
    return function() {
        const res = _self.apply(this, arguments);
        afterFun.apply(this, arguments);
        return res;
    };
};

var func = function() {
    console.log(2);
};

func = func
    .before(function() {
        console.log(1);
    })
    .after(function() {
        console.log(3);
    });

func();
