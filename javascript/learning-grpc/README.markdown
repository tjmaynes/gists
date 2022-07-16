# Learning gRPC

> Learning how gRPC works by setting up a simple Todo service with `list`, `add`, and `remove` functionality.

[![CircleCI](https://circleci.com/gh/tjmaynes/learning-grpc.svg?style=svg)](https://circleci.com/gh/tjmaynes/learning-grpc)

## Requirements

- [nodejs](https://nodejs.org/en/download/)
- [docker](https://docs.docker.com/docker-for-mac/install/)

## Usage

To install dependencies, run the following command:
```bash
make install_dependencies
```

To run the application, run the following command:
```bash
TODO_SOURCE_HOST=<some-source-host> \
TODO_SERVER_PORT=<some-service-port> \
make run_service
```

To run tests, run the following command:
```bash
make test
```

To build the service image, run the following command:
```bash
REGISTRY_USERNAME=<some-docker-registry-username> \
TAG=<some-build-tag> \
make build_image
```

To push the service image, run the following command:
```bash
REGISTRY_USERNAME=<some-docker-registry-username> \
REGISTRY_PASSWORD=<some-docker-registry-password> \
TAG=<some-build-tag> \
make push_image
```
