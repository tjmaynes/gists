package interviewing.datastructures.stack;

public interface MyStack<T> {
    T peek();

    T push(T value);

    T pop();

    T lookup(int index);

    boolean isEmpty();

    int size();
}
