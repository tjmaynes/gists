export class TodoModel {
    constructor(id, userId, title, content) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.content = content;
    }

    static usingRawTodo(rawTodo) {
        return new TodoModel(rawTodo.id, rawTodo.userId, rawTodo.title, rawTodo.content);
    }

    validate() {
        if (this.id && this.userId && this.title) {
            return Promise.resolve(this);
        } else {
            return Promise.reject(`Invalid Todo: ${JSON.stringify(this)}`);
        }
    }

    persistentForm() {
        return Promise.resolve({
            "id": this.id,
            "user_id": this.userId,
            "title": this.title,
            "content": this.content
        });
    }
}
