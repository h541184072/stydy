function fn(genFun) {
    return function() {
        const gen = genFun.apply(this, arguments);
        return new Promise((resolve, reject) => {
            function run(type, arg) {
                let res;
                try {
                    res = gen[type](arg);
                } catch (e) {
                    return reject(e);
                }

                const { value, done } = res;
                if (done) {
                    resolve(value);
                } else {
                    Promise.resolve(value).then(
                        val => run('next', val),
                        reason => run('throw', reason)
                    );
                }
            }

            run('next');
        });
    };
}
