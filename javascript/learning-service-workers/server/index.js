const express = require('express');
const Datastore = require('nedb');
const fs = require('fs');
const cors = require('cors');

const setupMiddleware = (appServer, database) => {
  appServer.get('/playlists', (req, res) => {
    database.find(req.query).sort({ artist: 1 }).exec((err, docs) => {
      if (err) res.status(404);
      res.json(docs);
    });
  });

  appServer.get('/playlist/:id', (req, res) => {
    database.findOne({ _id: req.params.id }, (err, docs) => {
      if (err) res.status(404);
      res.json(docs);
    });
  });

  appServer.use(cors());
  appServer.use(express.static('public'));

  return Promise.resolve(appServer);
};

const runServer = (appServer, port) => {
  return new Promise((resolve, reject) => {
    if (!port) reject(new Error('Need a valid PORT!'));
    appServer.listen(port, resolve);
  });
};

const getDataFromFile = (fileLocation) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileLocation, 'utf-8', (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

const insertDocumentsIntoDatabase = (db, docs) => {
  return new Promise((resolve, reject) => {
    db.insert(docs, (err, newDocs) => {
      if (err) reject(err);
      resolve(db);
    });
  });
};

const createAndLoadDatabase = (fileLocation) => {
  return getDataFromFile(fileLocation)
    .then(JSON.parse)
    .then(docs => {
      const db = new Datastore({ timestampData: true, autoload: true });
      return insertDocumentsIntoDatabase(db, docs);
    });
};

const buildAndRunService = (appServer, {port, datasourceLocation}) => {
  return Promise.resolve(datasourceLocation)
    .then(configLocation  => createAndLoadDatabase(configLocation))
    .then(loadedDatabase  => setupMiddleware(appServer, loadedDatabase))
    .then(loadedAppServer => runServer(loadedAppServer, port))
    .then(_ => console.log(`Application listening on port ${port}!`))
    .catch(error => console.error(error));
}

const checkIfValueExists = (value, name) => {
  return new Promise((resolve, reject) => {
    if (!value) reject(new Error(`Need a valid ${name}`));
    resolve(value);
  });
};

const getEnvironmentVariables = ({ DATASOURCE_LOCATION, PORT }) => {
  return Promise.all([
    checkIfValueExists(PORT, 'PORT'),
    checkIfValueExists(DATASOURCE_LOCATION, 'DATASOURCE_LOCATION'),
  ])
    .then(variables => {
      return {port: variables[0], datasourceLocation: variables[1]};
    });
}

getEnvironmentVariables(process.env)
  .then(config => buildAndRunService(express(), config))
  .catch(console.error);
