// 给定一个二叉树，它的每个结点都存放着一个整数值。
//
// 找出路径和等于给定数值的路径总数。
//
// 路径不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。
//
// 二叉树不超过1000个节点，且节点数值范围是 [-1000000,1000000] 的整数。

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
var help = function(root, sum) {
    if (root === null) return 0;
    let l = help(root.left, sum - root.val);
    let r = help(root.right, sum - root.val);
    return l + r + (root.val === sum ? 1 : 0);
};

/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number}
 */
var pathSum = function(root, sum) {
    if (root === null) return 0;
    let self = help(root, sum);
    let left = pathSum(root.left, sum);
    let right = pathSum(root.right, sum);
    return self + left + right;
};

//----------------------
//此方法参考 0560.Subarray Sum Equals K.js
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number}
 */
var help = function(root, acc, target, hashmap) {
    if (root === null) return 0;
    let count = 0;
    acc += root.val;
    if (acc === target) count++;
    if (hashmap[acc - target] !== void 0) {
        count += hashmap[acc - target];
    }
    if (hashmap[acc] === void 0) {
        hashmap[acc] = 1;
    } else {
        hashmap[acc]++;
    }

    const res = count + help(root.left, acc, target, hashmap) + help(root.right, acc, target, hashmap);

    // 此处难点
    hashmap[acc] = hashmap[acc] - 1;

    return res;
};

var pathSum = function(root, sum) {
    const hashmap = {};
    return help(root, 0, sum, hashmap);
};
