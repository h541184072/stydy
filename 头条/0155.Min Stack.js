// MinStack minStack = new MinStack();
// minStack.push(-2);
// minStack.push(0);
// minStack.push(-3);
// minStack.getMin();   --> Returns -3.
// minStack.pop();
// minStack.top();      --> Returns 0.
// minStack.getMin();   --> Returns -2.

/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.arr = [];
    this.min = Number.MAX_VALUE;
};
MinStack.prototype.push = function(x) {
    const min = this.min;
    if (x < this.min) {
        this.min = x;
    }
    this.arr.push(x - min);
};
MinStack.prototype.pop = function() {
    const x = this.arr.pop();
    if (x < 0) {
        this.min = this.min - x;
    }
};
MinStack.prototype.top = function() {
    let x = this.arr[this.arr.length - 1];
    const min = this.min;
    if (x < 0) {
        return min;
    }
    return min + x;
};
MinStack.prototype.getMin = function() {
    return this.min;
};
