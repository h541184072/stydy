//fn(i,j) = max(fn(i-1,j),fn(i-1,j-weight[j])+values[j])
// https://juejin.im/entry/6844903550334533639#comment
function fn(weights, values, W) {
    const n = weights.length - 1;
    const fn = [[]];
    for (let j = 0; j <= W; j++) {
        if (j < weights[0]) {
            fn[0][j] = 0;
        } else {
            fn[0][j] = values[0];
        }
    }

    for (let j = 0; j <= W; j++) {
        for (let i = 1; i <= n; i++) {
            if (!fn[i]) fn[i] = [];
            if (j < weights[i]) {
                fn[i][j] = fn[i - 1][j];
            } else {
                fn[i][j] = Math.max(fn[i - 1][j], fn[i - 1][j - weights[i]] + values[i]);
            }
        }
    }

    return fn[n][W];
}

console.log(fn([2, 2, 6, 5, 4], [6, 3, 5, 4, 6], 10));
