// d(n) = d(n-2) +d(n-1)

function fn(n) {
    const db = [1, 1];
    for (let i = 2; i <= n; i++) {
        db[i] = db[i - 1] + db[i - 2];
    }

    return db[n];
}
// 时间复杂度：O(n)
// 空间复杂度：O(n)

function fn2(n) {
    let res = 1,
        n1 = 1,
        n2 = 1;
    for (let i = 2; i <= n; i++) {
        res = n1 + n2;
        n1 = n2;
        n2 = res;
    }
}

// 空间复杂度：O(1)
