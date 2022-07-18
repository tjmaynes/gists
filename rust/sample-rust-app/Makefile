export REGISTRY_USERNAME=tjmaynes
export IMAGE_NAME=oauth-service
export TAG ?= v0.1.0
export ENVIRONMENT ?= development

include .env.$(ENVIRONMENT)
export $(shell sed 's/=.*//' .env.$(ENVIRONMENT))

install:
	cargo $@ --path .
	cargo install sqlx-cli --no-default-features --features postgres

test: migrate
	cargo $@ -- --nocapture

build:
	cargo $@ --release

migrate:
	./scripts/$@.sh $(POSTGRES_HOST) 5432

start: build run_local_db migrate
	cp -rf .env.$(ENVIRONMENT) .env
	RUST_LOG=info ./target/release/oauth-service

stop_docker:
	docker compose stop
	docker compose rm oauth-db --force
	docker volume rm oauth-service_oauth-volume --force
	docker network rm oauth-service_oauth-network

build_image:
	./scripts/build-image.sh

push_image:
	./scripts/push-image.sh

deploy: build_image push_image

ship_it: test
	git push

debug_image:
	./scripts/debug-image.sh

run_local_db:
	docker compose run -d --service-ports oauth-db || true

debug_local_db:
	docker-compose run \
	oauth-db psql \
	-h oauth-db \
	-U $(DATABASE_USER) \
	$(DATABASE_NAME)

healthcheck:
	curl -i localhost:8888/healthcheck