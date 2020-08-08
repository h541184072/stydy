Function.prototype.bind2 = function(context) {
    var self = this;
    var args = [].slice.call(arguments, 1);

    var f = function() {
        return self.apply(this instanceof f ? this : context, [...args, ...arguments]);
    };

    f.prototype = Object.create(this.prototype);

    return f;
};



function a(aa) {
    console.log(this.name)
    console.log(aa)
}


const b = a.bind2({name:'bb'})

b(1)

new b(22)

