export class AccessToken {
    constructor(id, accessToken, expires, clientId, userId, scope) {
        this.id = id;
        this.accessToken = accessToken,
        this.expires = expires,
        this.clientId = clientId,
        this.userId = userId
        this.scope = scope;
    }

    static usingRawAccessToken(rawAccessToken) {
        return new AccessToken(
            rawAccessToken.id,
            rawAccessToken.access_token,
            rawAccessToken.expires,
            rawAccessToken.client_id,
            rawAccessToken.user_id,
            rawAccessToken.scope
        )
    }

    validate() {
        if (this.accessToken && this.expires && this.clientId && this.userId) {
            return Promise.resolve(this);
        } else {
            return Promise.reject(`Invalid Access Token: ${JSON.stringify(this)}`);
        }
    }

    persistentForm() {
        return Promise.resolve({
            id: this.id,
            access_token: this.accessToken,
            expires: this.expires,
            client_id: this.clientId,
            user_id: this.userId,
            scope: this.scope
        })
    }
}
