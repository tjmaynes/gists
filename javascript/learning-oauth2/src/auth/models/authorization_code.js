export class AuthorizationCode {
    constructor(id, authorizationCode, expires, scope, redirectUri, clientId, userId) {
        this.id = id;
        this.authorizationCode = authorizationCode;
        this.expires = expires;
        this.scope = scope;
        this.redirectUri = redirectUri;
        this.clientId = clientId;
        this.userId = userId;
    }

    static usingRawAuthorizationCode(rawAuthorizationCode) {
        return new AuthorizationCode(
            rawAuthorizationCode.id,
            rawAuthorizationCode.authorization_code,
            rawAuthorizationCode.expires,
            rawAuthorizationCode.scope,
            rawAuthorizationCode.redirect_uri,
            rawAuthorizationCode.client_id,
            rawAuthorizationCode.user_id
        );
    }

    validate() {
        if (this.authorizationCode && this.expires && this.redirectUri && this.clientId && this.userId) {
            return Promise.resolve(this);
        } else {
            return Promise.reject(`Invalid Authorization Code: ${JSON.stringify(this)}`);
        }
    }

    persistentForm() {
        return Promise.resolve({
            "id": this.id,
            "authorization_code": this.authorizationCode,
            "expires": this.expires,
            "scope": this.scope,
            "redirect_uri": this.redirectUri,
            "client_id": this.clientId,
            "user_id": this.userId
        });
    }
}
