package interviewing.datastructures.queue;

class QueueNode<T> {
    T value;
    QueueNode<T> next;

    public QueueNode(T value, QueueNode<T> next) {
        this.value = value;
        this.next = next;
    }
}

public class MyQueueImpl<T> implements MyQueue<T> {
    private QueueNode<T> top;
    private QueueNode<T> bottom;
    private int length;

    public MyQueueImpl() {
        this.top = null;
        this.bottom = null;
        this.length = -1;
    }

    public T peek() {
        if (this.length <= 0) return null;
        return this.bottom.value;
    }

    public T enqueue(T value) {
        if (this.length <= 0) {
            this.top = new QueueNode<>(value, null);
            this.bottom = this.top;
            this.length = 1;

            return value;
        }

        QueueNode<T> top = this.top;
        this.top = new QueueNode<>(value, top);

        this.length += 1;

        return value;
    }

    public T dequeue() {
        if (this.length <= 0) return null;
        if (this.length == 1) {
            QueueNode<T> removedNode = top;

            this.top = null;
            this.bottom = null;
            this.length = -1;

            return removedNode.value;
        }

        QueueNode<T> top = this.top;

        while (top.next != this.bottom) top = top.next;

        QueueNode<T> removedNode = top.next;
        top.next = null;

        this.bottom = top;

        this.length -= 1;

        return removedNode.value;
    }
}
