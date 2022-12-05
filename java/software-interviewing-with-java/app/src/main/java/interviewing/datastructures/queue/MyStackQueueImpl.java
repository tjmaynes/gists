package interviewing.datastructures.queue;

import interviewing.datastructures.stack.MyLinkedListStackImpl;
import interviewing.datastructures.stack.MyStack;

public class MyStackQueueImpl<T> implements MyQueue<T> {
    private MyStack<T> oldStack;
    private MyStack<T> newStack;

    public MyStackQueueImpl() {
        this.oldStack = new MyLinkedListStackImpl<>();
        this.newStack = new MyLinkedListStackImpl<>();
    }

    public T peek() {
        shiftStacks();
        return this.oldStack.peek();
    }

    public T enqueue(T value) {
        return this.newStack.push(value);
    }

    public T dequeue() {
        shiftStacks();
        return this.oldStack.pop();
    }

    public boolean isEmpty() {
        return this.newStack.isEmpty() && this.oldStack.isEmpty();
    }

    private void shiftStacks() {
        if (this.oldStack.isEmpty())
            while (!this.newStack.isEmpty())
                this.oldStack.push(this.newStack.pop());
    }
}
