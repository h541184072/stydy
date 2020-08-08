// 动图
// https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/sorting/quick-sort

function quickSort(arr) {
    quick(arr, 0, arr.length - 1);
    return arr;
}

function quick(array, left, right) {
    let index;
    if (array.length > 1) {
        index = partition(array, left, right);

        if (left < index - 1) {
            quick(array, left, index - 1);
        }

        if (index < right) {
            quick(array, index, right);
        }
    }
}

function partition(array, left, right) {
    const pivot = array[(left + right) >>> 1];
    while (left <= right) {
        while (array[left] < pivot) {
            left++;
        }

        while (array[right] > pivot) {
            right--;
        }

        if (left <= right) {
            [array[left], array[right]] = [array[right], array[left]];
            left++;
            right--;
        }
    }

    return left;
}

console.log(quickSort([5, 1234, 1, 2, 6, 2, 7, 990, 12, 3, 65, 23, 1]));
