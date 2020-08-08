// 给定一个二维网格和一个单词，找出该单词是否存在于网格中。
//
// 单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。
//
// 示例:
//
// board =
// [
//   ['A','B','C','E'],
//   ['S','F','C','S'],
//   ['A','D','E','E']
// ]
//
// 给定 word = "ABCCED", 返回 true.
// 给定 word = "SEE", 返回 true.
// 给定 word = "ABCB", 返回 false.
//
// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/word-search
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

// 深度优先搜索与回溯详解
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    if (word.length === 0) return true;
    if (board.length === 0) return false;
    const rows = board.length;
    const cols = board[0].length;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const hit = DFS(board, i, j, rows, cols, word, 0);
            if (hit) return true;
        }
    }

    return false;
};

function DFS(board, row, col, rows, cols, word, cur) {
    if (row >= rows || row < 0) return false;
    if (col >= cols || col < 0) return false;

    const item = board[row][col];

    if (item !== word[cur]) return false;
    if (cur + 1 === word.length) return true;

    board[row][col] = null;

    const res =
        DFS(board, row + 1, col, rows, cols, word, cur + 1) ||
        DFS(board, row - 1, col, rows, cols, word, cur + 1) ||
        DFS(board, row, col + 1, rows, cols, word, cur + 1) ||
        DFS(board, row, col - 1, rows, cols, word, cur + 1);

    board[row][col] = item;
    return res;
}
