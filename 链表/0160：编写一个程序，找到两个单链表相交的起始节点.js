// 解法一：标记法(简单但空间复杂度为O(n)，不符合，仅做参考)


var getIntersectionNode = function(headA, headB) {
    while(headA) {
        headA.flag = true
        headA = headA.next
    }
    while(headB) {
        if (headB.flag) return headB
        headB = headB.next
    }
    return null
};

// 时间复杂度：O(n)
// 空间复杂度：O(n)

// 双指针法
// https://github.com/sisterAn/JavaScript-Algorithms/issues/17
var getIntersectionNode = function(headA, headB) {
    // 清除高度差
    let pA = headA, pB = headB
    while(pA || pB) {
        if(pA === pB) return pA
        pA = pA === null ? headB : pA.next
        pB = pB === null ? headA : pB.next
    }
    return null
};

// 时间复杂度：O(n)
//
// 空间复杂度：O(1)

