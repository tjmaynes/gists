IMAGE_NAME := todo-service
REGISTRY_USERNAME := ""
REGISTRY_PASSWORD := ""
TAG := ""

build_image: guard-REGISTRY_USERNAME guard-TAG
	docker build -t $(REGISTRY_USERNAME)/$(IMAGE_NAME):$(TAG) . \
	--build-arg TODO_SERVER_PORT=$(TODO_SERVER_PORT) \
	--build-arg TODO_SOURCE_HOST=$(TODO_SOURCE_HOST) \

push_image: guard-REGISTRY_USERNAME guard-REGISTRY_PASSWORD guard-TAG
	docker login -u --username "$(REGISTRY_USERNAME)" --password "$(REGISTRY_PASSWORD)"
	docker push $(REGISTRY_USERNAME)/$(IMAGE_NAME):$(TAG) 

install_dependencies:
	npm install

start_local_db:
	(docker rm -f $(IMAGE_NAME)-db || true) && docker run -d \
		--name $(IMAGE_NAME)-db \
		-p 27017:27017 \
		mongo:4.1

local_test:
	TODO_SOURCE_HOST=mongodb://localhost:27017 \
	TODO_SERVER_HOST=127.0.0.1:50051 \
	npm test

test:
	npm test

run_service:
	npm start

guard-%:
	@ if [ "${${*}}" = "" ]; then \
			echo "Environment variable $* not set!"; \
			exit 1; \
	fi

.PHONY: test
