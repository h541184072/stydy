// Input:
// nums1 = [1,2,3,0,0,0], m = 3
// nums2 = [2,5,6],       n = 3
//
// Output: [1,2,2,3,5,6]

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */

// 改变第一个数组而不是新建一个数组
var merge = function(nums1, m, nums2, n) {
    let current = m + n - 1;
    while (current >= 0) {
        if (n === 0) return;

        if (m === 0) {
            nums1[current--] = nums2[--n];
            continue;
        }

        if (nums1[m - 1] > nums2[n - 1]) {
            nums1[current--] = nums1[--m];
        } else {
            nums1[current--] = nums2[--n];
        }
    }
};
