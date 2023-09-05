package interviewing.datastructures.stack;

public class StackNode<T> {
    public T value;
    public StackNode<T> next;

    public StackNode(T value, StackNode<T> next) {
        this.value = value;
        this.next = next;
    }
}
