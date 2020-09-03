const shortestDistance = function(root, p, q) {
    // 最近公共祖先
    let lowestCA = lowestCommonAncestor(root, p, q)
    // 分别求出公共祖先到两个节点的路经
    let pDis = [], qDis = []
    getPath(lowestCA, p, pDis)
    getPath(lowestCA, q, qDis)
    // 返回路径之和
    return (pDis.length + qDis.length)
}

// 最近公共祖先
const lowestCommonAncestor = function(root, p, q) {
    if(root === null || root === p || root === q) return root
    const left = lowestCommonAncestor(root.left, p, q)
    const right = lowestCommonAncestor(root.right, p, q)
    if(left === null) return right
    if(right === null) return left
    return root
}

const getPath = function(root, p, paths) {
    // 找到节点，返回 true
    if(root === p) return true
    // 当前节点加入路径中
    paths.push(root)
    let hasFound = false
    // 先找左子树
    if (root.left !== null)
        hasFound = getPath(root.left, p, paths)
    // 左子树没有找到，再找右子树
    if (!hasFound && root.right !== null)
        hasFound = getPath(root.right, p, paths)
    // 没有找到，说明不在这个节点下面，则弹出
    if (!hasFound)
        paths.pop()
    return hasFound
}
