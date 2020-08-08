// 币值分别为1、5、11，要凑够15元 最少硬币的个数
// https://juejin.im/post/5e86d0ad6fb9a03c387f3342

// f(n) = min(f(n-1),f(n-5),f(n-11))+1

function f(n) {
    if (n === 0) return 0;
    let min = Infinity;
    if (n >= 1) {
        min = Math.min(f(n - 1) + 1, min);
    }
    if (n >= 5) {
        min = Math.min(f(n - 5) + 1, min);
    }
    if (n >= 11) {
        min = Math.min(f(n - 11) + 1, min);
    }

    return min;
}

// hash n=27000还是会爆栈
function f2(n) {
    const hash = {};
    function step(amount) {
        if (amount === 0) return 0;
        if (hash[amount]) return hash[amount];
        let min = Infinity;
        if (amount >= 1) {
            min = Math.min(step(amount - 1) + 1, min);
        }
        if (amount >= 5) {
            min = Math.min(step(amount - 5) + 1, min);
        }
        if (amount >= 11) {
            min = Math.min(step(amount - 11) + 1, min);
        }
        return (hash[amount] = min);
    }

    return step(n);
}

// 动态规划
// f(n) = min(f(n-1),f(n-5),f(n-11))+1
// 边界问题
// f[0] = 0 (n=0)
// f[n] = min(f[n-1], f[n-5], f[n-11]) + 1 (n>0)

// 输入: coins = [1, 2, 5], amount = 11
// 输出: 3
// 解释: 11 = 5 + 5 + 1
// 处理边界问题: 依然是老套路,当n为负数的时候,值为正无穷大,当n=0时,值也为0.
// f[0] = 0 (n=0)
// f[n] = min(f[n-cᵢ]) + 1 (n>0)
function f3(coins, amout) {
    const dp = new Array(amout + 1).fill(Infinity);
    dp[0] = 0;
    for (let i = 1; i < dp.length; i++) {
        for (let coin of coins) {
            if (i >= coin) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    return dp[amout] === Infinity ? -1 : dp[amout];
}

console.log(f3([1, 2, 5], 11));
