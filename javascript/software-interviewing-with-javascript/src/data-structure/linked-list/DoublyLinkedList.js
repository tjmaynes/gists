class DoublyLinkedListNode {
    constructor(value, previous, next) {
        this.value = value;
        this.previous = previous;
        this.next = next;
    }
}

export class MyDoublyLinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this._length = -1;
    }

    append(item) {
        if (this._length <= 0) { this._createFirstNode(item); return this }

        let node = new DoublyLinkedListNode(item, null, null);
        node.previous = this._tail;

        this._tail.next = node;
        this._tail = node;

        this._length += 1;

        return this;
    }

    prepend(item) {
        if (this._length <= 0) { this._createFirstNode(item); return this }

        let node = new DoublyLinkedListNode(item, null, null);
        node.next = this._head;

        this._head.previous = node;
        this._head = node;

        this._length += 1;

        return this;
    }

    insert(item, index) {
        if (index == 0) return this.prepend(item);
        else if (index == this._length) return this.append(item);
        else if (index > this._length) return this;
        else {
            let node = new DoublyLinkedListNode(item, null, null);
            let previousNode = this.get(index - 1);

            if (previousNode.next != null) node.next = previousNode.next;
            node.previous = previousNode;
            
            previousNode.next = node;
            previousNode.next.next = node.next;

            this._length += 1;

            return this;
        }
    }

    remove(index) {
        if (index < 0 || index > this._length || this._length == 0) return this;

        if (index == 0) {
            if (index == this._length - 1) {
                this._head = null;
                this._tail = null;
                this._length = 0;
            } else {
                let oldHead = this._head;
                let newHead = oldHead.next;
                newHead.previous = null;
                this._head = newHead;
            }
        } else if (index == this._length - 1) {
            let oldTail = this._tail;
            let newTail = oldTail.previous;
            newTail.next = null;
            this._tail = newTail;
        } else {
            let node = this.get(index + 1);
            let s = node.previous;

            if (s.next != null) s.next = node.next;
            node.previous = s;
        }

        this._length -= 1;

        return this;
    }

    get(index) {
        let previousNode = this._head;
        for (let i = 0; i < index - 1; i++)
            previousNode = previousNode.next;
        return previousNode;
    }

    size() {
        return this._length;
    }

    _createFirstNode(value) {
        this._head = new DoublyLinkedListNode(value, null, null);
        this._tail = this._head;
        this._length = 1;
    }
}
