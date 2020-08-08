/*
*
*
* Example 1:

Input: "()"
Output: true
Example 2:

Input: "()[]{}"
Output: true
Example 3:

Input: "(]"
Output: false
Example 4:

Input: "([)]"
Output: false
Example 5:

Input: "{[]}"
Output: true

*
* */

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    const beforeArr = ['{', '[', '('];
    const mapper = {
        '{': '}',
        '[': ']',
        '(': ')',
    };

    const arr = [];
    const len = s.length;
    if (len % 2 !== 0) return false;

    for (let i = 0; i < len; i++) {
        if (beforeArr.includes(s[i])) {
            arr.push(s[i]);
            continue;
        }
        if (arr.length === 0) return false;
        const last = arr.pop();
        if (mapper[last] !== s[i]) return false;
    }

    if (arr.length) return false;

    return true;
};
