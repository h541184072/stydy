// 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。
//
// 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。
//
// 问总共有多少条不同的路径？
//
//
//
// 例如，上图是一个7 x 3 的网格。有多少可能的路径？
//
// 说明：m 和 n 的值均不超过 100。
//
// 示例 1:
//
// 输入: m = 3, n = 2
// 输出: 3
// 解释:
// 从左上角开始，总共有 3 条路径可以到达右下角。
// 1. 向右 -> 向右 -> 向下
// 2. 向右 -> 向下 -> 向右
// 3. 向下 -> 向右 -> 向右

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
// 堆栈溢出 自己写的 不行
var uniquePaths = function(m, n) {
    return helper(m, n, new Map());
};

function helper(m, n, hashMap) {
    if (m === 1 || n === 1) return 1;
    if (hashMap.has([m, n])) {
        return hashMap.get([m, n]);
    }
    const first = helper(m - 1, n, hashMap);
    const second = helper(m, n - 1, hashMap);
    hashMap.set([m - 1, n], first);
    hashMap.set([n, m - 1], first);
    hashMap.set([n - 1, m], second);
    hashMap.set([m, n - 1], second);
    return first + second;
}

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
// 动态规划
var uniquePaths = function(m, n) {
    let db = Array(n).fill(1);
    // 下面的m n 不能互换
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            db[j] += db[j - 1];
        }
    }

    return db[n - 1];
};

console.log(uniquePaths(3,2))
