function curry(fn, ...args) {
    return args.length >= fn.length ? fn(...args) : curry.bind(null, fn, ...args);
}


function demo(a,b,c) {
    console.log(a)
    console.log(b)
    console.log(c)
}

const test = curry(demo,1)
test(2)(3)
