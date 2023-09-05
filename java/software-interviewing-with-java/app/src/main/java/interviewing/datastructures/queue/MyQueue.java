package interviewing.datastructures.queue;

public interface MyQueue<T> {
    T peek();

    T enqueue(T value);

    T dequeue();
}
