// 计数排序 有确定范围的整数
let getLeastNumbers = function(arr, k) {
    return help(arr, 10000, k);
};

function help(arr, maxVal, k) {
    let temp = new Array(maxVal + 1);
    let sortIndex = 0;
    let arrLen = arr.length;
    let tempLen = maxVal + 1;

    for (let i = 0; i < arrLen; i++) {
        if (!temp[arr[i]]) temp[arr[i]] = 0;
        temp[arr[i]]++;
    }

    let res = [];
    for (let i = 0; i < tempLen; i++) {
        while (temp[i]-- > 0 && sortIndex < k) {
            res[sortIndex++] = i;
        }
        if (sortIndex === k) break;
    }

    return res;
}
