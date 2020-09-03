Function.prototype.bind2 = function(context, ...args) {
    const fn = this;

    const fn2 = function() {
        return fn.apply(this instanceof fn2 ? this : context, [...args, ...arguments]);
    };

    fn2.prototype = Object.create(fn.prototype);

    return fn2;
};

function aaa(age) {
    console.log(this.name);
    console.log(age)
}

const a = aaa.bind2({ name: 'bbb' });
a()

new a(11)
