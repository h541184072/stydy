function isObject(source) {
    return typeof source === 'object' && source !== null;
}

function deepClone(source, map = new WeakMap()) {
    if (!isObject(source)) return source;
    if (map.has(source)) return map.get(source);

    const newSource = Array.isArray(source) ? [] : {};
    map.set(source, newSource);
    for (let key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (isObject(source[key])) {
                newSource[key] = deepClone(source[key], map);
            } else {
                newSource[key] = source[key];
            }
        }
    }

    return newSource;
}
