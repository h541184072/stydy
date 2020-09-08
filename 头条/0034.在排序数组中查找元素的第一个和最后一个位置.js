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
        } else {
            high = mid - 1;
        }
    }
    if (low >= nums.length || nums[low] !== target) return -1;
    return low;
};

let rightSearch = function(nums, target) {
    let low = 0,
        high = nums.length - 1,
        mid;
    while (low <= high) {
        mid = Math.floor((low + high) / 2);
        if (nums[mid] > target) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    if (high < 0 || nums[high] !== target) return -1;
    return high;
};
