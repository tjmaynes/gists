install:
	./scripts/install.sh

test:
	go test -v -coverprofile=coverage.txt ./...

start:
	go run main.go -h

build:
	./scripts/build.sh

deploy: test build