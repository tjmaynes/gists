class ProductsService {
    constructor(dbConnection) {
        this._dbConnection = dbConnection;
    }

    async getAllProducts(pageNumber = 0, pageSize = 5) {
        const limit = pageSize;
        const offset = pageNumber * pageSize;

        try {
            const { rows } = await this._dbConnection.query(
                'SELECT id, name, price, manufacturer FROM product ORDER BY id LIMIT $1 OFFSET $2',
                [limit, offset]
            );

            return rows;
        } catch (e) {
            throw new Error(`Products DB: ${e.message}`);
        }
    }
}

module.exports = ProductsService;