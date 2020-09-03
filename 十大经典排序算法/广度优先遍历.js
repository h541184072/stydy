function widthTraversal(node) {
    const nodes = [];
    const stack = [];
    if (node) stack.push(node);
    while (stack.length) {
        const item = stack.shift();
        nodes.push(item);
        const children = item.children;
        for (let i = 0; i < item.length - 1; i++) {
            stack.push(children[i]);
        }
    }
    return nodes;
}
