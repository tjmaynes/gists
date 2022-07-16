const TodoRepository = require('./repository');

describe("TodoRepositorySpec", () => {
    describe("#getTodos", () => {
        it("should return all todos", (done) => {
            const todosStub = [
                { id: "001", title: "some_title", content: "some content here" }
            ];

            const todoDatabase = {
                find: sinon.stub().returns({
                    toArray: sinon.stub().returns(Promise.resolve(todosStub))
                })
            };

            const todoRepository = new TodoRepository(todoDatabase);
            todoRepository.getTodos()
                .then(todos => {
                    expect(todos.length).to.equal(1);
                    expect(todoDatabase.find.calledOnce).to.be.true;

                    done();
                })
                .catch(done);
        });

        it("should return an empty list", (done) => {
            const todosStub = [];

            const todoDatabase = {
                find: sinon.stub().returns({
                    toArray: sinon.stub().returns(Promise.resolve(todosStub))
                })
            };

            const todoRepository = new TodoRepository(todoDatabase);
            todoRepository.getTodos()
                .then(todos => {
                    expect(todos.length).to.equal(0);
                    expect(todoDatabase.find.calledOnce).to.be.true;

                    done();
                })
                .catch(done);
        });
    });

    describe("#addTodo", () => {
        it("should add a todo", (done) => {
            const todoStub = { _id: 1, title: "some_title", content: "some content here" };

            const todoDatabase = {
                insertOne: sinon.stub().returns(Promise.resolve({ ops: [todoStub] }))
            };

            const todoRepository = new TodoRepository(todoDatabase);
            todoRepository.addTodo(todoStub)
                .then(todo => {
                    expect(todo).to.deep.equal(todoStub);
                    expect(todoDatabase.insertOne.withArgs(todoStub).calledOnce).to.be.true;

                    done();
                })
                .catch(done);
        });
    });

    describe("#updateTodo", () => {
        it("should update a todo", (done) => {
            const todoStub = { _id: 1, title: "some_title", content: "some content here" };

            const todoDatabase = {
                updateOne: sinon.stub().returns(Promise.resolve())
            };

            const todoRepository = new TodoRepository(todoDatabase);
            todoRepository.updateTodo(todoStub)
                .then(todo => {
                    expect(todo).to.deep.equal(todoStub);
                    expect(todoDatabase.updateOne.withArgs(
                        { _id: todo._id},
                        { $set: todo }
                    ).calledOnce).to.be.true;
                    done();
                })
                .catch(done);
        });
    }); 

    describe("#removeTodo", () => {
        it("should remove a todo by id", (done) => {
            const todoId = "001";

            const todoDatabase = {
                deleteOne: sinon.stub().returns(Promise.resolve({}))
            };

            const todoRepository = new TodoRepository(todoDatabase);
            todoRepository.removeTodo(todoId)
                .then(_ => {
                    expect(todoDatabase.deleteOne.withArgs(todoId).calledOnce).to.be.true;
                    done();
                })
                .catch(done);
        });
    });
});
