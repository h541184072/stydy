// 快慢指针
// 解决方案一：添加 preHead 节点
var removeNthFromEnd = function(head, n) {
    let preHead = new ListNode(0)
    preHead.next = head
    let fast = preHead, slow = preHead
    // 快先走 n+1 步
    while(n--) {
        fast = fast.next
    }
    // fast、slow 一起前进
    while(fast && fast.next) {
        fast = fast.next
        slow = slow.next
    }
    slow.next = slow.next.next
    return preHead.next
};
