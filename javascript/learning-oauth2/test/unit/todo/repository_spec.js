import { TodoRepository, TodoModel } from "../../../src/todo";

describe("TodoRepository", () => {
    describe("#getAllTodos", () => {
        it("should resolve with all todos", (done) => {
            const sandbox = sinon.createSandbox();

            const userId = "001";
            const todo1 = new TodoModel("001", userId, "some-title-1", "some-content-1");
            const todo2 = new TodoModel("002", userId, "some-title-2", "some-content-2");

            const todos = [
                todo1.persistentForm(),
                todo2.persistentForm()
            ];

            const dbStub = { exec: sandbox.stub().returns(Promise.all(todos)) };
            const todoRepository = new TodoRepository(dbStub);
            todoRepository.getTodos(userId)
                .then(results => {
                    expect(results).to.deep.equal([
                        {
                            "id": "001",
                            "user_id": userId,
                            "title": "some-title-1",
                            "content": "some-content-1"
                        },
                        {
                            "id": "002",
                            "user_id": userId,
                            "title": "some-title-2",
                            "content": "some-content-2"
                        }
                    ]);

                    expect(dbStub.exec.withArgs({
                        query: "SELECT * FROM todo WHERE user_id = $1",
                        values: [userId]
                    }).calledOnce).to.be.true;

                    done();
                })
                .catch(done);
        });
    });

    describe("#addTodo", () => {
        it("should resolve with a todo", (done) => {
            const sandbox = sinon.createSandbox();

            const userId = "001";
            const validTodo = {
                id: "001",
                user_id: userId,
                title: "some-title-1",
                content: "some-content-1"
            };
            const todo = new TodoModel(validTodo.id, validTodo.user_id, validTodo.title, validTodo.content);

            const dbStub = { exec: sandbox.stub().returns(todo.persistentForm()) };
            const todoRepository = new TodoRepository(dbStub);
            todoRepository.addTodo(validTodo)
                .then(result => {
                    expect(result).to.deep.equal(validTodo);

                    expect(dbStub.exec.withArgs({
                        query: "INSERT INTO todo(user_id, title, content) VALUES ($1, $2, $3) RETURNING *",
                        values: [validTodo.user_id, validTodo.title, validTodo.content]
                    }).calledOnce).to.be.true;

                    done();
                })
                .catch(done);
        });
    });

    describe("#updateTodo", () => {
        it("should resolve with a todo", (done) => {
            const sandbox = sinon.createSandbox();

            const userId = "001";
            const validTodo = {
                id: "001",
                user_id: userId,
                title: "some-title-1",
                content: "some-content-1"
            };
            const todo = new TodoModel(validTodo.id, validTodo.user_id, validTodo.title, validTodo.content);

            const dbStub = { exec: sandbox.stub().returns(todo.persistentForm()) };
            const todoRepository = new TodoRepository(dbStub);
            todoRepository.updateTodo(validTodo)
                .then(result => {
                    expect(result).to.deep.equal(validTodo);

                    expect(dbStub.exec.withArgs({
                        query: "UPDATE todo SET user_id = $2, title = $3, content = $4 WHERE id = $1 AND user_id = $2",
                        values: [validTodo.id, validTodo.user_id, validTodo.title, validTodo.content]
                    }).calledOnce).to.be.true;

                    done();
                })
                .catch(done);
        });
    });

    describe("#removeTodo", () => {
        it("should resolve with empty response", (done) => {
            const sandbox = sinon.createSandbox();
            const todo = {id: "001", user_id: "001", title: "some-title-1", content: "some-content-1"};
            const dbStub = { exec: sandbox.stub().returns(Promise.resolve()) };
            const todoRepository = new TodoRepository(dbStub);
            todoRepository.removeTodo(todo)
                .then(_ => {
                    expect(dbStub.exec.withArgs({
                        query: "DELETE FROM todo WHERE id = $1 AND user_id = $2",
                        values: [todo.id, todo.user_id]
                    }).calledOnce).to.be.true;

                    done();
                })
                .catch(done);
        });
    });
});
