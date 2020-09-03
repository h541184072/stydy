/*
*
* Given nums = [0,0,1,1,1,2,2,3,3,4],

Your function should return length = 5,
* with the first five elements of nums being modified to 0, 1, 2, 3, and 4 respectively.
*
* 返回个数,数组修改成[0,1,2,3,4]
* */

/*
*
* // nums is passed in by reference. (i.e., without making a copy)
int len = removeDuplicates(nums);

// any modification to nums in your function would be known by the caller.
// using the length returned by your function, it prints the first len elements.
for (int i = 0; i < len; i++) {
    print(nums[i]);
}
* */

// 双指针
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    if (!nums.length) return 0;
    let fastP = 1;
    let slowP = 0;
    for (let len = nums.length; fastP < len; fastP++) {
        if (nums[fastP] !== nums[slowP]) {
            slowP++;
            nums[slowP] = nums[fastP];
        }
    }

    return slowP + 1;
};
