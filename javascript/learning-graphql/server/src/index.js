const buildApplication = require('./build_application');
const getDiContainer = require('./di_container');

getDiContainer({
    dbURI: process.env.DB_URI
})
    .then(buildApplication)
    .then(app => {
        app.listen(4000, () => {
            console.log('Listening for requests on port 4000.');
        });
    });
