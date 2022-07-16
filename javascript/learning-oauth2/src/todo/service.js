import { TodoModel } from './model';
import { StringExt } from "../utils";

export class TodoService {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }

    getAllTodos(userId) {
        return this.todoRepository.getAllTodos(userId);
    }

    addTodo({ id, userId, title, content }) {
        return Promise.resolve(new TodoModel(id, userId, title, content))
            .then(todo => todo.validate())
            .then(todo => todo.persistentForm())
            .then(this.todoRepository.addTodo)
    }

    updateTodo({ id, userId, title, content }) {
        return Promise.resolve(new TodoModel(id, userId, title, content))
            .then(todo => todo.validate())
            .then(todo => todo.persistentForm())
            .then(this.todoRepository.updateTodo)
    }

    removeTodo({ id, userId }) {
        if (StringExt.validateString(id) && StringExt.validateString(userId)) {
            return this.todoRepository.removeTodo({
                id: id,
                user_id: userId
            });
        } else {
            return Promise.reject('Invalid Todo');
        }
    }
}
