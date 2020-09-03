function fn(root, sum) {
    if (root === null) return false;
    if (root.left === null && root.right === null) return root.val === sum;
    sum = sum - root.val;
    return fn(root.left, sum) || fn(root.right, sum);
}
