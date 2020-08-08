function insertionSort(arr) {
    let cur, preIndex;
    for (let i = 1, len = arr.length; i < len; i++) {
        cur = arr[i];
        preIndex = i - 1;
        while (preIndex >= 0 && arr[preIndex] > cur) {
            arr[preIndex + 1] = arr[preIndex];
            preIndex--;
        }

        arr[preIndex + 1] = cur;
    }

    return arr;
}

console.log(insertionSort([5, 1234, 1, 2, 6, 2, 7, 990, 12, 3, 65, 23, 1]));
