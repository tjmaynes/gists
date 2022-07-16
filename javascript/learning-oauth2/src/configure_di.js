import Bottle from 'bottlejs';
import db from 'pg';
import OAuth2Server from 'oauth2-server';

import { AuthService, AuthRepository } from './auth';
import { TodoRepository, TodoService } from "./todo";
import {todoFilterFactory, oauthFilterFactory, healthcheckFilterFactory} from "./filters";
import { loggerBuilder, DatabaseExt } from './utils';
import buildApplication from './build_application';

export default function configureDI(config) {
    const bottle = new Bottle();

    bottle.constant('todoDbConfig', {
        user: config.TodoDatabase.User,
        host: config.TodoDatabase.Host,
        database: config.TodoDatabase.Name,
        password: config.TodoDatabase.Password,
        port: config.TodoDatabase.Port
    });

    bottle.constant('authDbConfig', {
        user: config.AuthDatabase.User,
        host: config.AuthDatabase.Host,
        database: config.AuthDatabase.Name,
        password: config.AuthDatabase.Password,
        port: config.AuthDatabase.Port
    });

    bottle.constant('port', config.Server.Port || 3000);
    bottle.constant('oauthLogger', loggerBuilder("OAuth Filter"));
    bottle.constant('todoLogger', loggerBuilder("Todo Filter"));
    bottle.constant('healthcheckLogger', loggerBuilder("Healthcheck Filter"));
    bottle.constant('appLogger', loggerBuilder("App"));

    bottle.factory('todoDatabase', (container) => {
        const dbPool = new db.Pool(container.todoDbConfig);
        return new DatabaseExt(dbPool);
    });

    bottle.factory('authDatabase', (container) => {
        const dbPool = new db.Pool(container.authDbConfig);
        return new DatabaseExt(dbPool);
    });

    bottle.factory('oauthService', (container) => {
        const authRepository = new AuthRepository(container.authDatabase);
        const authService = new AuthService(authRepository);
        return new OAuth2Server({ model: authService });
    });

    bottle.factory('todoService', (container) => {
        const todoRepository = new TodoRepository(container.todoDatabase);
        return new TodoService(todoRepository);
    });

    bottle.factory('application', (container) => {
        const oauthFilter = oauthFilterFactory(container.oauthService, container.oauthLogger);
        const todoFilter = todoFilterFactory(container.todoService, container.todoLogger);
        const healthcheckFilter = healthcheckFilterFactory(container.healthcheckLogger);
        return buildApplication(oauthFilter, todoFilter, healthcheckFilter);
    });

    return bottle.container;
}
