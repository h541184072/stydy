function minDepth(root) {
    if (root === null) return 0;
    if (root.left === null && root.right === null) return 1;
    let max = Infinity;
    if (root.left) max = Math.min(max, minDepth(root.left));
    if (root.right) max = Math.min(max, minDepth(root.right));
    return max + 1;
}

// BFS
function minDepth2(root) {
    let stack = [],
        ans = 0;
    if (root) stack.push(root);
    while (stack.length) {
        let temp = [];
        ans++;
        for (let i = 0; i < stack.length; i++) {
            if (stack[i].left === null && stack[i].right === null) return ans;
            if (stack[i].left) temp.push(stack[i].left);
            if (stack[i].right) temp.push(stack[i].right);
        }
        stack = temp;
    }

    return ans;
}
