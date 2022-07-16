export class Client {
    constructor(id, name, redirectUris, secret, grants, grantTypes, scope) {
        this.id = id;
        this.name = name;
        this.redirect_uris = redirectUris;
        this.secret = secret;
        this.grants = grants;
        this.grant_types = grantTypes;
        this.scope = scope;
    }

    static usingRawClient(rawClient) {
        return new Client(rawClient.id, rawClient.name, rawClient.redirect_uris,
            rawClient.secret, rawClient.grants, rawClient.grant_types, rawClient.scope);
    }

    validate() {
        if (this.id && this.grants.length > 0 && this.secret) {
            return Promise.resolve(this);
        } else {
            return Promise.reject(`Invalid Client: ${JSON.stringify(this)}`);
        }
    }

    persistentForm() {
        return Promise.resolve({
            id: this.id,
            name: this.name,
            redirect_uris: this.redirect_uris,
            grants: this.grants,
            secret: this.secret,
            grant_types: this.grant_types,
            scope: this.scope
        });
    }
}
