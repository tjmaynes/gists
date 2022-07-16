import configureDI from '../../src/configure_di';
import request from 'supertest';

describe("TodoServer", () => {
    beforeEach(function () {
        const config = {
            Server: {
                Port: 3000
            },
            TodoDatabase: {
                User: 'test',
                Host: 'localhost',
                Name: 'todo_db',
                Password: 'some-password',
                Port: '5432'
            },
            AuthDatabase: {
                User: 'test',
                Host: 'localhost',
                Name: 'auth_db',
                Password: 'some-password',
                Port: '5432'
            }
        };

        const diContainer = configureDI(config);
        this.app = diContainer.application;
    });

    describe("/oauth/token", () => {
        xit("should", () => { });
    });

    describe("/oauth/authenticate", () => {
        xit("should", () => { });
    });

    describe("/oauth/authorize", () => {
        xit("should return a token", (done) => {
            request(this.app)
                .post('/oauth/authorize?state=foobiz&client_id=122')
                .send({ client_id: '122', response_type: 'code' })
                .set('Authorization', 'Bearer foobar')
                .expect(302)
                .end(function (err, res) {
                    if (err) return done(err);
                    console.log(res);
                    done();
                });
        })
    });

    describe('/todo', () => {
        xit("should return all todos by a user_id", function (done) {
            request(this.app)
                .get('/todo')
                .set('Authorization', 'Bearer foobar')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.length).to.equal(3);
                    done();
                });
        });
    });

    describe("/healthcheck", () => {
        it("should return a 200 status", function (done) {
            request(this.app)
                .get('/healthcheck')
                .expect(200)
                .end(function (err, _) {
                    if (err) return done(err);
                    done();
                });
        })
    })
});
