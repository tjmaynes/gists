start_local_db:
	(docker rm -f todo-db || true) && docker run -d \
		--name todo-db \
		-e POSTGRES_USER=postgres \
		-e POSTGRES_PASSWORD=password \
		-p 5432:5432 \
		postgres:9.5.14-alpine

install_dependencies:
	npm install

test: unit_test int_test

int_test:
	npm run test:integration

unit_test:
	npm run test:unit

start:
	npm run serve
