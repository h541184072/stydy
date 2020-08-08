function mergeSort(arr) {
    let len = arr.length;
    if (len < 2) return arr;
    let mid = len >> 1,
        left = arr.slice(0, mid),
        right = arr.slice(mid);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    const result = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length) {
        result.push(left.shift());
    }

    while (right.length) {
        result.push(right.shift());
    }

    return result;
}

console.log(mergeSort([5, 1234, 1, 2, 6, 2, 7, 990, 12, 3, 65, 23, 1]));
