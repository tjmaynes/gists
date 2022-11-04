export class SinglyLinkedListNode {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }
}

export class MySinglyLinkedList {
    constructor(value) {
        this._head = new SinglyLinkedListNode(value, null);
        this._tail = this._head;
        this._length = 1;
    }

    append(item) {
        const node = new SinglyLinkedListNode(item, null);
        this._tail.next = node;
        this._tail = node;
        this._length += 1;
        return this;
    }

    prepend(item) {
        const node = new SinglyLinkedListNode(item, this._head);
        this._head = node;
        this._length += 1;
        return this;
    }

    insert(item, index) {
        let node = new SinglyLinkedListNode(item, null);
        let currentNode = this.get(index);
        
        if (index != 0) {
            let nextNode = currentNode.next;
            node.next = nextNode;
            currentNode.next = node;
        } else {
            let oldHead = this._head;
            node.next = oldHead;
            this._head = node;
        }

        if (index == this._length) this._tail = node;

        this._length += 1;

        return this;
    }

    remove(index) {
        if (index > 0) {
            let previousNode = this.get(index);

            let nextNode = previousNode.next.next;
            previousNode.next = nextNode;

            if (index == this._length - 1) this._tail = previousNode;
        } else {
            let oldHead = this._head;
            this._head = oldHead.next;

            if (index == this._length - 1) this._tail = this._head;
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
}
