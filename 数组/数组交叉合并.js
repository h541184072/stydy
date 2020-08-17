function fn(arr1, arr2) {
    let i = 0;
    let j = 0;
    let len = arr1.length + arr2.length;
    let z = 0;
    const res = [];
    while (z++ < len) {
        if (!arr1[i]) {
            res.push(arr2[j++]);
            continue;
        }
        if (!arr2[j]) {
            res.push(arr1[i++]);
            continue;
        }
        if (z % 2 === 1) {
            res.push(arr1[i++]);
        } else {
            res.push(arr2[j++]);
        }
    }

    return res;
}

console.log(fn([1, 2, 3, 4], [5, 6, 7, 8]));
console.log(fn([1, 2, 3, 4], [5, 6, 7, 8, 9, 10]));
console.log(fn([1, 2, 3, 4, 9, 10], [5, 6, 7, 8]));
