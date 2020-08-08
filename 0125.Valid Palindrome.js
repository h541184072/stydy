// Input: "A man, a plan, a canal: Panama"
// Output: true
// 忽略符号 回文

/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    s = s.toLocaleLowerCase();
    let i = 0;
    let j = s.length - 1;
    while (i < j) {
        if (!s[i].match(/[a-z0-9]/i)) {
            i++;
            continue;
        }
        if (!s[j].match(/[a-z0-9]/i)) {
            j--;
            continue;
        }

        if (s[i] === s[j]) {
            i++;
            j--;
        } else {
            return false;
        }
    }

    return j <= i;
};
