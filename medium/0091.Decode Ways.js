// A message containing letters from A-Z is being encoded to numbers using the following mapping:
//
// 'A' -> 1
// 'B' -> 2
// ...
// 'Z' -> 26
// Given a non-empty string containing only digits, determine the total number of ways to decode it.
//
// Example 1:
//
// Input: "12"
// Output: 2
// Explanation: It could be decoded as "AB" (1 2) or "L" (12).
// Example 2:
//
// Input: "226"
// Output: 3
// Explanation: It could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).

/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
    const db = Array(s.length + 1).fill(0);
    db[0] = 1;
    db[1] = s[0] !== '0' ? 1 : 0;
    for (let i = 2; i < s.length + 1; i++) {
        const one = +s.slice(i - 1, i);
        const two = +s.slice(i - 2, i);

        if (two >= 10 && two <= 26) {
            db[i] = db[i - 2];
        }

        if (one >= 1 && one <= 9) {
            db[i] += db[i - 1];
        }
    }

    return db[db.length - 1];
};
