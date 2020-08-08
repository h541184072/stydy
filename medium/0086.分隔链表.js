// 给定一个链表和一个特定值 x，对链表进行分隔，使得所有小于 x 的节点都在大于或等于 x 的节点之前。
//
// 你应当保留两个分区中每个节点的初始相对位置。
//
// 示例:
//
// 输入: head = 1->4->3->2->5->2, x = 3
// 输出: 1->2->2->4->3->5

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function(head, x) {
    let dummy1 = new ListNode(0);
    let dummy2 = new ListNode(0);

    let cur = head;
    let last1 = dummy1;
    let last2 = dummy2;
    while (cur !== null) {
        if (cur.val < x) {
            last1.next = cur;
            last1 = cur;
        } else {
            last2.next = cur;
            last2 = cur
        }

        cur = cur.next;
    }
    last2.next = null
    last1.next = dummy2.next;

    return dummy1.next;
};
