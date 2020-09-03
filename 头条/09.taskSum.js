// taskSum(1000,()=>{console.log(1)}).task(1200,()=>{console.log(2)}).task(1300,()=>{console.log(3)})，

function taskSum(time, fn) {
    const list = [];

    function task(time, fn) {
        list.push(
            new Promise(resolve => {
                setTimeout(() => {
                    fn();
                    resolve();
                }, time);
            })
        );

        return this;
    }

    function run() {
        let promise = Promise.resolve();
        for (let fn of list) {
            promise = promise.then(fn);
        }
    }

    task(time, fn)
    setTimeout(run, 0);

    return {
        task,
    };
}

taskSum(1000, () => {
    console.log(1);
})
    .task(5000, () => {
        console.log(2);
    })
    .task(10000, () => {
        console.log(3);
    });
