function selectionSort(arr) {
    let minIndex;
    for (let i = 0, len = arr.length; i < len - 1; i++) {
        minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }

    return arr;
}

console.log(selectionSort([5, 1234, 1, 2, 6, 2, 7, 990, 12, 3, 65, 23, 1]));
