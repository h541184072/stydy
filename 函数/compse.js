const compose = (...fn) => fn.reduce((a, b) => (...args) => b(a(...args)));

const arr  = [(a)=>console.log(1,a()),()=>console.log(2),()=>console.log(3)]

compose(...arr)(()=>console.log(4))
