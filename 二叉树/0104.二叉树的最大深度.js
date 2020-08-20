/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

// 递归
var maxDepth = function(root) {
    if (!root) return 0;
    if (!root.left && !root.right) return 1;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};

//迭代 层次遍历(BFC)
var maxDepth = function(root) {
    if (!root) return 0;
    if (!root.left && !root.right) return 1;

    let deep = 1;
    let cur = root;
    const queue = [root, null];
    while ((cur = queue.shift()) !== undefined) {
        if (cur === null) {
            if (queue.length === 0) return deep;
            deep++;
            queue.push(null);
            continue;
        }

        const l = cur.left;
        const r = cur.right;
        if (l) queue.push(l);
        if (r) queue.push(r);
    }
};

// BFS
var maxDepth = function(root) {
    if (!root) return 0;
    let queue = [root],
        res = 0;
    while (queue.length) {
        let temp = [];
        res += 1;
        for (let i = 0; i < queue.length; i++) {
            if (queue[i].left) temp.push(queue[i].left);
            if (queue[i].right) temp.push(queue[i].right);
        }
        queue = temp;
    }
    return res;
};
