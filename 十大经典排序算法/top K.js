// https://github.com/sisterAn/JavaScript-Algorithms/issues/73

// 全局排序，取第 k 个数
let findKthLargest = function(nums, k) {
    nums.sort((a, b) => b - a).slice(0, k);
    return nums[k-1]
};

// 时间复杂度：O(nlogn)
// 空间复杂度：O(logn)
/*--------*/
// 局部排序，冒泡
let findKthLargest = function(nums, k) {
    // 进行k轮冒泡排序
    bubbleSort(nums, k)
    return nums[nums.length-k]
}

let bubbleSort = function(arr, k) {
    for (let i = 0; i < k; i++) {
        // 提前退出冒泡循环的标识位
        let flag = false;
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                flag = true;
                // 表示发生了数据交换
            }
        }
        // 没有数据交换
        if(!flag) break
    }
}

// 时间复杂度：最好时间复杂度 O(n)，平均时间复杂度 O(n*k)
// 空间复杂度：O(1)
