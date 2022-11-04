export class MyArray {
    constructor() {
        this._data = [];
        this._length = 0;
    }

    get(index) {
        const item = this._data[index];
        if (!item) throw "Item not found!"
        return item;
    }

    push(item) {
        if (this._data.indexOf(item) == -1) {
            this._data[this._length] = item;
            this._length += 1;
        }
    }

    pop() {
        if (this._length <= 0) throw "No items left to pop!"

        const item = this._data[this._length - 1];
        this._data[this._length - 1] = null;
        this._length -= 1;
        return item;
    }

    remove(index) {
        if (this._data[index] == null) throw "Item not found!"

        this._data[index] = null;
        this._length -= 1;
    }

    size() {
        return this._length;
    }
}