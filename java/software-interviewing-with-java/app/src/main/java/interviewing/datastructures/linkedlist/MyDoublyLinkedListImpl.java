package interviewing.datastructures.linkedlist;

import java.util.Optional;

public class MyDoublyLinkedListImpl<T> {
    DoublyListNode<T> head;
    DoublyListNode<T> tail;
    int length = 0;

    public MyDoublyLinkedListImpl() {
        this.head = null;
        this.tail = null;
        this.length = -1;
    }

    public MyDoublyLinkedListImpl<T> append(T value) {
        if (this.length < 0) { setInitialNode(value); return this; }

        DoublyListNode<T> newNode = new DoublyListNode<>(value, null, null);
        newNode.prev = this.tail;

        this.tail.next = newNode;
        this.tail = newNode;

        this.length += 1;

        return this;
    }

    public MyDoublyLinkedListImpl<T> prepend(T value) {
        if (this.length < 0) { setInitialNode(value); return this; }

        DoublyListNode<T> newNode = new DoublyListNode(value, null, null);
        newNode.next = this.head;

        this.head.prev = newNode;
        this.head = newNode;

        this.length += 1;

        return this;
    }

    public MyDoublyLinkedListImpl<T> insert(T value, int index) {
        if (this.length < 0) { setInitialNode(value); return this; }
        if (index > this.length) return this;
        if (index == 0) return prepend(value);
        if (index == this.length) return append(value);

        DoublyListNode<T> head = traverseToIndex(index - 1);
        DoublyListNode<T> newNode = new DoublyListNode(value, null, null);
        if (head.next != null) newNode.next = head.next;
        newNode.prev = head;

        head.next = newNode;
        head.next.next = newNode.next;

        this.length += 1;

        return this;
    }

    public MyDoublyLinkedListImpl<T> remove(int index) {
        if (index < 0 || index > this.length || this.length <= 0) return this;

        DoublyListNode<T> head = this.head;

        if (index == 0) {
            if (this.length > 1) {
                head = head.next;
                head.prev = null;
                this.head = head;
            } else {
                this.head = null;
                this.tail = null;
            }
        } else if (index == this.length) {
            while (head.next != null)
                head = head.next;
            head.prev.next = null;
            this.tail = head.prev;
        } else {
            DoublyListNode<T> tempHead = traverseToIndex(index - 1);
            if (tempHead.next.next != null) {
                DoublyListNode<T> newNextNode = tempHead.next.next;
                newNextNode.prev = tempHead;
                tempHead.next = newNextNode;
            } else {
                tempHead.next = null;
                this.tail = tempHead;
            }
        }

        this.length -= 1;

        return this;
    }

    public MyDoublyLinkedListImpl<T> reverse() {
        if (this.head.next == null) return this;

        DoublyListNode<T> newHead = this.head;
        this.tail = this.head;

        DoublyListNode<T> second = newHead.next;
        while(second != null) {
            DoublyListNode<T> nextNode = second.next;
            second.next = newHead;
            newHead = second;
            second = nextNode;
        }

        this.head.next = null;
        this.head = newHead;

        return this;
    }

    public Optional<T> lookup(int index) {
        if (index < 0 || index >= this.length) return Optional.empty();
        return Optional.of(traverseToIndex(index).value);
    }

    private DoublyListNode<T> traverseToIndex(int index) {
        DoublyListNode<T> head = this.head;
        while (index > 0) { head = head.next; index -= 1; }
        return head;
    }

    private void setInitialNode(T value) {
        this.head = new DoublyListNode(value, null, null);
        this.tail = this.head;
        this.length = 1;
    }
}
