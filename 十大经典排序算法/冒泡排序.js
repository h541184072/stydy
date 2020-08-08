function bubbleSort(arr) {
    for (let i = 0, len = arr.length; i < len - 1; i++) {
        // 减i 是一种优化
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }

    return arr
}

console.log(bubbleSort([5, 1234, 1, 2, 6, 2, 7, 990, 12, 3, 65, 23, 1]));
