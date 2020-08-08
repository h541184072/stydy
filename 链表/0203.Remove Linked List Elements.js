// Remove all elements from a linked list of integers that have value val.
//
// Example:
//
// Input:  1->2->6->3->4->5->6, val = 6
// Output: 1->2->3->4->5

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
    const dummy = {
        next: head,
    };

    let current = dummy;

    while (current && current.next) {
        let next = current.next;
        if (next.val === val) {
            current.next = next.next;
            next = current.next
        }
        if(!next || next.val !== val){
            current = next
        }
    }

    return dummy.next;
};
