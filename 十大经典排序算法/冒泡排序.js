function bubbleSort(arr) {
    for (let i = 0, len = arr.length; i < len - 1; i++) {
        // 提前退出冒泡循环的标识位
        let flag = false;
        // 减i 是一种优化
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                flag = true;
                // 表示发生了数据交换
            }
        }
        if (!flag) break;
    }

    return arr;
}

// 时间复杂度：最好时间复杂度 O(n)，平均时间复杂度 O(n*k)
// 空间复杂度：O(1)

console.log(bubbleSort([5, 1234, 1, 2, 6, 2, 7, 990, 12, 3, 65, 23, 1]));
