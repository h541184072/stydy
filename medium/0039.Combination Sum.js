// 给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
//
// candidates 中的数字可以无限制重复被选取。
//
// 说明：
//
// 所有数字（包括 target）都是正整数。
// 解集不能包含重复的组合。 
// 示例 1:
//
// 输入: candidates = [2,3,6,7], target = 7,
// 所求解集为:
// [
//   [7],
//   [2,2,3]
// ]

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
// 回溯法
function helper(list, arr, candidates, target, j) {
    if (target < 0) return;
    else if (target === 0) {
        return list.push([...arr]);
    }
    for (let i = j; i < candidates.length; i++) {
        arr.push(candidates[i]);
        helper(list, arr, candidates, target - candidates[i], i);
        arr.pop();
    }
}

var combinationSum = function(candidates, target) {
    const list = [];
    helper(list, [], candidates.sort((a, b) => a - b), target, 0);
    return list;
};
