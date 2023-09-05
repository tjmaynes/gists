package interviewing.datastructures.stack;

import java.util.ArrayList;

public class MyArrayStackImpl<T> implements MyStack<T> {
    private ArrayList<T> data;

    public MyArrayStackImpl() {
        this.data = new ArrayList();
    }

    public T peek() {
        if (this.data.isEmpty()) return null;
        return this.data.get(0);
    }

    public T push(T value) {
        this.data.add(0, value);
        return value;
    }

    public T pop() {
        if (this.data.isEmpty()) return null;
        return this.data.remove(0);
    }

    public T lookup(int index) {
        return this.data.get(index);
    }

    public boolean isEmpty() {
        return this.data.isEmpty();
    }

    public int size() { return data.size(); }
}
