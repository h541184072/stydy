let searchRange = function(nums, target) {
    return [leftSearch(nums, target), rightSearch(nums, target)];
};
let leftSearch = function(nums, target) {
    let low = 0,
        high = nums.length - 1,
        mid;
    while (low <= high) {
        mid = Math.floor((low + high) / 2);
        if (nums[mid] < target) {
            low = mid + 1;
        } else if (nums[mid] > target) {
            high = mid - 1;
        } else if (nums[mid] === target) {
            // 这里不返回，继续收缩左侧边界
            high = mid - 1;
        }
    }
    // 最后检查 low 是否越界或命中
    if (low >= nums.length || nums[low] != target) return -1;
    return low;
};

let rightSearch = function(nums, target) {
    let low = 0,
        high = nums.length - 1,
        mid;
    while (low <= high) {
        mid = Math.floor((low + high) / 2);
        if (nums[mid] < target) {
            low = mid + 1;
        } else if (nums[mid] > target) {
            high = mid - 1;
        } else if (nums[mid] === target) {
            // 这里不返回，继续收缩右侧边界
            low = mid + 1;
        }
    }
    // 最后检查 high 是否越界或命中
    if (high < 0 || nums[high] != target) return -1;
    return high;
};
