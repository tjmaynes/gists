const getDiContainer = require('./di_container');
const buildApplication = require('./build_application');

const config = {
    "Server": {
        "host": process.env.TODO_SERVER_HOST,
        "protoLocation": './proto/todo.proto'
    },
    "TodoSource": {
        "url": process.env.TODO_SOURCE_HOST,
        "dbName": "todo-grpc-service",
        "collectionName": "todo"
    }
};

module.exports = () => getDiContainer(config)
    .then(container => {
        const application = buildApplication(container);
        return application.start();
    });
