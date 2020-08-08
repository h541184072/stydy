function Stack() {
    var items = [];
    this.push = function(element) {
        items.push(element);
    };
    this.pop = function() {
        return items.pop();
    };
    this.peek = function() {
        return items[items.length - 1];
    };
    this.isEmpty = function() {
        return items.length == 0;
    };
    this.size = function() {
        return items.length;
    };
    this.clear = function() {
        items = [];
    };
    this.print = function() {
        console.log(items.toString());
    };
}

// 10进制转2进制
function divideBy2(decNumber) {
    var remStack = new Stack(),
        rem,
        binaryString = '';

    while (decNumber > 0) {
        // rem = Math.floor(decNumber % 2);
        rem = decNumber % 2 | 0;
        remStack.push(rem);
        decNumber = (decNumber / 2) | 0;
    }

    while (!remStack.isEmpty()) {
        binaryString += remStack.pop() + '';
    }

    return binaryString;
}

// 10进制转其他
function baseConverter(decNumber, base) {
    var remStack = new Stack(),
        rem,
        baseString = '',
        digits = '0123456789ABCDEF';

    while (decNumber > 0) {
        rem = decNumber % base | 0;
        remStack.push(rem);
        decNumber = (decNumber / base) | 0;
    }

    while (!remStack.isEmpty()) {
        baseString += digits[remStack.pop()];
    }

    return baseString;
}

console.log(divideBy2(10));
console.log(baseConverter(100345, 2));
console.log(baseConverter(100345, 8));
console.log(baseConverter(100345, 16));

// 执行栈
