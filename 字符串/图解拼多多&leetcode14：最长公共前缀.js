// abc 、 abcd 、ab 、ac
//https://github.com/sisterAn/JavaScript-Algorithms/issues/19
// https://mp.weixin.qq.com/s/kxZE7R1oN7vYVr6tAPKMyw   视频3分钟

const strs = ['abc', 'abcd', 'ab', 'abc'];
// const strs = ["flower","flow","flight"];

// 分支策略 归并思想
function a(strs) {
    if (strs === null || !strs.length) return;
    return helper(strs);
}

function helper(strs) {
    const length = strs.length;
    if (length === 1) return strs[0];
    const mid = length >> 1;
    const leftArr = strs.slice(0, mid);
    const rightArr = strs.slice(mid, length);
    return aa(helper(leftArr), helper(rightArr));
}

function aa(strA, strB) {
    // let str = '';
    // for (let i = 0; i < strA.length; i++) {
    //     if (strA.charAt(i) === strB.charAt(i)) {
    //         str = strA.slice(0, i + 1);
    //     }
    // }
    let i = 0;
    for (; i < strA.length; i++) {
        if (strA.charAt(i) !== strB.charAt(i)) {
            break;
        }
    }

    return strA.slice(0, i);
}

console.log(a(strs));
