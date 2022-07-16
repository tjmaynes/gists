import { AuthRepository } from '../../../src/auth';

describe("OAuthRepository", () => {
    describe("#getAccessToken", () => {
        it("should resolve with a access_token object", (done) => {
            const sandbox = sinon.createSandbox();

            const bearerToken = "some-access-token";
            const accessToken = {
                access_token: bearerToken,
                expires_at: "some-expires-at",
                client_id: "some-client-id",
                user_id: "some-user-id",
                scope: "some-scope"
            };

            const dbStub = {
                exec: sandbox.stub().returns(Promise.resolve(accessToken))
            };

            const authRepository = new AuthRepository(dbStub);
            authRepository.getAccessToken(bearerToken)
                .then(results => {
                    expect(results).to.deep.equal(accessToken);

                    expect(dbStub.exec.withArgs({
                        query: "SELECT * FROM access_token WHERE access_token = $1",
                        values: [bearerToken]
                    }).calledOnce).to.be.true;

                    done();
                })
                .catch(done);
        });
    });

    describe("#getClient", () => {
        it("should resolve with a client object", (done) => {
            const sandbox = sinon.createSandbox();

            const clientId = "some-id";
            const clientSecret = "some-secret";

            const client = {
                id: clientId,
                name: "some-name",
                redirect_uris: "",
                secret: clientSecret,
                grants: "some-grants",
                grant_types: "some-grant-types",
                scope: "some-scope"
            };

            const dbStub = {
                exec: sandbox.stub().returns(Promise.resolve(client))
            };

            const authRepository = new AuthRepository(dbStub);
            authRepository.getClient(clientId, clientSecret)
                .then(result => {
                    expect(result).to.equal(client);

                    expect(dbStub.exec.withArgs({
                        query: "SELECT * FROM client WHERE id = $1 AND secret = $2",
                        values: [clientId, clientSecret]
                    }).calledOnce).to.be.true;

                    done();
                })
                .catch(done);
        });
    });

    describe("#getUserFromClient", () => {
        it("should resolve with a user object", (done) => {
            const sandbox = sinon.createSandbox();

            const clientId = "some-id";
            const clientSecret = "some-secret";

            const client = {
                id: clientId,
                name: "some-name",
                redirect_uris: "",
                secret: clientSecret,
                grants: "some-grants",
                grant_types: "some-grant-types",
                scope: "some-scope"
            };

            const user = {
                id: "some-id",
                username: "some-username",
                password: "some-password"
            };

            const dbStub = {
                exec: sandbox.stub().returns(Promise.resolve(user))
            };

            const authRepository = new AuthRepository(dbStub);
            authRepository.getUserFromClient(client)
                .then(result => {
                    expect(result).to.equal(user);

                    expect(dbStub.exec.withArgs({
                        query: "SELECT user_id FROM client INNER JOIN user ON client.user_id = user.id WHERE client.id = $1 AND client.secret = $2",
                        values: [client.id, client.secret]
                    }).calledOnce).to.be.true;

                    done();
                })
                .catch(done);
        });
    }); 

    describe("#getUser", () => {
        it("should resolve with a user object", (done) => {
            const sandbox = sinon.createSandbox();

            const username = "some-id";
            const password = "some-secret";

            const user = {
                id: "some-id",
                username: username,
                password: password
            };

            const dbStub = {
                exec: sandbox.stub().returns(Promise.resolve(user))
            };

            const authRepository = new AuthRepository(dbStub);
            authRepository.getUser(username, password)
                .then(result => {
                    expect(result).to.equal(user);

                    expect(dbStub.exec.withArgs({
                        query: "SELECT * FROM user WHERE username = $1 AND password = $2",
                        values: [username, password]
                    }).calledOnce).to.be.true;

                    done();
                })
                .catch(done);
        });
    });

    describe("#getRefreshToken", () => {
        it("should resolve with a refresh_token object", (done) => {
            const sandbox = sinon.createSandbox();

            const refreshTokenValue = "some-refresh-token";
            const refreshToken = {
                refresh_token: refreshTokenValue,
                expires_at: "some-expires-at",
                client_id: "some-client-id",
                user_id: "some-user-id",
                scope: "some-scope"
            };

            const dbStub = {
                exec: sandbox.stub().returns(Promise.resolve(refreshToken))
            };

            const authRepository = new AuthRepository(dbStub);
            authRepository.getRefreshToken(refreshTokenValue)
                .then(result => {
                    expect(result).to.equal(refreshToken);

                    expect(dbStub.exec.withArgs({
                        query: "SELECT * FROM refresh_token WHERE refresh_token = $1",
                        values: [refreshTokenValue]
                    }).calledOnce).to.be.true;

                    done();
                })
                .catch(done);
        });
    });

    describe("#getAuthorizationCode", () => {
        it("should resolve with authorization_code object", (done) => {
            const sandbox = sinon.createSandbox();

            const authorizationCodeValue = "some-auth-code";
            const authorizationCode = {
                authorization_code: authorizationCodeValue,
                expires_at: "some-expires-at",
                client_id: "some-client-id",
                user_id: "some-user-id",
                scope: "some-scope" 
            }

            const dbStub = { exec: sandbox.stub().returns(Promise.resolve(authorizationCode)) };
            const authRepository = new AuthRepository(dbStub);
            authRepository.getAuthorizationCode(authorizationCodeValue)
            .then(result => {
                expect(result).to.deep.equal(authorizationCode);
                
                expect(dbStub.exec.withArgs({
                    query: "SELECT * FROM authorization_code WHERE authorization_code = $1",
                    value: [authorizationCodeValue]
                }));
                
                done();
            })
            .catch(done);
        });
    })
});
