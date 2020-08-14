function getIntersection(...arrs) {
    return [
        ...new Set(
            arrs.reduce((total, arr) => {
                return arr.filter(item => total.includes(item));
            })
        ),
    ];
}

// 有点错误  需要考虑去重，有可能一个数据在每个数组中多次出现
const intersection = (list, ...args) => list.filter(item => args.every(arr => arr.includes(item)));


const intersection = function(list, ...args) {
    return [
        ...new Set(list.filter(item => args.every(temp => temp.includes(item))))
    ]
}
