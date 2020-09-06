const shortestDistance = function(root, p, q) {
    let lowestCA = lowestCommonAncestor(root, p, q);
    // 分别求出公共祖先到两个节点的路经
    let pDis = [],
        qDis = [];
    getPath(lowestCA, p, pDis);
    getPath(lowestCA, q, qDis);
    // 返回路径之和
    return pDis.length + qDis.length;
};
// 最近公共祖先
const lowestCommonAncestor = function(root, p, q) {
    if (root === null || root === p || root === q) return root;
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    if (left === null) return right;
    if (right === null) return left;
    return root;
};
const getPath = function(root, p, paths) {
    if (root === p) return true;
    paths.push(root);
    let hasFound = false;
    if (root.left !== null) hasFound = getPath(root.left, p, paths);
    if (!hasFound && root.right !== null) hasFound = getPath(root.right, p, paths);
    if (!hasFound) paths.pop();
    return hasFound;
};
