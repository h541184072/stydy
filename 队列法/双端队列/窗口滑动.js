// 双端队列
const maxSlidingWindow = function(nums, k) {
    const len = nums.length;
    const res = [];
    const deque = [];
    for (let i = 0; i < len; i++) {
        while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop();
        }
        deque.push(i);
        while (deque.length && deque[0] <= i - k) {
            deque.shift();
        }
        if (i >= k - 1) {
            res.push(nums[deque[0]]);
        }
    }

    return res;
};

console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));
console.log(maxSlidingWindow([1, 3, -1, -3, 10, 3, 7, 6], 3));
