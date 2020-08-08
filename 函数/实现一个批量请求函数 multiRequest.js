// 实现一个批量请求函数 multiRequest(urls, maxNum)
//
// 要求：
//
// 要求最大并发数 maxNum
// 每当有一个请求返回，就留下一个空位，可以增加新的请求
// 所有请求完成后，结果按照 urls 里面的顺序依次打出

function multiRequest(urls, maxNum) {
    const arrPro = [];
    const res = [];
    let index = 0;

    function ajax(url, resIndex) {
        return new Promise(resolve => {
            setTimeout(() => {
                res[resIndex] = `${url}+res`;
                resolve(url + '+res');
            }, 1000 * Math.ceil(Math.random() * 3));
        }).finally(() => {
            if (urls.length) {
                return ajax(urls.shift(), index++);
            }
        });
    }

    while (maxNum-- && urls.length) {
        arrPro.push(ajax(urls.shift(), index++));
    }

    return Promise.all(arrPro).then(() => {
        console.log(res);
    });
}

multiRequest(Array.from({ length: 10 }, (val, index) => index * 2), 4);
