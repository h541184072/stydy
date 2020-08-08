function Node(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}

// 前序遍历
//前序遍历核心代码
function preOrderTraverseNode(root) {
    if (root) {
        result.push(root.val);
        preOrderTraverseNode(root.left);
        preOrderTraverseNode(root.right);
    }
}

// 递归
function preOrderTraverse(root) {
    let result = [];

    const preOrderTraverseNode = node => {
        if (node) {
            result.push(node.val);
            preOrderTraverseNode(node.left);
            preOrderTraverseNode(node.right);
        }
    };

    preOrderTraverseNode(root);

    return result;
}

// 迭代 栈
const preOrderTraversalStack = root => {
    const list = [];
    const stack = [];
    if (root) stack.push(root);
    while (stack.length) {
        const curNode = stack.pop();
        list.push(curNode.val);
        // right 在上面 因为栈
        if (curNode.right !== null) {
            stack.push(curNode.right);
        }
        if (curNode.left !== null) {
            stack.push(curNode.left);
        }
    }

    return list;
};

// 中序遍历
// 迭代
var inorderTraversal = function(root) {
    const list = [];

    const inorderTraversalNode = node => {
        if (node) {
            inorderTraversalNode(node.left);
            list.push(node.val);
            inorderTraversalNode(node.right);
        }
    };

    inorderTraversalNode(root);

    return list;
};

// 迭代实现
var inorderTraversal = function(root) {
    const list = [];
    const stack = [];
    let node = root;
    while (node || stack.length) {
        while (node) {
            stack.push(node);
            node = node.left;
        }

        node = stack.pop();
        list.push(node.val);
        node = node.right;
    }

    return list;
};

// 后序遍历
var postorderTraversal = function(root) {
    const list = [];

    const postorderTraversalNode = node => {
        if (node) {
            postorderTraversalNode(node.left);
            postorderTraversalNode(node.right);
            list.push(node.val);
        }
    };

    postorderTraversalNode(root);

    return list;
};

// 解题思路： 后序遍历与前序遍历不同的是：
//
// 后序遍历是左右根
//
// 而前序遍历是根左右
//
// 如果我们把前序遍历的 list.push(node.val) 变更为 list.unshift(node.val) （遍历结果逆序），
// 那么遍历顺序就由 根左右 变更为 右左根
//
// 然后我们仅需将 右左根 变更为 左右根 即可完成后序遍
var postorderTraversal = function(root) {
    let list = [];
    let stack = [];
    if (root) stack.push(root);
    while (stack.length) {
        const curNode = stack.pop();
        list.unshift(curNode.val);
        if (curNode.left) {
            stack.push(curNode.left);
        }
        if (curNode.right) {
            stack.push(curNode.right);
        }
    }
    return list;
};
