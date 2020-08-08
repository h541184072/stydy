// 给出一个区间的集合，请合并所有重叠的区间。
//
// 示例 1:
//
// 输入: [[1,3],[2,6],[8,10],[15,18]]
// 输出: [[1,6],[8,10],[15,18]]
// 解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].


/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
// 自己的
var merge = function(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    let res = intervals.length ? [intervals.shift()] : [];
    let cur;
    let last = res[0];
    while ((cur = intervals.shift())) {
        if (cur[0] > last[1]) {
            res.push(cur);
        } else if (cur[0] <= last[1] && cur[1] >= last[1]) {
            res[res.length - 1] = [last[0], cur[1]];
        }
        last = res[res.length - 1];
    }
    return res;
};

