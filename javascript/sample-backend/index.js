const buildApi = require('./api');

const port = process.env.PORT || 3000;

buildApi().then(api => {
    api.listen(port, () => {
        console.log(`Listening for requests on port ${port}.`);
    });
});
