import configureDI from './configure_di';
const config = {
    Server: {
        Port: process.env.PORT
    },
    TodoDatabase: {
        User: process.env.TODO_DB_USER,
        Host: process.env.TODO_DB_HOST,
        Name: process.env.TODO_DB_NAME,
        Password: process.env.TODO_DB_PASSWORD,
        Port: process.env.TODO_DB_PORT
    },
    AuthDatabase: {
        User: process.env.AUTH_DB_USER,
        Host: process.env.AUTH_DB_HOST,
        Name: process.env.AUTH_DB_NAME,
        Password: process.env.AUTH_DB_PASSWORD,
        Port: process.env.AUTH_DB_PORT
    }
};

const diContainer = configureDI(config);

diContainer.appLogger.log({level: "info", message: "Starting server!"});
diContainer.createDbConn(diContainer.dbConfig)
    .then((dbConn) => {

    });
diContainer.application.listen(diContainer.port, () => {
    diContainer.appLogger.log({level: "info", message: `Running on ${container.port}`});
});
