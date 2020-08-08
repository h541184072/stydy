// 一个人总共吹了253根蜡烛，它几岁了【一岁吹一根，两岁吹两根，依次类推】

function aa(allNumber) {
    let year = 0;
    let num = 0;
    while (allNumber > num) {
        year++;
        num += year;
        if (allNumber < num) {
            return -1;
        }
    }

    return year;
}

console.log(aa(253))

function fibonacci(n) {
    if (n == 1 || n == 2) {
        return 1
    };
    return fibonacci(n - 2) + fibonacci(n - 1);
}
fibonacci(30)


function fibonacci2(n) {
    var n1 = 1, n2 = 1, sum =1;
    for (let i = 2; i < n; i++) {
        sum = n1 + n2
        n1 = n2
        n2 = sum
    }
    return sum
}

var fibonacci3 = function (n) {
    let n1 = 1; n2 = 1;
    for (let i = 2; i < n; i++) {
        [n1, n2] = [n2, n1 + n2]
    }
    return n2
}

fibonacci2(30)
