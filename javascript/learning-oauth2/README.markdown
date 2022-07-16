# Learning OAuth2

> Server for a Todo application including authorization grant (username/password) flow.

## Usage

- [nodejs](https://nodejs.org/en/download/)
- [docker](https://docs.docker.com/docker-for-mac/install/)

## Requirements

To install project dependencies, run the following command:
```bash
make install_dependencies
```

To run all tests, run the following command:
```bash
make test
```

To run the local db, run the following command:
```bash
make start_local_db
```

To run the server, run the following command:
```bash
SERVER_PORT=<some-open-port> \
TODO_DB_USER=<some-todo-db-user> \
TODO_DB_HOST=<some-todo-db-host> \
TODO_DB_NAME=<some-todo-db-name> \
TODO_DB_PASSWORD=<some-todo-db-password> \
TODO_DB_PORT=<some-todo-db-port> \
AUTH_DB_USER=<some-auth-db-user> \
AUTH_DB_HOST=<some-auth-db-host> \
AUTH_DB_NAME=<some-auth-db-name> \
AUTH_DB_PASSWORD=<some-auth-db-password> \
AUTH_DB_PORT=<some-auth-db-port>
make start_server
```

## Helpful Links

- [oauth2-rfc](https://tools.ietf.org/html/rfc6749)
- [oauth2-bearer-token-rfc](https://tools.ietf.org/html/rfc6750)
- [oauth2-server-docs](https://oauth2-server.readthedocs.io/en/latest/model/spec.html)
- [node-oauth2-server-implementation](https://github.com/manjeshpv/node-oauth2-server-implementation)
