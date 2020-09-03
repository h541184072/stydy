function fn(root) {
    const list = [];
    let queue = [];
    if (root) queue.push(root);
    while (queue.length) {
        const cur = [];
        const temp = [];
        while (queue.length) {
            const temp = queue.shift();
            cur.push(temp.val);
            if (temp.left) temp.push(temp.left);
            if (temp.right) temp.push(temp.right);
        }

        list.push(cur);
        queue = temp;
    }

    return list;
}
