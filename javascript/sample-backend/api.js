const express = require('express');
const { Pool } = require('pg');

const ProductsService = require('./products/ProductsService');

const productsRouter = (productsService) => {
    const router = express.Router();

    router.get('/', async (req, res) => {
        const pageNumber = req.query.page;
        const pageSize = req.query.pageSize;

        try {
            const products = await productsService.getAllProducts(pageNumber, pageSize);
            res.status(200).json(products);
        } catch (e) {
            console.error(e.message);
            res.status(500).end();
        }
    });

    return router;
};

const buildApi = async () => {
    const api = express();

    const pool = new Pool({
        user: process.env.POSTGRES_USER || 'root',
        host: process.env.POSTGRES_HOST || 'localhost',
        database: process.env.POSTGRES_DB || 'ecommerce-store',
        password: process.env.POSTGRES_PASS || 'postgres',
        port: process.env.POSTGRES_PORT || 5433
    });

    await pool.connect();

    const productsService = new ProductsService(pool);

    api.use('/api/v1/products', productsRouter(productsService));

    return api;
};

module.exports = buildApi;