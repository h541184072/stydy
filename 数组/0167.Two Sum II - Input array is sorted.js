// Input: numbers = [2,7,11,15], target = 9
// Output: [1,2]
// Explanation: The sum of 2 and 7 is 9. Therefore index1 = 1, index2 = 2.

 /**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    const len = numbers.length;
    const obj = {};
    for (let i = 0; i < len; i++) {
        if (obj[numbers[i]] !== undefined) {
            return [obj[numbers[i]] + 1, i + 1];
        }
        obj[target - numbers[i]] = i;
    }
};
