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

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    const min = this.min;
    if (x < this.min) {
        this.min = x;
    }
    this.arr.push(x - min);
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    const x = this.arr.pop();
    if (x < 0) {
        this.min = this.min - x;
    }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    let x = this.arr[this.arr.length - 1];
    const min = this.min;
    if (x < 0) {
        return min;
    }
    return min + x;
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return this.min;
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
