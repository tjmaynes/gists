const TodoService = require('./service');

describe("TodoServiceSpec", () => {
    describe("#list", () => {
        it("should return all todos", (done) => {
            const todosStub = [
                { id: "001", title: "some_title", content: "some content here" }
            ];

            const todoRepository = {
                getTodos: sinon.stub().returns(Promise.resolve(todosStub))
            };

            const todoService = new TodoService(todoRepository);
            todoService.list()
                .then(todos => {
                    expect(todos).to.deep.equal({ todos: todosStub });
                    expect(todoRepository.getTodos.calledOnce).to.be.true;

                    done();
                })
                .catch(done);
        });

        it("should return an empty list", (done) => {
            const todosStub = [];

            const todoRepository = {
                getTodos: sinon.stub().returns(Promise.resolve(todosStub))
            };

            const todoService = new TodoService(todoRepository);
            todoService.list()
                .then(todos => {
                    expect(todos).to.deep.equal({ todos: todosStub });
                    expect(todoRepository.getTodos.calledOnce).to.be.true;

                    done();
                })
                .catch(done);
        });
    });

    describe("#add", () => {
        it("should add a todo", (done) => {
            const todoStub = { _id: 1, title: "some_title", content: "some content here" };

            const todoRepository = {
                addTodo: sinon.stub().returns(Promise.resolve(todoStub))
            };

            const todoService = new TodoService(todoRepository);
            todoService.add(todoStub)
                .then(todo => {
                    expect(todo).to.deep.equal(todoStub);
                    expect(todoRepository.addTodo.withArgs(todoStub).calledOnce).to.be.true;

                    done();
                })
                .catch(done);
        });
    });

    describe("#update", () => {
        it("should update a todo", (done) => {
            const todoStub = { _id: 1, title: "some_title", content: "some content here" };

            const todoRepository = {
                updateTodo: sinon.stub().returns(Promise.resolve(todoStub))
            };

            const todoService = new TodoService(todoRepository);
            todoService.update(todoStub)
                .then(todo => {
                    expect(todo).to.deep.equal(todoStub);
                    expect(todoRepository.updateTodo.withArgs(todoStub).calledOnce).to.be.true;
                    done();
                })
                .catch(done);
        });
    }); 

    describe("#remove", () => {
        it("should remove a todo by id", (done) => {
            const todoId = "001";

            const todoRepository = {
                removeTodo: sinon.stub().returns(Promise.resolve({}))
            };

            const todoService = new TodoService(todoRepository);
            todoService.remove(todoId)
                .then(_ => {
                    expect(todoRepository.removeTodo.withArgs(todoId).calledOnce).to.be.true;
                    done();
                })
                .catch(done);
        });
    });
});
