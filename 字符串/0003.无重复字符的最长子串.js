// 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
//
// 示例 1:
//
// 输入: "abcabcbb"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

/**
 * @param {string} s
 * @return {number}
 */
// 自己的
var lengthOfLongestSubstring = function(s) {
    const hashMap = {};
    let string = '';
    let max = 0;
    for (let i = 0, len = s.length; i < len; i++) {
        if (string.indexOf(s[i]) > -1) {
            string = s.slice(hashMap[s[i]] + 1, i + 1);
        } else {
            string += s[i];
            max = Math.max(max, string.length);
        }
        hashMap[s[i]] = i;
    }

    return max;
};

// 别人的 O(n2)
var lengthOfLongestSubstring = function(s) {
    var res = 0,
        i = 0;
    var temp = [];
    while (i < s.length) {
        if (temp.indexOf(s[i]) === -1) {
            temp.push(s[i]);
        } else {
            temp.shift();
            continue;
        }
        res = Math.max(res, temp.length);
        i++;
    }
    return res;
};

var maxSubString = function(s) {
    let map = new Map(),
        max = 0;
    for (let i = 0, j = 0; j < s.length; j++) {
        if (map.has(s[j])) {
            i = Math.max(map.get(s[j]) + 1, i);
        }
        max = Math.max(max, j - i + 1);
        map.set(s[j], j);
    }

    return max;
};
