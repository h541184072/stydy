// 给定一个包含非负整数的数组，你的任务是统计其中可以组成三角形三条边的三元组个数。
//
// 示例 1:
//
// 输入: [2,2,3,4]
// 输出: 3
// 解释:
// 有效的组合是:
// 2,3,4 (使用第一个 2)
// 2,3,4 (使用第二个 2)
// 2,2,3

var threeSum = function(nums) {
    if (nums.length < 3) return 0;
    // 先排序 双指针
    nums.sort((a, b) => a - b);
    let count = 0;
    for (let i = nums.length - 1; i > 1; i--) {
        let left = 0;
        let right = i - 1;
        while (left < right) {
            // 不能跟自己重复
            if (nums[i] < nums[left] + nums[right]) {
                count += right - left;
                right--;
            } else {
                left++;
            }
        }
    }
    return count;
};

console.log(threeSum([2, 2, 3, 4]));
