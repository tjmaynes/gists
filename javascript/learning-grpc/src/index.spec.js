const runApplication = require('./index');
const getDbClient = require('./utils/get_db_client');
const GrpcHelpers = require('./utils/grpc_helpers');

describe("TodoApplicationSpec", () => {
  let grpcClient;
  let todoApplication;

  beforeEach(function (done) {
    runApplication().then(function (application) {
      todoApplication = application;
      grpcClient = GrpcHelpers.buildClient(process.env.TODO_SERVER_HOST, './proto/todo.proto');
      done();
    }).catch(done);
  });

  afterEach(function (done) {
    todoApplication.stop().then(_ => {
      return getDbClient(process.env.TODO_SOURCE_HOST).then(function (dbClient) {
        const dbConn = dbClient.db("todo-grpc-service");
        const todoCollection = dbConn.collection("todo")
        todoCollection.drop(function (err, _) {
          if (err) done(err);
          dbClient.close();
          done();
        });
      }).catch(done);
    }).catch(done);
  });

  it("should be able to add some todos, get a list of todos, delete a todo, and update a todo", (done) => {
    const todoStubs = [
      { "_id": 1234, "title": "some_title_1", "content": "some content 1" },
      { "_id": 1235, "title": "some_title_2", "content": "some content 2" }
    ];

    grpcClient.Create().sendMessage(todoStubs[0])
      .then(todo => {
        expect(todoStubs[0]).to.deep.equal(todo);
        return grpcClient.Create().sendMessage(todoStubs[1]);
      })
      .then(todo => {
        expect(todoStubs[1]).to.deep.equal(todo);
        return grpcClient.List().sendMessage({});
      })
      .then(todos => {
        expect(todos).to.deep.equal({ todos: todoStubs });
        return grpcClient.Delete().sendMessage({ _id: todoStubs[0]["_id"] });
      })
      .then(_ => grpcClient.List().sendMessage({}))
      .then(todos => {
        expect(todos).to.deep.equal({ todos: [todoStubs[1]] })

        const updatedTodo = Object.assign({}, todoStubs[1], {
          title: "hello"
        });

        return grpcClient.Update().sendMessage(updatedTodo);
      })
      .then(updatedTodo => {
        expect(updatedTodo).to.deep.equal({
          "_id": 1235, "title": "hello", "content": "some content 2"
        });

        done();
      })
      .catch(done);
  });
});
