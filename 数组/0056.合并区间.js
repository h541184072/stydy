function arr(arr) {
    if (!arr.length) return [];
    arr = arr.sort((a, b) => a[0] - b[0]);
    let res = [arr[0]];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i][0] > res[res.length - 1][1]) {
            res.push(arr[i]);
        } else if (arr[i][1] > res[res.length - 1][1]) {
            res[res.length - 1][1] = arr[i][1];
        }
    }

    return res;
}
