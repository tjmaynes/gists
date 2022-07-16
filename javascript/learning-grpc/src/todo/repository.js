class TodoRepository {
    constructor(database) {
        this.database = database;
    }

    getTodos() {
        return this.database.find().toArray();
    }

    addTodo(todo) {
        return this.database
            .insertOne(todo)
            .then(response => response.ops[0]);
    }

    updateTodo(todo) {
        return this.database
            .updateOne({ _id: todo._id }, { $set: todo }, {upsert:true, w: 1})
            .then(_ => todo);
    }

    removeTodo(todo) {
        return this.database.deleteOne(todo);
    }
}

module.exports = TodoRepository;
