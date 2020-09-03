function fn(root) {
    const list = [];
    function run(node) {
        if (node) {
            run(node.left);
            list.push(node.value);
            run(node.right);
        }
    }

    run(root);
    return list;
}

function fn2(root) {
    const list = [];
    const stack = [];
    let node = root;
    while (node || stack.length) {
        while (node) {
            stack.push(node);
            node = node.left;
        }

        node = stack.pop();
        list.push(node.value);
        node = node.right;
    }

    return list;
}
