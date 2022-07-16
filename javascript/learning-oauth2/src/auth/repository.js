export class AuthRepository {
    constructor(db) {
        this.db = db;
    }

    getAccessToken(bearerToken) {
        return this.db.exec({
            query: "SELECT * FROM access_token WHERE access_token = $1",
            values: [bearerToken]
        });
    }

    getClient(clientId, clientSecret) {
        return this.db.exec({
            query: "SELECT * FROM client WHERE id = $1 AND secret = $2",
            values: [clientId, clientSecret]
        });
    }

    getUser(username, password) {
        return this.db.exec({
            query: "SELECT * FROM user WHERE username = $1 AND password = $2",
            values: [username, password]
        });
    }

    getRefreshToken(refreshToken) {
        return this.db.exec({
            query: "SELECT * FROM refresh_token WHERE refresh_token = $1",
            values: [refreshToken]
        });
    }

    getAuthorizationCode(authorizationCode) {
        return this.db.exec({
            query: "SELECT * FROM authorization_code WHERE authorization_code = $1",
            values: [authorizationCode]
        });
    }

    getUserFromClient(client) {
        return this.db.exec({
            query: "SELECT user_id FROM client INNER JOIN user ON client.user_id = user.id WHERE client.id = $1 AND client.secret = $2",
            values: [client.id, client.secret]
        });
    }
}
