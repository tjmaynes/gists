const mongoose = require('mongoose');

class DbWrapper {
    constructor(connectionUri, logger) {
        this.connectionUri = connectionUri;
        this.logger = logger;
    }

    createRepository(name, modelSchema) {
        const schema = new mongoose.Schema(modelSchema);
        return mongoose.model(name, schema);
    }

    connect() {
        mongoose.connection.on('connected', () => {
            this.logger.log("Connected to Database!");
        });

        return mongoose.connect(this.connectionUri, { useNewUrlParser: true });
    }
}

module.exports = DbWrapper;
