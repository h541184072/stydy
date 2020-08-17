function deepTraversal(node) {
    const nodes = [];
    const stack = [];
    if (!node) return nodes;
    stack.push(node);
    while (stack.length) {
        const item = stack.pop();
        nodes.push(item);
        const children = item.children;
        for (let i = children.length - 1; i >= 0; i--) {
            stack.push(children[i]);
        }
    }
}
