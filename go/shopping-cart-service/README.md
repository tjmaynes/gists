# Sample Go App
> Building and deploying a shopping cart CRUD service with Golang and Kubernetes.

## Requirements

- [GNU Make](https://www.gnu.org/software/make/)
- [Go](https://golang.org/)
- [Docker](https://hub.docker.com/)
- [DBMate](https://github.com/amacneil/dbmate)
- [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

## Usage

To install project dependencies, run the following command:
```bash
make install
```

To generate mocks, run the following command:
```bash
make generate_mocks
```

To run all tests, run the following command:
```bash
make test
```

To make sure the database is running, run the following command:
```bash
make run_local_db
```

To start the app and database locally, run the following command:
```bash
make start
```

To debug the local database, run the following command:
```bash
make debug_local_db
```

To run migrations, run the following command:
```bash
make run_migrations
```

To generate seed data, run the following command:
```bash
make generate_seed_data
```

To seed the database, run the following command:
```bash
make seed_db
```

To build the docker image, run the following command:
```bash
make build_image
```

To run the docker image, run the following command:
```bash
make debug_image
```

To push the docker image to dockerhub, run the following command:
```bash
make push_image
```



## Running Server

To get the health endpoint, run the following command:
```bash
curl -X GET localhost:3000/health
```

To get all cart items, run the following command:
```bash
curl -X GET 'localhost:3000/cart?page=0&pageSize=10'
```

To get a cart item by id, run the following command:
```bash
curl -X GET localhost:3000/cart/1
```

To add a cart item, run the following command:
```bash
curl \
    -X POST \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "name=Lens&price=120000&manufacturer=Canon" \
    localhost:3000/cart
```

To update a cart item, run the following command:
```bash
curl \
    -X PUT \
    -H "Content-Type: application/json" \
    -d '{"name": "Lens Cap", "price": "888888888", "manufacturer": "Canon"}' \
    localhost:3000/cart/1
```

To remove a cart item, run the following command:
```bash
curl -X DELETE localhost:3000/cart/1
```
