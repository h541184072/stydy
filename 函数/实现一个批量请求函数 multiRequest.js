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

multiRequest(
    Array.from({ length: 10 }, (val, index) => index * 2),
    4
);

// https://mp.weixin.qq.com/s/VyzH8-6zAsLFI3zbizPD_Q
class RequestLimit {
    constructor(limit) {
        this.limit = Number(limit) || 2; // {1}
        this.blockQueue = [];
        this.currentReqNumber = 0;
    }

    /**
     * 请求
     * @param {*} req
     */
    async request(req) {
        // {2}
        if (!req) {
            throw new Error('req is required.');
        }
        if (Object.prototype.toString.call(req) !== '[object Function]') {
            throw new Error('Req must be a function.');
        }
        if (this.currentReqNumber >= this.limit) {
            // {3}
            await new Promise(resolve => this.blockQueue.push(resolve)); // 阻塞队列增加一个 Pending 状态的 Promise
        }

        return this._handlerReq(req); // {4}
    }

    /**
     * 内部方法处理请求
     * @param {*} req
     */
    async _handlerReq(req) {
        this.currentReqNumber++; // {5}
        try {
            return await req();
        } catch (err) {
            return Promise.reject(err);
        } finally {
            this.currentReqNumber--;
            if (this.blockQueue.length) {
                // 每完成一个就从阻塞队列里剔除一个
                this.blockQueue[0](); // 将最先进入阻塞队列的 Promise 从 Pending 变为 Fulfilled
                this.blockQueue.shift();
            }
        }
    }
}

const requestLimit = new RequestLimit(2);
(async () => {
    for (let i = 0; i < 8; i++) {
        requestLimit.request(() => fetch('http://q.qlogo.cn/qqapp/100312990/DE1931D5330620DBD07FB4A5422917B6/100'));
    }
})();


// https://mp.weixin.qq.com/s/j9NLGdZOvrAuSxb6RnHthw
