const a = ["1.45.0", "1.5", "6", "3.3.3.3.3.3.3"].sort((a, b) => {
    const arr1 = a.split(".");
    const arr2 = b.split(".");
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] === arr2[i]) continue;
        if (+arr1[i] > +arr2[i]) {
            return 1;
        } else {
            return -1;
        }
    }

    return -1;
});

console.log(a)
