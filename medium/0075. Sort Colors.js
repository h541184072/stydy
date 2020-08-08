/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 冒泡
var sortColors = function(nums) {
    for (let i = 0, len = nums.length; i < len - 1; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (nums[j] > nums[j + 1]) {
                [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
            }
        }
    }
};

// 选择
var sortColors = function(nums) {
    for (let i = 0, len = nums.length; i < len - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (nums[minIndex] > nums[j]) {
                minIndex = j;
            }
        }

        [nums[i], nums[minIndex]] = [nums[minIndex], nums[i]];
    }
};

// 插入
var sortColors = function(nums) {
    for (let i = 1, len = nums.length; i < len; i++) {
        let cur = nums[i];
        let pre = i - 1;
        while (pre >= 0 && nums[pre] > cur) {
            nums[pre + 1] = nums[pre];
            pre--;
        }

        nums[pre + 1] = cur;
    }
};
