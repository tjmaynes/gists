class Application {
    constructor(server, dbClient) {
        this.server = server;
        this.dbClient = dbClient;
    }

    static withContainer({ server, dbClient }) {
        return new Application(server, dbClient);
    }

    start() {
        return new Promise((resolve, _) => {
            this.server.start();
            resolve(this);
        });
    }

    stop() {
        return new Promise((resolve, _) => {
            this.server.tryShutdown(() => {
                this.dbClient.close();
                resolve(this);
            });
        });
    }
}

module.exports = (container) => Application.withContainer(container);
