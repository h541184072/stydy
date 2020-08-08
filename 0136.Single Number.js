// Example 1:
//
// Input: [2,2,1]
// Output: 1

// Example 2:
//
// Input: [4,1,2,1,2]
// Output: 4

/**
 * @param {number[]} nums
 * @return {number}
 */

// 异或的性质 两个数字异或的结果a^b是将 a 和 b 的二进制每一位进行运算，得出的数字。 运算的逻辑是 如果同一位的数字相同则为 0，不同则为 1
//
// 异或的规律
//
// 任何数和本身异或则为0
//
// 任何数和 0 异或是本身
//
// 很多人只是记得异或的性质和规律，但是缺乏对其本质的理解，导致很难想到这种解法（我本人也没想到）
//
// bit 运算
//这里涉及到离散数学的异或运算性质了
//
// 1.交换律：a ^ b ^ c  <=> a ^ c ^ b
//
// 2.任何数于0异或为任何数 0 ^ n => n
//
// 3.相同的数异或为0: n ^ n => 0
//
//  因此上面的例子2 ^ 3  ^ 2 ^ 4 ^ 4等价于  2 ^ 2  ^ 4 ^ 4 ^ 3  =>  0 ^ 0 ^3  => 3

var singleNumber = function(nums) {
    const len = nums.length;
    let res = 0;
    for (let i = 0; i < len; i++) {
        const item = nums[i];
        res = res ^ item;
    }

    return res;
};
