Array.apply(null, { length: 4 });
Array.from({ length: 20 }, (val, index) => index);

// ?
const ary = [...Array(100).keys()]
