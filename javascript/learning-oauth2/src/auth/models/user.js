export class User {
    constructor(id, username, password, scope) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.scope = scope;
    }

    static usingRawUser(rawUser) {
        return new User(rawUser.id, rawUser.username, rawUser.password, rawUser.scope);
    }

    validate() {
        if (this.id && this.username && this.password) {
            return Promise.resolve(this);
        } else {
            return Promise.reject(`Invalid User: ${JSON.stringify(this)}`);
        }
    }

    persistentForm() {
        return Promise.resolve({
            id: this.id,
            username: this.username,
            password: this.password,
            scope: this.scope
        });
    }
}
