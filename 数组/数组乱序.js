// https://juejin.im/post/5d004ad95188257c6b518056?utm_source=gold_browser_extension

function shuffle(arr) {
    let m = arr.length;
    while (m > 1) {
        const n = (Math.random() * m--) | 0;
        [arr[n], arr[m]] = [arr[m], arr[n]];
    }

    return arr
}

console.log(shuffle([1,2,3,4,5,6]))
