// 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。
//
// 示例 1：
//
// 输入: "babad"
// 输出: "bab"
// 注意: "aba" 也是一个有效答案。

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    if (!s || !s.length) return '';
    const db = [];
    let res = s[0];
    // 倒着遍历简化操作， 这么做的原因是dp[i][..]依赖于dp[i + 1][..]
    for (let i = s.length - 1; i >= 0; i--) {
        db[i] = [];
        for (let j = i; j < s.length; j++) {
            if (i === j) {
                db[i][j] = true;
            } else if (j === i + 1 && s[i] === s[j]) {
                db[i][j] = true;
            } else if (s[i] === s[j] && db[i + 1][j - 1]) {
                db[i][j] = true;
            }
            if (db[i][j] && j - i + 1 > res.length) {
                res = s.slice(i, j + 1);
            }
        }
    }

    return res;
};
