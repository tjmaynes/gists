FROM golang:1.16.9-alpine AS build-env
RUN apk update && apk upgrade && \
    apk add --no-cache git make && \
    apk add --update gcc musl-dev
WORKDIR /go/src/github.com/tjmaynes/tdd-go/
ADD . ./
RUN GO111MODULE=on CGO_ENABLED=1 GOOS=linux go build -a -installsuffix cgo -ldflags '-extldflags "-static"' -o dist/shopping-cart-service ./cmd/shopping-cart-service

FROM alpine
COPY --from=build-env /go/src/github.com/tjmaynes/tdd-go/dist/shopping-cart-service /bin/
EXPOSE 3000
ENTRYPOINT [ "/bin/shopping-cart-service" ]