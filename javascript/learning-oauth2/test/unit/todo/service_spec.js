import { TodoService } from '../../../src/todo';

describe("TodoService", () => {
    describe("#getAll", () => {
        context("when given an existing user_id", () => {
            it("should resolve with all todos by user_id", (done) => {
                const sandbox = sinon.createSandbox();

                const userId = "001";
                const todos = [{
                    id: "aaa",
                    user_id: userId,
                    title: "some-title",
                    content: "some-content"
                }];

                const repositoryStub = {
                    getAllTodos: sandbox.stub().returns(Promise.resolve(todos))
                };
                const todoService = new TodoService(repositoryStub);

                todoService.getAllTodos(userId)
                    .then(results => {
                        expect(results).to.deep.equal(todos);
                        expect(repositoryStub.getAllTodos.withArgs(userId).calledOnce).to.be.true;

                        done();
                    })
                    .catch(done);
            });
        });
    });

    describe("#addTodo", () => {
        context("when given a valid todo", () => {
            it("should resolve with a todo", (done) => {
                const sandbox = sinon.createSandbox();

                const userId = "001";
                const todo = {
                    id: "aaa",
                    userId: userId,
                    title: "some-title",
                    content: "some-content"
                };

                const repositoryStub = {
                    addTodo: sandbox.stub().returns(Promise.resolve(todo))
                };
                const todoService = new TodoService(repositoryStub);

                todoService.addTodo(todo)
                    .then(results => {
                        expect(results).to.deep.equal(todo);
                        expect(repositoryStub.addTodo.withArgs({
                            id: todo.id,
                            user_id: todo.userId,
                            title: todo.title,
                            content: todo.content
                        }).calledOnce).to.be.true;

                        done();
                    })
                    .catch(done);
            });
        });

        context("when given an invalid todo", () => {
            it("should reject with an error", (done) => {
                const sandbox = sinon.createSandbox();

                const invalidTodo = {
                    id: "aaa",
                    userId: null,
                    title: "some-title",
                    content: "some-content"
                };

                const repositoryStub = {
                    addTodo: sandbox.stub().returns(Promise.resolve(invalidTodo))
                };
                const todoService = new TodoService(repositoryStub);

                todoService.addTodo(invalidTodo)
                    .then(done)
                    .catch(error => {
                        expect(error).to.equal(`Invalid Todo: ${JSON.stringify(invalidTodo)}`);
                        expect(repositoryStub.addTodo.withArgs(invalidTodo).calledOnce).to.be.false;

                        done();
                    });
            });
        });
    });

    describe("#updateTodo", () => {
        context("when given a valid todo", () => {
            it("should resolve with a todo", (done) => {
                const sandbox = sinon.createSandbox();

                const userId = "001";
                const todo = {
                    id: "aaa",
                    userId: userId,
                    title: "some-title",
                    content: "some-content"
                };

                const repositoryStub = {
                    updateTodo: sandbox.stub().returns(Promise.resolve(todo))
                };
                const todoService = new TodoService(repositoryStub);

                todoService.updateTodo(todo)
                    .then(results => {
                        expect(results).to.deep.equal(todo);
                        expect(repositoryStub.updateTodo.withArgs({
                            id: todo.id,
                            user_id: todo.userId,
                            title: todo.title,
                            content: todo.content
                        }).calledOnce).to.be.true;

                        done();
                    })
                    .catch(done);
            });
        });

        context("when given an invalid todo", () => {
            it("should reject with an error", (done) => {
                const sandbox = sinon.createSandbox();

                const invalidTodo = {
                    id: "aaa",
                    userId: null,
                    title: "some-title",
                    content: "some-content"
                };

                const repositoryStub = {};
                const todoService = new TodoService(repositoryStub);

                todoService.updateTodo(invalidTodo)
                    .then(done)
                    .catch(error => {
                        expect(error).to.equal(`Invalid Todo: ${JSON.stringify(invalidTodo)}`);
                        done();
                    });
            });
        });
    });

    describe("#removeTodo", () => {
        context("when given a valid todo", () => {
            it("should resolve with an empty response", (done) => {
                const sandbox = sinon.createSandbox();

                const userId = "001";
                const todo = {
                    id: "aaa",
                    userId: userId,
                    title: "some-title",
                    content: "some-content"
                };

                const repositoryStub = {
                    removeTodo: sandbox.stub().returns(Promise.resolve())
                };
                const todoService = new TodoService(repositoryStub);

                todoService.removeTodo(todo)
                    .then(_ => {
                        expect(repositoryStub.removeTodo.withArgs({
                            id: todo.id,
                            user_id: todo.userId
                        }).calledOnce).to.be.true;

                        done();
                    })
                    .catch(done);
            });
        });

        context("when given an invalid todo", () => {
            it("should reject with an error", (done) => {
                const sandbox = sinon.createSandbox();

                const invalidTodo = {
                    id: "aaa",
                    userId: null,
                    title: "some-title",
                    content: "some-content"
                };

                const repositoryStub = {};
                const todoService = new TodoService(repositoryStub);

                todoService.removeTodo(invalidTodo)
                    .then(done)
                    .catch(error => {
                        expect(error).to.equal('Invalid Todo');
                        done();
                    });
            });
        });
    });
});
