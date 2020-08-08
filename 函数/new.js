function new2() {
    const fn = [].shift.call(arguments);
    const obj = Object.create(fn.prototype);
    const res = fn.apply(obj, arguments);
    return typeof res === 'object' ? res : obj;
}
