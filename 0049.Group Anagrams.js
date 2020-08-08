// 给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。
//
// 示例:
//
// 输入: ["eat", "tea", "tan", "ate", "nat", "bat"],
// 输出:
// [
//   ["ate","eat","tea"],
//   ["nat","tan"],
//   ["bat"]
// ]
// 说明：
//
// 所有输入均为小写字母。
// 不考虑答案输出的顺序。

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    let res = {};
    for (let i = 0, len = strs.length; i < len; i++) {
        const counts = Array(26).fill(0);
        for (let j = 0, len2 = strs[i].length; j < len2; j++) {
            counts[strs[i].charCodeAt(j) - 'a'.charCodeAt(0)]++;
        }
        let key = counts.join();
        if (res[key]) {
            res[key].push(strs[i]);
        } else {
            res[key] = [strs[i]];
        }
    }

    return Object.values(res);
};
