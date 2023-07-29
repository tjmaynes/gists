ENV_FILE := $(or $(ENV_FILE), ./config/.env.development)

include $(ENV_FILE)
export $(shell sed 's/=.*//' $(ENV_FILE))

export TAG=$(shell git rev-parse --short HEAD)

install:
	npm $@

build:
	npm run $@

run_backing_services:
	docker compose up --detach

start: build run_backing_services
	npm $@

dev:
	npm run $@

test:
	npm $@

test_watch:
	npm run test:watch

lint:
	npm run $@

fix:
	npm run $@

clean:
	rm -rf dist

build_image:
	chmod +x ./scripts/build-image.sh
	./scripts/build-image.sh

debug_image:
	chmod +x ./scripts/debug-image.sh
	./scripts/debug-image.sh

push_image:
	chmod +x ./scripts/push-image.sh
	./scripts/push-image.sh

deploy: install test build_image