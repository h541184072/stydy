// 给定一个链表，判断链表中是否有环。
//
// 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。

// 输入：head = [3,2,0,-4], pos = 1
// 输出：true
// 解释：链表中有一个环，其尾部连接到第二个节点。

// 解法一：标志法
let hasCycle = function(head) {
    while (head) {
        if (head.flag) return true;
        head.flag = true;
        head = head.next();
    }
    return false;
};

// 时间复杂度：O(n)
// 空间复杂度：O(n)
let hasCycle = function(head) {
    try {
        JSON.stringify(head);
        return false;
    } catch (err) {
        return true;
    }
};

// 快慢指针
let hasCycle = function(head) {
    if (!head || !head.next) return false;
    let fast = head.next.next,
        slow = head.next;
    while (fast !== slow) {
        if (!fast || !fast.next) return false;
        fast = fast.next.next;
        slow = slow.next;
    }
    return true;
};
// 时间复杂度：O(n)
//
// 空间复杂度：O(1)
