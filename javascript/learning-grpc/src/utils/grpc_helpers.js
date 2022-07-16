const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const grpc_promise = require('grpc-promise');

module.exports = {
    buildClient: (host, protoLocation) => {
        const packageDefinition = protoLoader.loadSync(protoLocation, {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        });

        const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
        const todoProto = protoDescriptor.todo;
        const client = new todoProto.TodoService(host, grpc.credentials.createInsecure());
        grpc_promise.promisifyAll(client);

        return client;
    },
    closeClient: (client) => {
        grpc.closeClient(client);
    }
};
