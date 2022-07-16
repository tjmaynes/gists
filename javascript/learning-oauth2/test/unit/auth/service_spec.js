import { AuthService } from '../../../src/auth';

describe("AuthService", () => {
    describe("#getAccessToken", () => {
        context("when given a valid bearer token and access token exists", () => {
            it("should resolve with a AccessToken object", (done) => {
                const sandbox = sinon.createSandbox();

                const user = getUser();
                const client = getClient();
                const accessToken = getAccessToken(client.id, user.id);

                const authRepositoryStub = {
                    getAccessToken: sandbox.stub().returns(Promise.resolve(accessToken))
                };

                const bearerToken = "some-bearer-token";

                const authService = new AuthService(authRepositoryStub);
                authService.getAccessToken(bearerToken)
                    .then(result => {
                        expect(result).to.deep.equal({
                            accessToken: accessToken.access_token,
                            accessTokenExpiresAt: accessToken.expires,
                            scope: accessToken.scope,
                            user: { id: accessToken.user_id },
                            client: { id: accessToken.client_id }
                        });
                        expect(authRepositoryStub.getAccessToken.withArgs(bearerToken).calledOnce).to.be.true;

                        done();
                    })
                    .catch(done);
            });
        });

        context("when given a valid bearer token and access token is invalid", () => {
            it("should reject with an Error message", (done) => {
                const sandbox = sinon.createSandbox();

                const invalidAccessToken = {};
                const authRepositoryStub = {
                    getAccessToken: sandbox.stub().returns(Promise.resolve(invalidAccessToken))
                };

                const bearerToken = "some-bearer-token";
                const authService = new AuthService(authRepositoryStub);
                authService.getAccessToken(bearerToken).then(done)
                    .catch(error => {
                        expect(error).to.equal(`Invalid Access Token: ${JSON.stringify(invalidAccessToken)}`);
                        expect(authRepositoryStub.getAccessToken.withArgs(bearerToken).calledOnce).to.be.true;

                        done();
                    });
            });
        });

        context("when given an invalid bearer token", () => {
            it("should reject with an Error message", (done) => {
                const sandbox = sinon.createSandbox();

                const authRepositoryStub = {
                    getAccessToken: sandbox.stub()
                };

                const bearerToken = undefined;
                const invalidBearerTokenMessage = `Given Bad Bearer Token: ${bearerToken}`;

                const authService = new AuthService(authRepositoryStub);
                authService.getAccessToken(bearerToken).then(done)
                    .catch(error => {
                        expect(error).to.equal(invalidBearerTokenMessage);
                        expect(authRepositoryStub.getAccessToken.notCalled).to.be.true;

                        done();
                    });
            });
        });
    });

    describe("#getAuthorizationCode", () => {
        context("when given an authorization code and a valid authorization code exists", () => {
            it("should resolve with an AuthorizationCode object", (done) => {
                const sandbox = sinon.createSandbox();

                const user = getUser();
                const client = getClient();
                const authorizationCode = getAuthorizationCode(client.id, user.id);
                const persistentAuthorizationCode = getRawAuthorizationCode(client.id, user.id);
                const authRepositoryStub = {
                    getAuthorizationCodeById: sandbox.stub().returns(Promise.resolve(persistentAuthorizationCode)),
                    getClientById: sandbox.stub().returns(Promise.resolve(client)),
                    getUserById: sandbox.stub().returns(Promise.resolve(user))
                };

                const authService = new AuthService(authRepositoryStub);
                authService.getAuthorizationCode(authorizationCode.authorizationCode)
                    .then(result => {
                        expect(result).to.deep.equal({
                            code: authorizationCode.authorizationCode,
                            expires: authorizationCode.expires,
                            redirectUri: authorizationCode.redirectUri,
                            scope: authorizationCode.scope,
                            user: user,
                            client: client
                        });

                        expect(authRepositoryStub.getAuthorizationCodeById.withArgs(authorizationCode.authorizationCode).calledOnce).to.be.true;

                        done();
                    })
                    .catch(done);
            });
        });

        context("when given an authorization code and a invalid authorization code exists", () => {
            it("should reject with an Error message", (done) => {
                const sandbox = sinon.createSandbox();

                const user = getUser();
                const client = getClient();
                const authorizationCode = getAuthorizationCode(client.id, user.id);
                const persistentAuthorizationCode = getRawAuthorizationCode(client.id, user.id);
                const invalidAuthorizationCode = Object.assign({}, persistentAuthorizationCode, {
                    authorization_code: null
                });
                const authRepositoryStub = {
                    getAuthorizationCodeById: sandbox.stub().returns(Promise.resolve(invalidAuthorizationCode))
                };

                const authService = new AuthService(authRepositoryStub);
                authService.getAuthorizationCode(authorizationCode.authorizationCode).then(done)
                    .catch(error => {
                        expect(error).to.equal(`Invalid Authorization Code: ${JSON.stringify({
                            id: invalidAuthorizationCode.id,
                            authorizationCode: invalidAuthorizationCode.authorization_code,
                            expires: invalidAuthorizationCode.expires,
                            scope: invalidAuthorizationCode.scope,
                            redirectUri: invalidAuthorizationCode.redirect_uri,
                            clientId: invalidAuthorizationCode.client_id,
                            userId: invalidAuthorizationCode.user_id 
                        })}`);

                        expect(authRepositoryStub.getAuthorizationCodeById.withArgs(authorizationCode.authorizationCode).calledOnce).to.be.true;

                        done();
                    })
                    .catch(done);
            });
        });

        context("when given an invalid authorization code", () => {
            it("should reject with an Error message", (done) => {
                const sandbox = sinon.createSandbox();

                const invalidAuthorizationCodeValue = null;
                const authRepositoryStub = { getAuthorizationCodeById: sandbox.stub() };


                const authService = new AuthService(authRepositoryStub);
                authService.getAuthorizationCode(invalidAuthorizationCodeValue).then(done)
                    .catch(error => {
                        expect(error).to.equal(`Given Bad Authorization Code: ${invalidAuthorizationCodeValue}`);
                        expect(authRepositoryStub.getAuthorizationCodeById.notCalled).to.be.true;

                        done();
                    })
                    .catch(done);
            });
        });
    });

    describe("#getClient", () => {
        context("when given a valid client_id and client_secret", () => {
            it("should resolve with Client object", (done) => {
                const sandbox = sinon.createSandbox();

                const grants = getGrants();
                const client = getClient(grants);
                const authRepositoryStub = {
                    getClient: sandbox.stub().returns(Promise.resolve(client))
                };

                const authService = new AuthService(authRepositoryStub);
                authService.getClient(client.id, client.secret)
                    .then(result => {
                        expect(result).to.deep.equal(client);
                        expect(authRepositoryStub.getClient.withArgs(client.id, client.secret).calledOnce).to.be.true;

                        done();
                    })
                    .catch(done);
            });
        });

        context("when not given the client secret", () => {
            it("should resolves with Client object", (done) => {
                const sandbox = sinon.createSandbox();

                const grants = getGrants();
                const client = getClient(grants);
                const invalidClient = Object.assign({}, client, {
                    id: null
                });
                const authRepositoryStub = {
                    getClient: sandbox.stub().returns(Promise.resolve(invalidClient))
                };

                const authService = new AuthService(authRepositoryStub);
                authService.getClient(client.id, client.secret).then(done)
                    .catch(error => {
                        expect(error).to.equal(`Invalid Client: ${JSON.stringify(invalidClient)}`);
                        expect(authRepositoryStub.getClient.withArgs(client.id, client.secret).calledOnce).to.be.true;

                        done();
                    });
            });
        });
    });

    describe("#getUser", () => {
        context("when given a valid existing username and password", () => {
            it("should resolve with a User object", (done) => {
                const sandbox = sinon.createSandbox();

                const user = getUser();
                const authRepositoryStub = {
                    getUser: sandbox.stub().returns(Promise.resolve(user))
                };

                const authService = new AuthService(authRepositoryStub);
                authService.getUser(user.username, user.password)
                    .then(result => {
                        expect(result).to.deep.equal({
                            username: user.username,
                            password: user.password,
                            id: user.id,
                            scope: user.scope
                        });

                        expect(authRepositoryStub.getUser.withArgs(user.username, user.password).calledOnce).to.be.true;

                        done();
                    })
                    .catch(done);
            });
        });

        context("when given a valid non-existing username and password", () => {
            it("should reject with an Error message", () => {

            });
        });

        context("when given a invalid existing username and password", () => {
            it("should reject with an Error message", () => {

            });
        });
    });

    describe("#getRefreshToken", () => {
        context("when given a refresh token and a valid refresh token exists", () => {
            it("should resolve with a RefreshToken object", (done) => {
                const sandbox = sinon.createSandbox();

                const user = getUser();
                const client = getClient();
                const refreshToken = getRefreshToken(client.id, user.id);
                const authRepositoryStub = {
                    getRefreshToken: sandbox.stub().returns(Promise.resolve(refreshToken))
                };

                const authService = new AuthService(authRepositoryStub);
                const refreshTokenValue = "some-refresh-token";
                authService.getRefreshToken(refreshTokenValue)
                    .then(result => {
                        expect(result).to.deep.equal({
                            refreshToken: refreshToken.refresh_token,
                            refreshTokenExpiresAt: refreshToken.expires,
                            client: { id: refreshToken.client_id },
                            user: { id: refreshToken.user_id },
                            scope: refreshToken.scope
                        });

                        expect(authRepositoryStub.getRefreshToken.withArgs(refreshTokenValue).calledOnce).to.be.true;

                        done();
                    })
                    .catch(done);
            });
        });

        context("when given a refresh token and an invalid refresh token exists", () => {
            it("should reject with an Error message", (done) => {
                const sandbox = sinon.createSandbox();

                const user = getUser();
                const client = getClient();
                const refreshToken = getRefreshToken(client.id, user.id);
                const invalidRefreshToken = Object.assign({}, refreshToken, {
                    refresh_token: null
                });
                const authRepositoryStub = {
                    getRefreshToken: sandbox.stub().returns(Promise.resolve(invalidRefreshToken))
                };

                const authService = new AuthService(authRepositoryStub);
                const refreshTokenValue = "some-refresh-token";
                authService.getRefreshToken(refreshTokenValue).then(done)
                    .catch(error => {
                        expect(error).to.equal(`Invalid Refresh Token: ${JSON.stringify({
                            id: invalidRefreshToken.id,
                            refreshToken: invalidRefreshToken.refresh_token,
                            expires: invalidRefreshToken.expires,
                            clientId: invalidRefreshToken.client_id,
                            userId: invalidRefreshToken.user_id
                        })}`);
                        
                        expect(authRepositoryStub.getRefreshToken.withArgs(refreshTokenValue).calledOnce).to.be.true;

                        done();
                    });
            });
        });

        context("when given an invalid refresh token", () => {
            it("should reject with an Error message", (done) => {
                const sandbox = sinon.createSandbox();

                const authRepositoryStub = {
                    getRefreshToken: sandbox.stub().returns(Promise.resolve(null))
                };

                const authService = new AuthService(authRepositoryStub);
                const invalidRefreshTokenValue = null;
                authService.getRefreshToken(invalidRefreshTokenValue).then(done)
                    .catch(error => {
                        expect(error).to.equal(`Given Bad Refresh Token: ${invalidRefreshTokenValue}`);
                        expect(authRepositoryStub.getRefreshToken.notCalled).to.be.true;

                        done();
                    });
            });
        });
    });

    describe("#revokeAuthorizationCode", () => {
        context("when given a valid AuthorizationCode object", () => {
            it("should resolve with a Boolean type", (done) => {
                const sandbox = sinon.createSandbox();

                const user = getUser();
                const client = getClient();
                const authorizationCode = getAuthorizationCode(client.id, user.id);
                const authRepositoryStub = {
                    deleteAuthorizationCodeById: sandbox.stub().returns(Promise.resolve(authorizationCode))
                };

                const authService = new AuthService(authRepositoryStub);
                authService.revokeAuthorizationCode(authorizationCode)
                    .then(result => {
                        expect(result).to.be.true;
                        expect(authRepositoryStub.deleteAuthorizationCodeById.withArgs(authorizationCode.authorizationCode).calledOnce).to.be.true;

                        done();
                    })
                    .catch(done); 
            });
        });
    });

    describe("#revokeToken", () => {
        context("when given a valid Token object", () => {
            it("should resolve with Boolean type", (done) => {
                const sandbox = sinon.createSandbox();

                const user = getUser();
                const client = getClient();
                const refreshToken = getRefreshToken(client.id, user.id, "some-scope");
                const accessToken = getAccessToken(client.id, user.id);
                const token = getToken(accessToken, refreshToken);
                const authRepositoryStub = {
                    deleteRefreshTokenById: sandbox.stub().returns(Promise.resolve(refreshToken))
                };

                const authService = new AuthService(authRepositoryStub);
                authService.revokeToken(token)
                    .then(result => {
                        expect(result).to.be.true;
                        expect(authRepositoryStub.deleteRefreshTokenById.withArgs(token.refreshToken).calledOnce).to.be.true;

                        done();
                    })
                    .catch(done);
            });
        });
    });

    describe("#saveAuthorizationCode", () => {
        context("when given a valid authorization code, client, and user", () => {
            it("should resolve with an AuthorizationCode object", (done) => {
                const sandbox = sinon.createSandbox();

                const user = getUser();
                const grants = getGrants();
                const client = getClient(grants);
                const rawAuthorizationCode = getRawAuthorizationCode(client.id, user.id);
                const authRepositoryStub = {
                    saveAuthorizationCode: sandbox.stub().returns(Promise.resolve(rawAuthorizationCode))
                };

                const authService = new AuthService(authRepositoryStub);
                authService.saveAuthorizationCode(rawAuthorizationCode, client, user)
                    .then(result => {
                        expect(result).to.deep.equal({
                            authorizationCode: rawAuthorizationCode.authorization_code,
                            expires: rawAuthorizationCode.expires,
                            redirectUri: rawAuthorizationCode.redirect_uri,
                            scope: rawAuthorizationCode.scope,
                            client: {id: rawAuthorizationCode.client_id },
                            user: {id: rawAuthorizationCode.user_id }
                        });

                        expect(authRepositoryStub.saveAuthorizationCode.withArgs(rawAuthorizationCode).calledOnce).to.be.true;

                        done();
                    })
                    .catch(done); 
            });
        });

        context("when given an invalid authorization code object, and a valid client and user object", () => {
            it("should resolve with Error message", (done) => {
                const sandbox = sinon.createSandbox();

                const user = getUser();
                const grants = getGrants();
                const client = getClient(grants);
                const rawAuthorizationCode = getRawAuthorizationCode(client.id, user.id);
                const invalidAuthorizationCode = Object.assign({}, rawAuthorizationCode, {
                    authorization_code: null
                });
                const authRepositoryStub = { saveAuthorizationCode: sandbox.stub() };

                const authService = new AuthService(authRepositoryStub);
                authService.saveAuthorizationCode(invalidAuthorizationCode, client, user).then(done)
                    .catch(error => {
                        expect(error).to.equal(`Invalid Authorization Code: ${JSON.stringify({
                            id: invalidAuthorizationCode.id,
                            authorizationCode: invalidAuthorizationCode.authorization_code,
                            expires: invalidAuthorizationCode.expires,
                            scope: invalidAuthorizationCode.scope,
                            redirectUri: invalidAuthorizationCode.redirect_uri,
                            clientId: invalidAuthorizationCode.client_id,
                            userId: invalidAuthorizationCode.user_id
                        })}`);

                        expect(authRepositoryStub.saveAuthorizationCode.notCalled).to.be.true;

                        done();
                    })
                    .catch(done); 
            });
        });
    });

    describe("#saveToken", () => {
        context("when given a valid token containing a refresh token, client, and user", () => {
            it("should resolve with an Token object", (done) => {
                const sandbox = sinon.createSandbox();

                const grants = getGrants();
                const user = getUser();
                const client = getClient(grants);
                const accessToken = getAccessToken(client.id, user.id);
                const refreshToken = getRefreshToken(client.id, user.id, client.scope);
                const rawAccessToken = {
                    id: undefined,
                    access_token: "some-access-token",
                    expires: "some-expires-at",
                    client_id: client.id,
                    user_id: user.id,
                    scope: "some-scope"
                };
                const rawRefreshToken = {
                    id: undefined,
                    refresh_token: "some-refresh-token",
                    expires: "some-expires-at",
                    client_id: client.id,
                    user_id: user.id,
                    scope: client.scope
                };
                const token = getToken(rawAccessToken, rawRefreshToken);

                const authRepositoryStub = {
                    saveAccessToken: sandbox.stub().returns(Promise.resolve(accessToken)),
                    saveRefreshToken: sandbox.stub().returns(Promise.resolve(refreshToken))
                };

                const authService = new AuthService(authRepositoryStub);
                authService.saveToken(token, client, user)
                    .then(result => {
                        expect(result).to.deep.equal({
                            accessToken: token.accessToken,
                            accessTokenExpiresAt: token.accessTokenExpiresAt,
                            refreshToken: token.refreshToken,
                            refreshTokenExpiresAt: token.refreshTokenExpiresAt,
                            client: { id: client.id },
                            user: { id: user.id }
                        });

                        expect(authRepositoryStub.saveAccessToken.withArgs(rawAccessToken).calledOnce).to.be.true;
                        expect(authRepositoryStub.saveRefreshToken.withArgs(rawRefreshToken).calledOnce).to.be.true;

                        done();
                    })
                    .catch(done);
            });
        });
        
        context("when given a valid token not containing a refresh token, client and user", () => {
            it("should resolve with an Token object", (done) => {
                const sandbox = sinon.createSandbox();

                const user = getUser();
                const grants = getGrants();
                const client = getClient(grants);
                const accessToken = getAccessToken(client.id, user.id);
                const rawAccessToken = {
                    id: undefined,
                    access_token: "some-access-token",
                    expires: "some-expires-at",
                    client_id: client.id,
                    user_id: user.id,
                    scope: "some-scope"
                };
                const token = getToken(rawAccessToken, { refresh_token: null, expires: null });

                const authRepositoryStub = {
                    saveAccessToken: sandbox.stub().returns(Promise.resolve(accessToken)),
                    saveRefreshToken: sandbox.stub()
                };

                const authService = new AuthService(authRepositoryStub);
                authService.saveToken(token, client, user)
                    .then(result => {
                        expect(result).to.deep.equal({
                            accessToken: token.accessToken,
                            accessTokenExpiresAt: token.accessTokenExpiresAt,
                            refreshToken: token.refreshToken,
                            refreshTokenExpiresAt: token.refreshTokenExpiresAt,
                            client: { id: client.id },
                            user: { id: user.id }    
                        });

                        expect(authRepositoryStub.saveAccessToken.withArgs(rawAccessToken).calledOnce).to.be.true;
                        expect(authRepositoryStub.saveRefreshToken.notCalled).to.be.true;

                        done();
                    })
                    .catch(done);
            });
        });

        context("when given an invalid token, but a valid client and user", () => {
            it("should reject with an Error message", (done) => {
                const sandbox = sinon.createSandbox();

                const user = getUser();
                const grants = getGrants();
                const client = getClient(grants);
                const accessToken = getAccessToken(client.id, user.id);
                const invalidAccessToken = Object.assign({}, accessToken, {
                    access_token: null
                });
                const refreshToken = getRefreshToken(client.id, user.id);
                const token = getToken(invalidAccessToken, refreshToken, client.id, user.id);

                const authRepositoryStub = {
                    saveAccessToken: sandbox.stub()
                };
 
                const authService = new AuthService(authRepositoryStub);
                authService.saveToken(token, client, user).then(done)
                    .catch(error => {
                        expect(error).to.equal(`Invalid Access Token: ${JSON.stringify({
                            "accessToken": invalidAccessToken.access_token,
                            "expires": invalidAccessToken.expires,
                            "clientId": invalidAccessToken.client_id,
                            "userId": invalidAccessToken.user_id,
                            "scope": invalidAccessToken.scope
                        })}`);

                        expect(authRepositoryStub.saveAccessToken.notCalled).to.be.true;

                        done();
                    });
            });
        });
    });

    describe("#validateScope", () => {

    });

    describe("#generateAccessToken", () => {

    });

    describe("#generateAuthorizationCode", () => {

    });

    describe("#generateRefreshToken", () => {

    });
});

const getAuthorizationCode = (clientId, userId) => {
    return {
        "authorizationCode": "some-authorization-id",
        "expires": "some-expires-at",
        "scope": "some-scope",
        "redirectUri": "some-redirect-uri",
        "clientId": clientId,
        "userId": userId
    }
};

const getRawAuthorizationCode = (clientId, userId) => {
    return {
        "id": "some-id",
        "authorization_code": "some-authorization-id",
        "expires": "some-expires-at",
        "redirect_uri": "some-redirect-uri",
        "scope": "some-scope",
        "client_id": clientId,
        "user_id": userId
    }
};

const getToken = (accessToken, refreshToken) => {
    return {
        accessToken: accessToken.access_token,
        accessTokenExpiresAt: accessToken.expires,
        refreshToken: refreshToken.refresh_token,
        refreshTokenExpiresAt: refreshToken.expires,
        scope: "some-scope"
    };
};

const getAccessToken = (client_id, user_id) => {
    return {
        access_token: "some-access-token",
        expires: "some-expires-at",
        client_id: client_id,
        user_id: user_id,
        scope: "some-scope"
    };
};

const getRefreshToken = (client_id, user_id, scope) => {
    return {
        id: "some-id",
        refresh_token: "some-refresh-token",
        expires: "some-expires-at",
        client_id: client_id,
        user_id: user_id,
        scope: scope
    };
};

const getClient = (grants, grantTypes=[], redirectURIs=[]) => {
    return {
        "id": "001",
        "name": "some-client",
        "redirect_uris": redirectURIs,
        "secret": "some-client-secret",
        "grants": grants,
        "grant_types": grantTypes,
        "scope": "some-scope"
    };
};

const getUser = () => {
    return {
        "id": "001",
        "username": "some-username",
        "password": "some-password",
        "scope": "some-scope"
    };
};

const getGrants = () => {
    return [
        'authorization_code',
        'password',
        'refresh_token',
        'client_credentials'
    ];
};
