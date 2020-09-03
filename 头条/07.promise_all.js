Promise.prototype.all2 = function(arr) {
    return new Promise((resolve, reject) => {
        let i = 0;
        let len = arr.length;
        const res = [];
        arr.forEach((item, index) => {
            Promise.resolve(item).then(val => {
                res[index] = val;
                i++;
                if (i === len) {
                    resolve(res);
                }
            }, reject);
        });
    });
};

Promise.prototype.allSettled = function(arr) {
    return new Promise((resolve, reject) => {
        let i = 0;
        let len = arr.length;
        const res = [];
        arr.forEach((item, index) => {
            Promise.resolve(item).then(
                value => {
                    res[index] = {
                        value,
                        status: 'fulfilled',
                    };
                    i++;
                    if (i === len) {
                        resolve(res);
                    }
                },
                reason => {
                    res[index] = {
                        reason,
                        status: 'rejected',
                    };
                    i++;
                    if (i === len) {
                        resolve(res);
                    }
                }
            );
        });
    });
};

Promise.prototype.finally2 = function(fn) {
    return this.then(
        val => Promise.resolve(fn()).then(() => val),
        reason => Promise.resolve(fn()).then(() => throw reason)
    );
};
