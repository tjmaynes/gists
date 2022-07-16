const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const TodoRepository = require('./todo/repository');
const TodoService = require('./todo/service');
const getDbClient = require('./utils/get_db_client');

module.exports = ({ TodoSource, Server }) => {
    return getDbClient(TodoSource.url).then(dbClient => {
        const dbConn = dbClient.db(TodoSource.dbName);
        const todoCollection = dbConn.collection(TodoSource.collectionName);
        const todoRepository = new TodoRepository(todoCollection);
        const todoService = new TodoService(todoRepository);

        const server = new grpc.Server();
        const serverCredentials = grpc.ServerCredentials.createInsecure();

        const packageDefinition = protoLoader.loadSync(Server.protoLocation, {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        });
    
        const serviceDescriptor = grpc.loadPackageDefinition(packageDefinition);
        const todoProto = serviceDescriptor.todo;
        const todoProtoService = todoProto.TodoService.service;

        const defaultSuccessCallback = (callback) => (response) => callback(null, response);
        const defaultErrorCallback = (callback) => (error) => callback(error.message, null);
    
        server.addService(todoProtoService, {
            List: (_, callback) => {
                todoService.list()
                    .then(defaultSuccessCallback(callback))
                    .catch(defaultErrorCallback(callback));
            },
            Create: (call, callback) => {
                todoService.add(call.request)
                    .then(defaultSuccessCallback(callback))
                    .catch(defaultErrorCallback(callback));
            },
            Update: (call, callback) => {
                todoService.update(call.request)
                    .then(defaultSuccessCallback(callback))
                    .catch(defaultErrorCallback(callback)); 
            },
            Delete: (call, callback) => {
                todoService.remove(call.request)
                    .then(defaultSuccessCallback(callback))
                    .catch(defaultErrorCallback(callback));
            }
        });
    
        server.bind(Server.host, serverCredentials);
    
        process.on('SIGINT', () => {
            dbClient.close();
            console.log("hello");
            server.forceShutdown();
        });

        return { server: server, dbClient: dbClient };
    });
};
