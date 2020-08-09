// 快慢指针
const middleNode = function(head) {
    let fast = head,
        slow = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    return slow;
};

//时间复杂度：O(n)
//
// 空间复杂度：O(1)
