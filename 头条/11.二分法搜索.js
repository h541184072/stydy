function find(arr, number) {
    arr = arr.sort((a, b) => a - b);
    let left = 0,
        mid,
        right = arr.length - 1;
    while (left <= right) {
        mid = (left + right) >> 1;
        if (arr[mid] === number) return mid;
        if (arr[mid] > number) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return -1;
}

console.log(find([1, 2, 3], 3));
