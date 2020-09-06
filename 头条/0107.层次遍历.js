function fn(root) {
    const list = [];
    let queue = [];
    if (root) queue.push(root);
    while (queue.length) {
        const cur = [];
        const temp = [];
        while (queue.length) {
            const node = queue.shift();
            cur.push(node.val);
            if (node.left) temp.push(node.left);
            if (node.right) temp.push(node.right);
        }

        list.push(cur);
        queue = temp;
    }

    return list;
}



