package interviewing.datastructures.linkedlist;

public class DoublyListNode<T> {
    T value;
    DoublyListNode<T> next;
    DoublyListNode<T> prev;

    public DoublyListNode(T value, DoublyListNode<T> next, DoublyListNode<T> prev) {
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}
