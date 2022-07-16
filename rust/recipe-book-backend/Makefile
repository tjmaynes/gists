ENVIRONMENT := development

include .env.$(ENVIRONMENT)
export $(shell sed 's/=.*//' .env.$(ENVIRONMENT))

install:
	./scripts/install.sh

.PHONY: build
build:
	cargo build

test:
	cargo test

migrate:
	./scripts/migrate.sh

start:
	cargo run

build_image:
	./scripts/build-image.sh

push_image:
	./scripts/push-image.sh

debug_image:
	./scripts/debug-image.sh

build_and_push_image: build_image push_image

run_local_db:
	docker compose up -d

stop_local_db:
	docker compose down

clean:
	rm -rf target/
