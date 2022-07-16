import {
    AccessToken,
    AuthorizationCode,
    RefreshToken,
    Client,
    User
} from './models';
import { StringExt } from '../utils';

export class AuthService {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }

    getAccessToken(bearerToken) {
        if (StringExt.validateString(bearerToken)) {
        return this.authRepository.getAccessToken(bearerToken)
            .then(AccessToken.usingRawAccessToken)
            .then(accessToken => accessToken.validate())
            .then(accessToken => {
                return {
                    accessToken: accessToken.accessToken,
                    accessTokenExpiresAt: accessToken.expires,
                    scope: accessToken.scope,
                    client: { id: accessToken.clientId },
                    user: { id: accessToken.userId }
                }
            });
        } else {
            return Promise.reject(`Given Bad Bearer Token: ${bearerToken}`);
        }
    }

    getClient(clientId, clientSecret) {
        return this.authRepository.getClient(clientId, clientSecret)
            .then(Client.usingRawClient)
            .then(client => client.validate());
    }

    getUser(username, password) {
        return this.authRepository.getUser(username, password)
            .then(User.usingRawUser)
            .then(user => user.validate());
    }

    getRefreshToken(refreshToken) {
        if (StringExt.validateString(refreshToken)) {
            return this.authRepository.getRefreshToken(refreshToken)
                .then(RefreshToken.usingRawRefreshToken)
                .then(refreshToken => refreshToken.validate())
                .then(refreshToken => {
                    return {
                        refreshToken: refreshToken.refreshToken,
                        refreshTokenExpiresAt: refreshToken.expires,
                        client: { id: refreshToken.clientId },
                        user: { id: refreshToken.userId },
                        scope: refreshToken.scope
                    };
                });
        } else {
            return Promise.reject(`Given Bad Refresh Token: ${refreshToken}`);
        }
    }

    getAuthorizationCode(authorizationCodeId) {
        if (StringExt.validateString(authorizationCodeId)) {
            return this.authRepository.getAuthorizationCodeById(authorizationCodeId)
                .then(AuthorizationCode.usingRawAuthorizationCode)
                .then(authorizationCode => authorizationCode.validate())
                .then(authorizationCode => Promise.all([
                    authorizationCode,
                    this.authRepository.getClientById(authorizationCode.client_id),
                    this.authRepository.getUserById(authorizationCode.user_id)
                ]))
                .then(results => {
                    return {
                        code: results[0].authorizationCode,
                        expires: results[0].expires,
                        redirectUri: results[0].redirectUri,
                        scope: results[0].scope,
                        client: results[1],
                        user: results[2]
                    }
                })
        } else {
            return Promise.reject(`Given Bad Authorization Code: ${authorizationCodeId}`);
        }
    }

    saveToken(token, client, user) {
        return Promise.all([
            this._validateAndStoreAccessToken(token, client, user),
            this._validateAndStoreRefreshToken(token, client, user)
        ]).then(results => {
            const accessToken = results[0];
            const refreshToken = results[1] ? results[1] : {
                refresh_token: null,
                expires: null
            };

            return {
                accessToken: accessToken.access_token,
                accessTokenExpiresAt: accessToken.expires,
                refreshToken: refreshToken.refresh_token,
                refreshTokenExpiresAt: refreshToken.expires,
                client: { id: accessToken.client_id },
                user: { id: accessToken.user_id }
            };
        });
    }

    saveAuthorizationCode(authorizationCode, client, user) {
        const rawAuthorizationCode = Object.assign({}, authorizationCode, {
            client_id: client.id,
            user_id: user.id
        });

        return Promise.resolve(rawAuthorizationCode)
            .then(AuthorizationCode.usingRawAuthorizationCode)
            .then(authorizationCode => authorizationCode.validate())
            .then(authorizationCode => authorizationCode.persistentForm())
            .then(this.authRepository.saveAuthorizationCode)
            .then(authorizationCode => {
                return {
                    authorizationCode: authorizationCode.authorization_code,
                    expires: authorizationCode.expires,
                    scope: authorizationCode.scope,
                    redirectUri: authorizationCode.redirect_uri,
                    client: { id: authorizationCode.client_id },
                    user: { id: authorizationCode.user_id }
                }
            })
    }

    revokeAuthorizationCode(authorizationCode) {
        return this.authRepository.deleteAuthorizationCodeById(authorizationCode.authorizationCode)
            .then(authorizationCode => !!authorizationCode);
    }

    revokeToken(token) {
        return this.authRepository.deleteRefreshTokenById(token.refreshToken)
            .then(refreshToken => !!refreshToken);
    }

    _validateAndStoreAccessToken(token, client, user) {
        return Promise.resolve({
            access_token: token.accessToken,
            expires: token.accessTokenExpiresAt,
            client_id: client.id,
            user_id: user.id,
            scope: client.scope
        })
            .then(AccessToken.usingRawAccessToken)
            .then(accessToken => accessToken.validate())
            .then(accessToken => accessToken.persistentForm())
            .then(this.authRepository.saveAccessToken);
    };

    _validateAndStoreRefreshToken(token, client, user) {
        if (token.refreshToken) {
            return Promise.resolve({
                refresh_token: token.refreshToken,
                expires: token.refreshTokenExpiresAt,
                client_id: client.id,
                user_id: user.id,
                scope: client.scope
            })
                .then(RefreshToken.usingRawRefreshToken)
                .then(refreshToken => refreshToken.validate())
                .then(refreshToken => refreshToken.persistentForm())
                .then(this.authRepository.saveRefreshToken);
        } else {
            return Promise.resolve(null);
        }
    }
}
