export class MyArrayStack {
    constructor() {
        this._data = [];
        this._length = 0;
    }

    peek() {
        if (this._length <= 0) throw "No items to peek!";
        return this._data[0];
    }

    push(item) {
        this._data.unshift(item);
        this._length += 1;
    }

    pop() {
        const item = this._data.shift();
        if (!item) throw "No items left to pop!";

        this._length -= 1;
        return item;
    }

    size() {
        return this._length;
    }
}