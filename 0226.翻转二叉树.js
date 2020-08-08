// 翻转一棵二叉树。
//
// 示例：
//
// 输入：
//
//      4
//    /   \
//   2     7
//  / \   / \
// 1   3 6   9
// 输出：
//
//      4
//    /   \
//   7     2
//  / \   / \
// 9   6 3   1
//

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
    if (!root) return root;
    let left = root.left;
    let right = root.right;
    root.left = invertTree(right);
    root.right = invertTree(left);
    return root;
};

var invertTree = function(root) {
    if (!root) return root;
    const stack = [root];
    let current = null;
    while ((current = stack.pop())) {
        let left = current.left;
        let right = current.right;
        current.left = right;
        current.right = left;
        if (left) stack.push(left);
        if (right) stack.push(right);
    }

    return root;
};
