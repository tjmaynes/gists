package interviewing.datastructures.stack;

public class MyLinkedListStackImpl<T> implements MyStack<T> {
    StackNode<T> top;
    StackNode<T> bottom;
    int length;

    public MyLinkedListStackImpl() {
        this.top = null;
        this.bottom = null;
        this.length = 0;
    }

    public T peek() {
        if (this.top == null) return null;
        return this.top.value;
    }

    public T push(T value) {
        if (value == null) return null;

        if (top == null) {
            this.top = new StackNode<>(value, null);
            this.bottom = this.top;
            this.length += 1;

            return value;
        }

        StackNode<T> top = this.top;
        this.top = new StackNode<>(value, top);

        this.length += 1;

        return value;
    }

    public T pop() {
        if (this.top == null) return null;

        StackNode<T> oldTop = this.top;
        this.top = this.top.next;

        this.length -= 1;

        return oldTop.value;
    }

    public T lookup(int index) {
        int i = 0;
        StackNode<T> curr = this.top;

        while (i < index) {
            curr = curr.next;
            i += 1;
        }

        return curr.value;
    }

    public boolean isEmpty() {
        return this.length <= 0;
    }

    public int size() { return this.length; }
}
