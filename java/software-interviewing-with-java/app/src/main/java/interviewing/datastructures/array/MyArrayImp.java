package interviewing.datastructures.array;

import interviewing.exceptions.ItemNotFoundException;

import java.util.ArrayList;
import java.util.List;

interface MyArray<T> {
    public List<T> getAll();

    public T get(int index) throws ItemNotFoundException;

    public int push(T item);

    public T pop() throws ItemNotFoundException;

    public void delete(int index) throws IndexOutOfBoundsException;

    public int size();
}

public class MyArrayImp<T> implements MyArray<T> {
    private List<T> data;
    private int length = 0;

    public MyArrayImp() {
        this.data = new ArrayList<T>(this.length);
    }

    @Override
    public List<T> getAll() {
        return this.data;
    }

    @Override
    public T get(int index) throws ItemNotFoundException {
        try {
            return this.data.get(index);
        } catch (Exception e) {
            throw new ItemNotFoundException("Index: " + index, e);
        }
    }

    @Override
    public int push(T item) {
        int existingItemIndex = this.getItemIndex(item);
        if (existingItemIndex != -1) {
            return existingItemIndex;
        }

        data.add(this.length, item);

        this.length += 1;

        return this.length - 1;
    }

    @Override
    public T pop() throws ItemNotFoundException {
        if (this.length <= 0) {
            throw new ItemNotFoundException("Length is 0", new Exception());
        } else {
            T item = this.get(this.length - 1);

            ArrayList<T> newData = new ArrayList<T>(this.length - 1);
            for (int i = 0; i < this.length - 1; i++) {
                newData.add(i, this.get(i));
            }

            this.data = newData;
            this.length -= 1;

            return item;
        }
    }

    @Override
    public void delete(int index) throws IndexOutOfBoundsException {
        if (index < 0 || index >= this.length) {
            throw new IndexOutOfBoundsException();
        }

        ArrayList<T> newData = new ArrayList<T>(this.length - 1);

        for (int i = 0; i < index; i++) {
            newData.add(i, this.get(i));
        }

        int currentIndex = newData.size();
        for (int i = index + 1; i <= this.length - 1; i++) {
            newData.add(currentIndex, this.get(i));
            currentIndex += 1;
        }

        this.data = newData;
        this.length = newData.size();
    }

    @Override
    public int size() {
        return this.length;
    }

    private int getItemIndex(T item) {
        for (int i = 0; i < this.length; i++) {
            if (item == this.data.get(i)) {
                return i;
            }
        }
        return -1;
    }
}
