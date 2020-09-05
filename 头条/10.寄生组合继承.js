function SuperFun() {
    this.name = 1;
}

SuperFun.prototype.getName = function() {
    return this.name;
};

function SubFun(...args) {
    SuperFun.apply(this, args);
    this.age = 2;
}

SubFun.prototype = Object.create(SuperFun.prototype);
SubFun.prototype.constructor = SubFun;

SubFun.prototype.getAge = function() {
    return this.age;
};
