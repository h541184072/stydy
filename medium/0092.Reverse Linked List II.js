/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
var reverseBetween = function(head, m, n) {
    if (m === n) return head;
    const dummyHead = {
        val: null,
        next: head,
    };
    let start = dummyHead;
    let oldPre = dummyHead;
    while (m-- && n--) {
        oldPre = start;
        start = start.next;
    }

    let newPre = null;
    let newCur = start;
    while (n-- > -1) {
        const next = newCur.next;
        newCur.next = newPre;
        newPre = newCur;
        newCur = next;
    }
    start.next = newCur;
    oldPre.next = newPre;

    return dummyHead.next;
};
