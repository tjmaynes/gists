ENVIRONMENT := development

include .env.$(ENVIRONMENT)
export $(shell sed 's/=.*//' .env.$(ENVIRONMENT))
export CGO_ENABLED=1
export TAG=$(shell git rev-parse --short HEAD)

install:
	./hack/install.sh

generate_mocks:
	moq -out pkg/cart/repository_mock.go pkg/cart Repository

generate_seed_data:
	go run ./cmd/shopping-cart-service-seeder \
	--seed-data-destination=$(SEED_DATA_SOURCE) \
	--item-count=100 \
	--manufacturer-count=5

run_migrations:
	DATABASE_URL=$(DATABASE_URL) bin/dbmate wait
	DATABASE_URL=$(DATABASE_URL) bin/dbmate up

seed_db:
	go run ./cmd/shopping-cart-service-db-seeder \
	--db-source=$(DATABASE_URL) \
	--seed-data-source=$(SEED_DATA_SOURCE)

test: run_migrations generate_mocks
	DATABASE_URL=$(DATABASE_URL) \
	PORT=$(PORT) \
	SEED_DATA_SOURCE=$(SEED_DATA_SOURCE) \
	go test -v -coverprofile=coverage.txt ./...

ci_test:
	make test 2>&1 | go-junit-report > report.xml
	gocov convert coverage.txt > coverage.json    
	gocov-xml < coverage.json > coverage.xml
	(mkdir -p coverage || true) && gocov-html < coverage.json > coverage/index.html

build:
	go build -o dist/shopping-cart-service ./cmd/shopping-cart-service

start: build run_migrations
	DATABASE_URL=$(DATABASE_URL) \
	PORT=$(PORT) \
	./dist/shopping-cart-service

build_image:
	./hack/build-image.sh

push_image:
	./hack/push-image.sh

debug_image:
	./hack/debug-image.sh

deploy_k8s:
	kubectl apply -f ./k8s/shopping-cart-common/secret.yml
	kubectl apply -f ./k8s/shopping-cart-db/deployment.yml
	kubectl apply -f ./k8s/shopping-cart-db/persistence.gke.yml

deploy: test build_image push_image

run_local_db:
	kubectl apply -f ./k8s/shopping-cart-common/secret.yml
	kubectl apply -f ./k8s/shopping-cart-db/deployment.yml
	kubectl apply -f ./k8s/shopping-cart-db/persistence.local.yml

connect_localhost_to_remote_db:
	kubectl port-forward svc/shopping-cart-db 5432:5432

debug_local_db:
	kubectl run cart-db-debug --rm -i --tty --image=postgres:11.5-alpine -- \
		psql -h shopping-cart-db --username $(POSTGRES_USER) --password $(POSTGRES_PASS) $(POSTGRES_DB)

stop_local_db:
	kubectl delete -f ./k8s/shopping-cart-common/secret.yml
	kubectl delete -f ./k8s/shopping-cart-db/deployment.yml
	kubectl delete -f ./k8s/shopping-cart-db/persistence.local.yml

clean:
	rm -rf dist/ vendor/ coverage* report.xml