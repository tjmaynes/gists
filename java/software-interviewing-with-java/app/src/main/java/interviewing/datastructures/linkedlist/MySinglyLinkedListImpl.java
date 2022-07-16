package interviewing.datastructures.linkedlist;

public class MySinglyLinkedListImpl<T> {
    SinglyListNode<T> head;
    SinglyListNode<T> tail;
    int length;

    public MySinglyLinkedListImpl(T value, SinglyListNode<T> next) {
        this.head = new SinglyListNode(value, next);
        this.tail = this.head;
        this.length = 1;
    }

    public MySinglyLinkedListImpl<T> append(T value) {
        SinglyListNode<T> newNode = new SinglyListNode(value, null);

        this.tail.next = newNode;
        this.tail = newNode;
        this.length += 1;

        return this;
    }

    public MySinglyLinkedListImpl<T> prepend(T value) {
        SinglyListNode<T> newNode = new SinglyListNode(value, this.head);
        this.head = newNode;

        this.length += 1;

        return this;
    }

    public SinglyListNode<T> traverseToIndex(int index) {
        SinglyListNode<T> previousNode = this.head;
        for (int i = 0; i < index - 1; i++)
            previousNode = previousNode.next;
        return previousNode;
    }

    public MySinglyLinkedListImpl<T> insert(T value, int index) {
        SinglyListNode newNode = new SinglyListNode(value, null);
        SinglyListNode previousNode = this.traverseToIndex(index);

        if (index != 0) {
            SinglyListNode afterNode = previousNode.next;
            newNode.next = afterNode;
            previousNode.next = newNode;
        } else {
            SinglyListNode afterNode = previousNode;
            newNode.next = afterNode;
            this.head = newNode;
        }

        if (index == length) this.tail = newNode;

        this.length += 1;

        return this;
    }

    public MySinglyLinkedListImpl<T> remove(int index) {
        if (length <= 0) return this;

        if (index != 0) {
            SinglyListNode previousNode = this.traverseToIndex(index);
            previousNode.next = previousNode.next.next;
            if (index >= length - 1) this.tail = previousNode;
        } else {
            this.head = this.head.next;
            if (index >= length - 1) this.tail = this.head;
        }

        this.length -= 1;

        return this;
    }
}
