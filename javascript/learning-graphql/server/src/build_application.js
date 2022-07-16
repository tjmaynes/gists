const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');

const buildApplication = ({ dbWrapper, schema, resolvers }) => {
    return dbWrapper.connect().then(_ => {
        const app = express();
        app.use(cors());
        app.use('/graphql', graphqlHTTP({
            schema: schema,
            context: resolvers,
            graphiql: true
        }));
        return app;
    });
};

module.exports = buildApplication;
