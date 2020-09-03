function Event() {
    const list = {};
    const on = function(name, fn) {
        if (!list[name]) {
            list[name] = [];
        }
        list[name].push(fn);
    };

    const emit = function(name) {
        list[name].forEach(fn => fn());
    };

    const remove = function(name, fn) {
        list[name] = list[name].filter(item => item !== fn);
    };

    const once = function(name, fn) {
        const _fn = function() {
            fn();
            remove(name, _fn);
        };
        on(name, _fn);
    };

    return {
        list,
        on,
        emit,
        remove,
        once,
    };
}

const event = new Event();

const dd  = ()=> console.log(2)

event.on('a',()=> console.log(1))
event.on('a',dd)
event.on('a',()=> console.log(3))
event.once('b',()=> console.log(4))
event.emit('a')
event.remove('a',dd)
event.emit('a')
console.log('--------')
event.emit('b')
event.emit('b')
