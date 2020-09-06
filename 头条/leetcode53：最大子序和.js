function arr(arr) {
    let max = arr[0];
    let pre = 0;
    for (let v of arr) {
        if (pre > 0) {
            pre += v;
        } else {
            pre = v;
        }

        max = Math.max(pre, max);
    }

    return max;
}
