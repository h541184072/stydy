function fn(number) {
    return ('' + number).replace(/(\d{1,3})(?=(\d{3})+(?=$|\.))/g, '$1,');
}

console.log(fn(11111));
console.log(fn(11111.11));
console.log((1111.11).toLocaleString())
