package interviewing.datastructures.linkedlist;

public class SinglyListNode<T> {
    T value;
    SinglyListNode<T> next;

    public SinglyListNode(T value, SinglyListNode<T> next) {
        this.value = value;
        this.next = next;
    }
}
