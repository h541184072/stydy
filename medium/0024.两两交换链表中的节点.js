// 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。
//
// 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
//
// 示例:
//
// 给定 1->2->3->4, 你应该返回 2->1->4->3.

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 自己的
var swapPairs = function(head) {
    let dummy = new ListNode(0);
    dummy.next = head;
    let cur = dummy;
    let pos1 = cur.next;
    let pos2 = pos1.next;
    while (pos1 && pos1.next) {
        let next = pos2.next;
        cur.next = pos2;
        pos2.next = pos1;
        pos1.next = next;

        cur = pos1;
        pos1 = next;
        pos2 = (pos1 && pos1.next) || null;
    }

    return dummy.next;
};
