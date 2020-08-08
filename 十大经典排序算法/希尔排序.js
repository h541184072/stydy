// 动图:
// https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/sorting/shell-sort
// 希尔排序，也称递减增量排序算法，是插入排序的一种更高效的改进版本。但希尔排序是非稳定排序算法。
function shellSort(arr) {
    let cur,
        len = arr.length,
        gap = 1;
    while (gap < len / 3) {
        gap = gap * 3 + 1;
    }

    for (; gap > 0; gap = Math.floor(gap / 3)) {
        for (let i = gap; i < len; i++) {
            cur = arr[i];
            for (var j = i - gap; j >= 0 && arr[j] > cur; j -= gap) {
                arr[j + gap] = arr[j];
            }
            arr[j + gap] = cur;
        }
    }

    return arr;
}

console.log(shellSort([5, 1234, 1, 2, 6, 2, 7, 990, 12, 3, 65, 23, 1]));
