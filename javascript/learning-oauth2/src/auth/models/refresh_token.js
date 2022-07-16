export class RefreshToken {
    constructor(id, refresh_token, expires, clientId, userId, scope) {
        this.id = id;
        this.refreshToken = refresh_token;
        this.expires = expires;
        this.clientId = clientId;
        this.userId = userId;
        this.scope = scope
    }

    static usingRawRefreshToken(rawRefreshToken) {
        return new RefreshToken(
            rawRefreshToken.id,
            rawRefreshToken.refresh_token,
            rawRefreshToken.expires,
            rawRefreshToken.client_id,
            rawRefreshToken.user_id,
            rawRefreshToken.scope
        )
    }

    validate() {
        if (this.refreshToken && this.expires && this.clientId && this.userId) {
            return Promise.resolve(this);
        } else {
            return Promise.reject(`Invalid Refresh Token: ${JSON.stringify(this)}`);
        }
    }

    persistentForm() {
        return Promise.resolve({
            id: this.id,
            refresh_token: this.refreshToken,
            expires: this.expires,
            client_id: this.clientId,
            user_id: this.userId,
            scope: this.scope
        });
    }
}
