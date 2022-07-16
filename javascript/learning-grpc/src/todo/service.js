class TodoService {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }

    list() {
        return this.todoRepository.getTodos().then(todos => {
            return { todos: todos };
        });
    }
    add(todo) { return this.todoRepository.addTodo(todo); }
    update(todo) { return this.todoRepository.updateTodo(todo); }
    remove(todoId) { return this.todoRepository.removeTodo(todoId).then(_ => {}); }
}

module.exports = TodoService;
