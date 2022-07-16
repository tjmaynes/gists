export class DatabaseExt {
    constructor(db) {
        this.db = db;
    }

    async exec({ query, values }) {
        return await this._connectAndRelease((client) => client.query(query, values));
    }

    async _connectAndRelease(fn) {
        try {
            const client = await this.db.connect();
            const results = await fn(client);
            client.release(true);
            return results;
        } catch(err) {
            return Promise.reject(err.stack);
        }
    }
}
