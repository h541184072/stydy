// 给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
//
// candidates 中的每个数字在每个组合中只能使用一次。
//
// 说明：
//
// 所有数字（包括目标数）都是正整数。
// 解集不能包含重复的组合。 

// 输入: candidates = [10,1,2,7,6,1,5], target = 8,
// 所求解集为:
// [
//   [1, 7],
//   [1, 2, 5],
//   [2, 6],
//   [1, 1, 6]
// ]

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
// 回溯法   自己的(哈希),跟下面比速度一样
function helper(list, arr, candidates, target, j, hashMap) {
    if (target < 0) return;
    else if (target === 0 && !hashMap[arr.join()]) {
        hashMap[arr.join()] = true;
        return list.push([...arr]);
    }
    for (let i = j; i < candidates.length; i++) {
        arr.push(candidates[i]);
        helper(list, arr, candidates, target - candidates[i], i + 1, hashMap);
        arr.pop();
    }
}

var combinationSum2 = function(candidates, target) {
    const list = [];
    helper(list, [], candidates.sort((a, b) => a - b), target, 0, {});
    return list;
};

function helper(list, arr, candidates, target, j) {
    if (target < 0) return;
    else if (target === 0) {
        return list.push([...arr]);
    }
    for (let i = j; i < candidates.length; i++) {
        // 跟0039比多了这一行
        if (i > j && candidates[i] === candidates[i - 1]) continue;
        arr.push(candidates[i]);
        helper(list, arr, candidates, target - candidates[i], i + 1);
        arr.pop();
    }
}

var combinationSum2 = function(candidates, target) {
    const list = [];
    helper(list, [], candidates.sort((a, b) => a - b), target, 0);
    return list;
};
