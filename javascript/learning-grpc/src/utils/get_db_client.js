const MongoClient = require('mongodb').MongoClient;

module.exports = (url) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
            if (err) { reject(err); }
            else { resolve(client); }
        });
    });
};
