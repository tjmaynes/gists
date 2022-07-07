const request = require('supertest');

describe('API', () => {
    let api;

    beforeEach(async () => {
        api = await require('./api')();
    });

    describe('Products Endpoint', () => {
        describe('GET /ecommerce/api/v1/products', () => {
            describe('when products are available', () => {
                it('should respond with paginated products', (done) => {
                    request(api)
                        .get('/api/v1/products?page=0&pageSize=5')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .then(response => {
                            expect(response).toBe([]);
                            done();
                        })
                        .catch(done);
                });
            });
        });
    });
});
