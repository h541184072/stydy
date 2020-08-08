// 给定一个 n × n 的二维矩阵表示一个图像。
//
// 将图像顺时针旋转 90 度。
//
// 说明：
//
// 你必须在原地旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要使用另一个矩阵来旋转图像。
//
// 示例 1:
//
// 给定 matrix =
// [
//   [1,2,3],
//   [4,5,6],
//   [7,8,9]
// ],
//
// 原地旋转输入矩阵，使其变为:
// [
//   [7,4,1],
//   [8,5,2],
//   [9,6,3]
// ]
//

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
    // 时间复杂度O(n^2) 空间复杂度O(n)
    const copy = JSON.parse(JSON.stringify(matrix));
    for (let i = 0, len = matrix.length; i < len; i++) {
        for (let j = 0; j < len; j++) {
            matrix[j][len - i - 1] = copy[i][j];
        }
    }
};

var rotate = function(matrix) {
    const len = matrix.length;
    // 时间复杂度O(n^2) 空间复杂度O(1)

    // 做法： 先沿着对角线翻转，然后沿着水平线翻转
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - i; j++) {
            [matrix[i][j], matrix[len - j - 1][len - i - 1]] = [matrix[len - j - 1][len - i - 1], matrix[i][j]];
        }
    }

    for (let i = 0; i < len / 2; i++) {
        for (let j = 0; j < len; j++) {
            [matrix[i][j], matrix[len - i - 1][j]] = [matrix[len - i - 1][j], matrix[i][j]];
        }
    }
};
