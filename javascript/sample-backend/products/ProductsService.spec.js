const ProductsService = require('./ProductsService');

describe('ProductService', () => {
    let sut;
    let dbConnectionMock;

    beforeEach(() => {
        dbConnectionMock = { query: jest.fn() };
        sut = new ProductsService(dbConnectionMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('#getAllProducts', () => {
        describe('when products are available', () => {
            let products;

            beforeEach(() => {
                products = getProducts();
                dbConnectionMock.query.mockResolvedValueOnce({ rows: products });
            });

            it('should have sane default args', async () => {
                const _ = await sut.getAllProducts();
    
                expect(dbConnectionMock.query).toBeCalledTimes(1);
                expect(dbConnectionMock.query).toBeCalledWith('SELECT id, name, price, manufacturer FROM product ORDER BY id LIMIT $1 OFFSET $2', [5, 0]);
            });

            it('should return available products', async () => {
                const results = await sut.getAllProducts(2, 5);

                expect(results).toBe(products);

                expect(dbConnectionMock.query).toBeCalledTimes(1);
                expect(dbConnectionMock.query).toBeCalledWith('SELECT id, name, price, manufacturer FROM product ORDER BY id LIMIT $1 OFFSET $2', [5, 10]);
            });
        });

        describe('when unable to fetch products', () => {
            it('should throw an exception', async () => {
                dbConnectionMock.query.mockRejectedValue(new Error('Unable to connect to db'));

                await expect(sut.getAllProducts(0, 10)).rejects
                    .toThrowError('Products DB: Unable to connect to db');
            });
        });
    });

    describe('#addProduct', () => {
        describe('when given a valid product', () => {
            it('should return new product object', async () => {

            })
        });

        describe('when given an invalid product', () => {
            it('should throw an exception', () => {

            });
        });

        describe('when unable to add new product', () => {
            it('should throw an exception', () => {

            });
        });
    });

    const getProducts = () => [
        {
            id: 1,
            name: 'AirPods',
            price: 149.99,
            manufacturer: 'Apple'
        },
        {
            id: 2,
            name: 'AirPods Pro',
            price: 199.99,
            manufacturer: 'Apple'
        }
    ];
})